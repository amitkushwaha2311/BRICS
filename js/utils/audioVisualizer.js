/**
 * HTML5 Canvas Audio Waveform Visualizer
 * Renders glowing telemetry frequency waves for live microphone & simulated voice streams.
 */

export class AudioWaveVisualizer {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement ? canvasElement.getContext('2d') : null;
    this.animationId = null;
    this.isActive = false;
    this.analyser = null;
    this.audioContext = null;
    this.dataArray = null;
    this.phase = 0;
  }

  startSimulation() {
    this.isActive = true;
    this.renderSimulatedWaves();
  }

  startWithStream(stream) {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 128;
      source.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.isActive = true;
      this.renderLiveStream();
    } catch (e) {
      console.warn('Microphone AudioContext init failed, falling back to simulated wave', e);
      this.startSimulation();
    }
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    this.clearCanvas();
  }

  clearCanvas() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw baseline idle line
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(0, height / 2);
    this.ctx.lineTo(width, height / 2);
    this.ctx.stroke();
  }

  renderSimulatedWaves() {
    if (!this.isActive || !this.ctx || !this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    this.phase += 0.08;

    // Draw multi-layered glowing sine waves
    const layers = [
      { color: 'rgba(56, 189, 248, 0.85)', amp: 26, freq: 0.04, speed: 1.0 },
      { color: 'rgba(168, 85, 247, 0.75)', amp: 18, freq: 0.06, speed: -1.2 },
      { color: 'rgba(52, 211, 153, 0.65)', amp: 12, freq: 0.08, speed: 1.5 }
    ];

    layers.forEach(layer => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = layer.color;
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = layer.color;

      for (let x = 0; x < width; x++) {
        // Modulate with envelope to taper edges
        const envelope = Math.sin((x / width) * Math.PI);
        const y = height / 2 + Math.sin(x * layer.freq + this.phase * layer.speed) * layer.amp * envelope;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;
    });

    this.animationId = requestAnimationFrame(() => this.renderSimulatedWaves());
  }

  renderLiveStream() {
    if (!this.isActive || !this.ctx || !this.canvas) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);

    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
    }

    const barWidth = (width / (this.dataArray ? this.dataArray.length : 32)) * 1.5;
    let x = 0;

    for (let i = 0; i < (this.dataArray ? this.dataArray.length : 32); i++) {
      const v = this.dataArray ? this.dataArray[i] / 255.0 : 0.5;
      const barHeight = v * (height * 0.85);

      const grad = this.ctx.createLinearGradient(0, height / 2 - barHeight / 2, 0, height / 2 + barHeight / 2);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.5, '#a855f7');
      grad.addColorStop(1, '#34d399');

      this.ctx.fillStyle = grad;
      this.ctx.fillRect(x, (height - barHeight) / 2, barWidth - 2, barHeight);

      x += barWidth + 1;
    }

    this.animationId = requestAnimationFrame(() => this.renderLiveStream());
  }
}

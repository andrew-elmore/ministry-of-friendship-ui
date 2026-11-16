import { Player } from './Player.js';
import { MetricsCollector } from './MetricsCollector.js';

export class SimulationRunner {
  constructor(config = {}) {
    this.config = {
      numPlayers: config.numPlayers || 10,
      durationMs: config.durationMs || 600000,
      baseURL: config.baseURL || 'http://localhost:8081',
      metricsInterval: config.metricsInterval || 30000,
      ...config
    };

    this.players = [];
    this.metrics = new MetricsCollector();
    this.metricsTimer = null;
    this.isRunning = false;
  }

  async start() {
    console.log(`:~: [SIMULATION] Starting with ${this.config.numPlayers} players for ${this.config.durationMs / 1000}s`);
    console.log(`:~: [SIMULATION] Base URL: ${this.config.baseURL}`);

    this.metrics.start();
    this.isRunning = true;

    this.metricsTimer = setInterval(() => {
      this.metrics.printPeriodicUpdate();
    }, this.config.metricsInterval);

    for (let i = 1; i <= this.config.numPlayers; i++) {
      const player = new Player(i, this.config.baseURL, this.metrics);
      this.players.push(player);

      player.start().catch(error => {
        this.metrics.recordError(error, `Starting Player ${i}`);
      });

      await this.sleep(500);
    }

    console.log(`:~: [SIMULATION] All ${this.config.numPlayers} players started`);

    await this.sleep(this.config.durationMs);

    await this.stop();
  }

  async stop() {
    console.log(`:~: [SIMULATION] Stopping simulation...`);
    this.isRunning = false;

    if (this.metricsTimer) {
      clearInterval(this.metricsTimer);
      this.metricsTimer = null;
    }

    const stopPromises = this.players.map(player => player.stop());
    await Promise.allSettled(stopPromises);

    this.metrics.end();
    this.metrics.printSummary();

    console.log(`:~: [SIMULATION] Simulation complete`);
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

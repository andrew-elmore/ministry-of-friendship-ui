import { test } from '@playwright/test';
import { SimulationRunner } from './helpers/SimulationRunner.js';

test.describe('Autonomous AI Player Simulation', () => {
  test.setTimeout(700000);

  test('run 10-minute multi-player simulation', async () => {
    const runner = new SimulationRunner({
      numPlayers: 10,
      durationMs: 600000,
      baseURL: 'http://localhost:8081',
      metricsInterval: 30000
    });

    await runner.start();
  });
});

export class MetricsCollector {
  constructor() {
    this.metrics = {
      playersCreated: 0,
      accountsGenerated: 0,
      accountGenerationFailures: 0,
      lobbiesCreated: 0,
      lobbiesJoined: 0,
      joinAttemptsFailed: 0,
      playersKicked: 0,
      playersLeft: 0,
      classifiedSlotsMarked: 0,
      classifiedSlotsRemoved: 0,
      lobbiesClosed: 0,
      searchesPerformed: 0,
      matchesFound: 0,
      noMatchesFound: 0,
      errors: [],
      startTime: null,
      endTime: null
    };
  }

  start() {
    this.metrics.startTime = Date.now();
    console.log(':~: [METRICS] Simulation started');
  }

  end() {
    this.metrics.endTime = Date.now();
    const duration = ((this.metrics.endTime - this.metrics.startTime) / 1000).toFixed(2);
    console.log(`:~: [METRICS] Simulation ended after ${duration}s`);
  }

  increment(metric, amount = 1) {
    if (this.metrics[metric] !== undefined && typeof this.metrics[metric] === 'number') {
      this.metrics[metric] += amount;
    }
  }

  recordError(error, context = '') {
    this.metrics.errors.push({
      message: error.message || error.toString(),
      context,
      timestamp: Date.now()
    });
    console.log(`:~: [METRICS] Error recorded: ${error.message || error} (${context})`);
  }

  getDuration() {
    if (!this.metrics.startTime) return 0;
    const endTime = this.metrics.endTime || Date.now();
    return (endTime - this.metrics.startTime) / 1000;
  }

  getSnapshot() {
    return {
      ...this.metrics,
      duration: this.getDuration(),
      successRate: {
        accountGeneration: this.calculateSuccessRate(
          this.metrics.accountsGenerated,
          this.metrics.accountGenerationFailures
        ),
        lobbyJoining: this.calculateSuccessRate(
          this.metrics.lobbiesJoined,
          this.metrics.joinAttemptsFailed
        )
      }
    };
  }

  calculateSuccessRate(successes, failures) {
    const total = successes + failures;
    if (total === 0) return 0;
    return ((successes / total) * 100).toFixed(2);
  }

  printSummary() {
    const snapshot = this.getSnapshot();
    console.log('\n========== SIMULATION METRICS ==========');
    console.log(`Duration: ${snapshot.duration.toFixed(2)}s`);
    console.log(`\nPlayers:`);
    console.log(`  Created: ${snapshot.playersCreated}`);
    console.log(`  Accounts Generated: ${snapshot.accountsGenerated}`);
    console.log(`  Generation Failures: ${snapshot.accountGenerationFailures}`);
    console.log(`  Success Rate: ${snapshot.successRate.accountGeneration}%`);

    console.log(`\nLobbies:`);
    console.log(`  Created: ${snapshot.lobbiesCreated}`);
    console.log(`  Closed: ${snapshot.lobbiesClosed}`);

    console.log(`\nMatching:`);
    console.log(`  Searches Performed: ${snapshot.searchesPerformed}`);
    console.log(`  Matches Found: ${snapshot.matchesFound}`);
    console.log(`  No Matches: ${snapshot.noMatchesFound}`);
    console.log(`  Lobbies Joined: ${snapshot.lobbiesJoined}`);
    console.log(`  Join Failures: ${snapshot.joinAttemptsFailed}`);
    console.log(`  Join Success Rate: ${snapshot.successRate.lobbyJoining}%`);

    console.log(`\nLobby Management:`);
    console.log(`  Players Kicked: ${snapshot.playersKicked}`);
    console.log(`  Players Left: ${snapshot.playersLeft}`);
    console.log(`  CLASSIFIED Slots Marked: ${snapshot.classifiedSlotsMarked}`);
    console.log(`  CLASSIFIED Slots Removed: ${snapshot.classifiedSlotsRemoved}`);

    console.log(`\nErrors: ${snapshot.errors.length}`);
    if (snapshot.errors.length > 0) {
      snapshot.errors.forEach((err, idx) => {
        console.log(`  ${idx + 1}. [${err.context}] ${err.message}`);
      });
    }
    console.log('=======================================\n');
  }

  printPeriodicUpdate() {
    const snapshot = this.getSnapshot();
    console.log(`:~: [METRICS] ${snapshot.duration.toFixed(0)}s | Players: ${snapshot.playersCreated} | Lobbies: ${snapshot.lobbiesCreated} | Searches: ${snapshot.searchesPerformed} | Joins: ${snapshot.lobbiesJoined} | Errors: ${snapshot.errors.length}`);
  }
}

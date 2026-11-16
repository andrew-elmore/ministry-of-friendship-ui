# Autonomous AI Player Simulation

This E2E testing framework simulates multiple autonomous AI players interacting with the Ministry of Friendship lobby system concurrently to identify bugs and test real-world scenarios.

## Overview

The simulation creates autonomous AI players that:
- Sign in as throwaway Clerk test users and enlist with random gamer tags and preferences
- Search for lobby matches
- Create lobbies when no matches are found
- Randomly mark slots as CLASSIFIED (30% chance on creation)
- Hosts kick players every 30 seconds (33% probability)
- Hosts toggle CLASSIFIED slots every 45 seconds (25% probability)
- Hosts close lobbies after ~2 minutes
- Guests leave lobbies randomly every 60 seconds (10% probability)
- Kicked guests return to searching for matches

## Architecture

### Components

**Player.js** - Autonomous agent with state machine
- States: INITIALIZING, GENERATING_ACCOUNT, SEARCHING, IN_LOBBY_AS_HOST, IN_LOBBY_AS_GUEST, KICKED, ERROR
- Uses Playwright browser contexts for isolation
- Implements hold-button behavior for kick/leave actions (2-second press)

**RandomGenerator.js** - Generates randomized test data
- Preferences (all fields are arrays per schema)
- GamerTags, friend codes
- Proper subset selection for preference arrays

**MetricsCollector.js** - Tracks simulation health
- Player counts, lobby operations
- Success/failure rates
- Error logging
- Periodic status updates every 30 seconds

**SimulationRunner.js** - Orchestrates multiple players
- Spawns 10 concurrent players
- Runs for 10 minutes
- Prints final metrics summary

## Prerequisites

1. MongoDB running on localhost:27017
2. Node.js and npm installed
3. A Clerk development instance: `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in the UI `.env`, and the same keys in the API `.env`
4. The `OPEN` and `CLASSIFIED` placeholder Profiles in the test database (see the API README)

## Running the Simulation

### Step 1: Start Test Parse Server

In terminal 1 (from ministry-of-friendship-api):

```bash
cd ministry-of-friendship-api
npm run start:test
```

This starts Parse Server on port 1338 with:
- Clerk session verification in front of every Parse route
- Test database: mongodb://localhost:27017/ministry-test

### Step 2: Start Test Frontend

In terminal 2 (from ministry-of-friendship-ui):

```bash
cd ministry-of-friendship-ui
npm run start:e2e
```

This starts the UI on port 8081 configured to connect to test Parse Server.

### Step 3: Run Simulation

In terminal 3 (from ministry-of-friendship-ui):

```bash
cd ministry-of-friendship-ui
npm run test:e2e:simulation
```

This launches the Playwright simulation with 10 concurrent players for 10 minutes.

## Configuration

Edit `tests/e2e/autonomous-simulation.e2e.spec.ts` to adjust:

```javascript
const runner = new SimulationRunner({
  numPlayers: 10,           // Number of concurrent players
  durationMs: 600000,       // Duration in ms (10 minutes)
  baseURL: 'http://localhost:8081',
  metricsInterval: 30000    // How often to print status (30s)
});
```

## Player Behavior Details

### Preference Schema
All preference fields are **arrays**:
- `difficulty`: Array from [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
- `enemy`: Array from ['BUGS', 'BOTS', 'SQUIDS']
- `mic`: Array from ['OPEN', 'PUSH', 'OFF']
- `objective`: Array from ['MAJORORDER', 'MEDALS', 'SAMPLES']

Players generate random subsets of each array (minimum 1 element).

### Host Behavior
- **Kick players**: Every 30s, 33% chance to kick a random guest
- **Toggle CLASSIFIED**: Every 45s, 25% chance to add/remove CLASSIFIED slot
- **Close lobby**: After 2 minutes, disband the squad

All kick/disband actions use 2-second hold-button behavior.

### Guest Behavior
- **Leave lobby**: Every 60s, 10% chance to leave
- When kicked or left, return to SEARCHING state

## Metrics

The simulation tracks:
- Players created and accounts generated
- Lobbies created, joined, closed
- Search operations and match rates
- Kick/leave operations
- CLASSIFIED slot operations
- Success rates for account generation and lobby joining
- All errors with context

Final summary printed at end of simulation.

## Troubleshooting

**Port already in use**
- Test server (1338): Kill existing Parse Server or change TEST_PORT in .env.test
- Test UI (8081): Kill existing webpack-dev-server or change port in webpack.e2e.js

**MongoDB connection errors**
- Ensure MongoDB is running: `mongosh --eval "db.version()"`
- Check connection string in .env.test

**Players fail to generate accounts**
- Check test Parse Server logs for errors
- Confirm both `.env` files point at the same Clerk development instance; each player is a Clerk test user created with the Backend API and deleted when the player stops

## Test Environment Isolation

The simulation uses completely separate infrastructure:
- Test Parse Server (port 1338) vs dev (port 1337)
- Test database (ministry-test) vs dev database
- Test UI (port 8081) vs dev (port 3000)

This ensures zero impact on development or production data.

import { chromium } from '@playwright/test';
import { RandomGenerator } from './RandomGenerator.js';
import { signInNewClerkUser, enlist, deleteClerkUser } from './clerkUsers.js';

export class Player {
  static STATES = {
    INITIALIZING: 'INITIALIZING',
    GENERATING_ACCOUNT: 'GENERATING_ACCOUNT',
    SEARCHING: 'SEARCHING',
    IN_LOBBY_AS_HOST: 'IN_LOBBY_AS_HOST',
    IN_LOBBY_AS_GUEST: 'IN_LOBBY_AS_GUEST',
    CREATING_LOBBY: 'CREATING_LOBBY',
    KICKED: 'KICKED',
    ERROR: 'ERROR'
  };

  constructor(id, baseURL, metrics) {
    this.id = id;
    this.baseURL = baseURL;
    this.metrics = metrics;
    this.state = Player.STATES.INITIALIZING;
    this.browser = null;
    this.context = null;
    this.page = null;
    this.preference = null;
    this.gamerTag = null;
    this.clerkUser = null;
    this.lobbyCreatedAt = null;
    this.isRunning = false;
    this.stateTimers = {
      kickTimer: null,
      classifiedToggleTimer: null,
      leaveTimer: null,
      closeTimer: null
    };
  }

  async initialize() {
    console.log(`:~: [Player ${this.id}] Initializing`);
    this.metrics.increment('playersCreated');

    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(30000);

    this.preference = RandomGenerator.randomPreference();
    this.gamerTag = RandomGenerator.randomGamerTag();

    this.setState(Player.STATES.GENERATING_ACCOUNT);
  }

  async start() {
    this.isRunning = true;
    await this.initialize();
    await this.runBehaviorLoop();
  }

  async stop() {
    this.isRunning = false;
    this.clearAllTimers();

    if (this.page) await this.page.close().catch(() => {});
    if (this.context) await this.context.close().catch(() => {});
    if (this.browser) await this.browser.close().catch(() => {});
    await deleteClerkUser(this.clerkUser).catch(() => {});

    console.log(`:~: [Player ${this.id}] Stopped`);
  }

  setState(newState) {
    console.log(`:~: [Player ${this.id}] ${this.state} -> ${newState}`);
    this.state = newState;
  }

  async runBehaviorLoop() {
    while (this.isRunning) {
      try {
        switch (this.state) {
          case Player.STATES.GENERATING_ACCOUNT:
            await this.generateAccount();
            break;
          case Player.STATES.SEARCHING:
            await this.searchForMatches();
            break;
          case Player.STATES.CREATING_LOBBY:
            await this.createLobby();
            break;
          case Player.STATES.IN_LOBBY_AS_HOST:
            await this.sleep(1000);
            break;
          case Player.STATES.IN_LOBBY_AS_GUEST:
            await this.sleep(1000);
            break;
          case Player.STATES.KICKED:
            this.setState(Player.STATES.SEARCHING);
            break;
          case Player.STATES.ERROR:
            await this.sleep(5000);
            this.setState(Player.STATES.SEARCHING);
            break;
          default:
            await this.sleep(1000);
        }
      } catch (error) {
        this.metrics.recordError(error, `Player ${this.id} - ${this.state}`);
        this.setState(Player.STATES.ERROR);
      }
    }
  }

  async generateAccount() {
    try {
      this.clerkUser = await signInNewClerkUser(this.page, this.baseURL, `player${this.id}`);
      await enlist(this.page, this.gamerTag);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForSelector('#root', { state: 'attached', timeout: 30000 });

      this.metrics.increment('accountsGenerated');
      console.log(`:~: [Player ${this.id}] Account created: ${this.gamerTag}`);

      this.setState(Player.STATES.SEARCHING);
    } catch (error) {
      this.metrics.increment('accountGenerationFailures');
      console.log(`:~: [Player ${this.id}] ERROR in generateAccount: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const testIds = ['profile-gamertag', 'profile-submit'];
      for (const testId of testIds) {
        const hasTestId = html.includes(`data-testid="${testId}"`);
        console.log(`:~: [Player ${this.id}] Found data-testid="${testId}": ${hasTestId}`);
      }
      throw error;
    }
  }

  async searchForMatches() {
    try {
      this.metrics.increment('searchesPerformed');

      await this.page.goto(this.baseURL);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForSelector('#root', { state: 'attached', timeout: 30000 });

      const lobbyCards = await this.page.locator('[data-testid="lobby-card"]').count();

      if (lobbyCards > 0) {
        this.metrics.increment('matchesFound');
        await this.attemptJoinLobby();
      } else {
        this.metrics.increment('noMatchesFound');
        this.setState(Player.STATES.CREATING_LOBBY);
      }
    } catch (error) {
      console.log(`:~: [Player ${this.id}] ERROR in searchForMatches: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const hasLobbyCard = html.includes('data-testid="lobby-card"');
      console.log(`:~: [Player ${this.id}] Found data-testid="lobby-card": ${hasLobbyCard}`);
      throw error;
    }
  }

  async attemptJoinLobby() {
    try {
      const lobbyCard = this.page.locator('[data-testid="lobby-card"]').first();
      await lobbyCard.click();

      await this.page.waitForSelector('[data-testid="join-button"]', { timeout: 2000 });
      await this.page.click('[data-testid="join-button"]');

      await this.sleep(500);

      const url = this.page.url();
      if (url.includes('/squad/')) {
        this.metrics.increment('lobbiesJoined');
        this.setState(Player.STATES.IN_LOBBY_AS_GUEST);
        this.scheduleGuestBehaviors();
      } else {
        this.metrics.increment('joinAttemptsFailed');
        this.setState(Player.STATES.SEARCHING);
      }
    } catch (error) {
      this.metrics.increment('joinAttemptsFailed');
      console.log(`:~: [Player ${this.id}] ERROR in attemptJoinLobby: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const hasJoinButton = html.includes('data-testid="join-button"');
      console.log(`:~: [Player ${this.id}] Found data-testid="join-button": ${hasJoinButton}`);
      this.setState(Player.STATES.SEARCHING);
    }
  }

  async createLobby() {
    try {
      await this.page.goto(`${this.baseURL}/squad/add`);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForSelector('#root', { state: 'attached', timeout: 30000 });

      const friendCode = RandomGenerator.randomFriendCode();
      const friendCodeInput = this.page.locator('[data-testid="friend-code-input"]');
      await friendCodeInput.waitFor({ state: 'visible', timeout: 10000 });
      await friendCodeInput.fill(friendCode);

      const shouldMarkClassified = RandomGenerator.randomBool(0.3);
      if (shouldMarkClassified) {
        await this.markRandomSlotsAsClassified();
      }

      await this.page.locator('[data-testid="create-squad-button"]').click();
      await this.sleep(2000);

      this.metrics.increment('lobbiesCreated');
      this.lobbyCreatedAt = Date.now();
      console.log(`:~: [Player ${this.id}] Created lobby: ${friendCode}`);

      this.setState(Player.STATES.IN_LOBBY_AS_HOST);
      this.scheduleHostBehaviors();
    } catch (error) {
      console.log(`:~: [Player ${this.id}] ERROR in createLobby: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      console.log(`:~: [Player ${this.id}] Searching for data-testid="friend-code-input" in HTML:`);
      const hasTestId = html.includes('data-testid="friend-code-input"');
      console.log(`:~: [Player ${this.id}] Found data-testid="friend-code-input": ${hasTestId}`);
      if (hasTestId) {
        const startIdx = html.indexOf('data-testid="friend-code-input"');
        console.log(`:~: [Player ${this.id}] Context around data-testid (500 chars):`);
        console.log(html.substring(Math.max(0, startIdx - 250), startIdx + 250));
      }
      throw error;
    }
  }

  async markRandomSlotsAsClassified() {
    const slots = ['guestOne', 'guestTwo', 'guestThree'];
    const numToMark = RandomGenerator.randomInt(1, 3);
    const slotsToMark = RandomGenerator.randomSubset(slots, numToMark, numToMark);

    for (const slot of slotsToMark) {
      try {
        const button = this.page.locator(`[data-testid="guest-button-${slot}"]`);
        if (await button.isVisible({ timeout: 500 })) {
          const text = await button.textContent();
          if (text === 'OPEN') {
            await button.click();
            this.metrics.increment('classifiedSlotsMarked');
          }
        }
      } catch (error) {
        console.log(`:~: [Player ${this.id}] ERROR in markRandomSlotsAsClassified (${slot}): ${error.message}`);
        console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
        const html = await this.page.content();
        console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
        console.log(html.substring(0, 2000));
        const hasGuestButton = html.includes(`data-testid="guest-button-${slot}"`);
        console.log(`:~: [Player ${this.id}] Found data-testid="guest-button-${slot}": ${hasGuestButton}`);
      }
    }
  }

  scheduleHostBehaviors() {
    this.stateTimers.kickTimer = setInterval(async () => {
      if (this.state === Player.STATES.IN_LOBBY_AS_HOST && RandomGenerator.randomBool(0.33)) {
        await this.kickRandomPlayer();
      }
    }, 30000);

    this.stateTimers.classifiedToggleTimer = setInterval(async () => {
      if (this.state === Player.STATES.IN_LOBBY_AS_HOST && RandomGenerator.randomBool(0.25)) {
        await this.toggleRandomClassifiedSlot();
      }
    }, 45000);

    this.stateTimers.closeTimer = setTimeout(async () => {
      if (this.state === Player.STATES.IN_LOBBY_AS_HOST) {
        await this.closeLobby();
      }
    }, 120000);
  }

  scheduleGuestBehaviors() {
    this.stateTimers.leaveTimer = setInterval(async () => {
      if (this.state === Player.STATES.IN_LOBBY_AS_GUEST && RandomGenerator.randomBool(0.1)) {
        await this.leaveLobby();
      }
    }, 60000);
  }

  async kickRandomPlayer() {
    try {
      const slots = ['guestOne', 'guestTwo', 'guestThree'];
      const availableSlots = [];

      for (const slot of slots) {
        const button = this.page.locator(`[data-testid="squad-member-${slot}"]`);
        if (await button.isVisible({ timeout: 500 })) {
          const text = await button.textContent();
          if (text !== 'OPEN' && text !== 'CLASSIFIED') {
            availableSlots.push(slot);
          }
        }
      }

      if (availableSlots.length > 0) {
        const randomSlot = availableSlots[RandomGenerator.randomInt(0, availableSlots.length - 1)];
        const button = this.page.locator(`[data-testid="squad-member-${randomSlot}"]`);

        await this.holdButton(button, 2000);
        this.metrics.increment('playersKicked');
        console.log(`:~: [Player ${this.id}] Kicked a player`);
      }
    } catch (error) {
      this.metrics.recordError(error, `Player ${this.id} - kickRandomPlayer`);
      console.log(`:~: [Player ${this.id}] ERROR in kickRandomPlayer: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const slots = ['guestOne', 'guestTwo', 'guestThree'];
      for (const slot of slots) {
        const hasSquadMember = html.includes(`data-testid="squad-member-${slot}"`);
        console.log(`:~: [Player ${this.id}] Found data-testid="squad-member-${slot}": ${hasSquadMember}`);
      }
    }
  }

  async toggleRandomClassifiedSlot() {
    try {
      const slots = ['guestOne', 'guestTwo', 'guestThree'];
      const classifiedSlots = [];
      const openSlots = [];

      for (const slot of slots) {
        const button = this.page.locator(`[data-testid="squad-member-${slot}"]`);
        if (await button.isVisible({ timeout: 500 })) {
          const text = await button.textContent();
          if (text === 'CLASSIFIED') {
            classifiedSlots.push(slot);
          } else if (text === 'OPEN') {
            openSlots.push(slot);
          }
        }
      }

      if (classifiedSlots.length > 0) {
        const randomSlot = classifiedSlots[RandomGenerator.randomInt(0, classifiedSlots.length - 1)];
        const button = this.page.locator(`[data-testid="squad-member-${randomSlot}"]`);
        await this.holdButton(button, 2000);
        this.metrics.increment('classifiedSlotsRemoved');
        console.log(`:~: [Player ${this.id}] Removed CLASSIFIED slot`);
      } else if (openSlots.length > 0) {
        const randomSlot = openSlots[RandomGenerator.randomInt(0, openSlots.length - 1)];
        const button = this.page.locator(`[data-testid="squad-member-${randomSlot}"]`);
        await button.click();
        this.metrics.increment('classifiedSlotsMarked');
        console.log(`:~: [Player ${this.id}] Marked CLASSIFIED slot`);
      }
    } catch (error) {
      this.metrics.recordError(error, `Player ${this.id} - toggleRandomClassifiedSlot`);
      console.log(`:~: [Player ${this.id}] ERROR in toggleRandomClassifiedSlot: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const slots = ['guestOne', 'guestTwo', 'guestThree'];
      for (const slot of slots) {
        const hasSquadMember = html.includes(`data-testid="squad-member-${slot}"`);
        console.log(`:~: [Player ${this.id}] Found data-testid="squad-member-${slot}": ${hasSquadMember}`);
      }
    }
  }

  async closeLobby() {
    try {
      const disbandButton = this.page.locator('[data-testid="disband-button"]');
      await this.holdButton(disbandButton, 2000);

      this.metrics.increment('lobbiesClosed');
      console.log(`:~: [Player ${this.id}] Closed lobby`);

      this.clearAllTimers();
      this.setState(Player.STATES.SEARCHING);
    } catch (error) {
      this.metrics.recordError(error, `Player ${this.id} - closeLobby`);
      console.log(`:~: [Player ${this.id}] ERROR in closeLobby: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const hasDisbandButton = html.includes('data-testid="disband-button"');
      console.log(`:~: [Player ${this.id}] Found data-testid="disband-button": ${hasDisbandButton}`);
    }
  }

  async leaveLobby() {
    try {
      const leaveButton = this.page.locator('[data-testid="leave-button"]');
      await this.holdButton(leaveButton, 2000);

      this.metrics.increment('playersLeft');
      console.log(`:~: [Player ${this.id}] Left lobby`);

      this.clearAllTimers();
      this.setState(Player.STATES.SEARCHING);
    } catch (error) {
      this.metrics.recordError(error, `Player ${this.id} - leaveLobby`);
      console.log(`:~: [Player ${this.id}] ERROR in leaveLobby: ${error.message}`);
      console.log(`:~: [Player ${this.id}] Current URL: ${this.page.url()}`);
      const html = await this.page.content();
      console.log(`:~: [Player ${this.id}] Page HTML (first 2000 chars):`);
      console.log(html.substring(0, 2000));
      const hasLeaveButton = html.includes('data-testid="leave-button"');
      console.log(`:~: [Player ${this.id}] Found data-testid="leave-button": ${hasLeaveButton}`);
    }
  }

  async holdButton(locator, duration = 2000) {
    const box = await locator.boundingBox();
    if (!box) throw new Error('Button not visible');

    await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await this.page.mouse.down();
    await this.sleep(duration + 100);
    await this.page.mouse.up();
  }

  clearAllTimers() {
    if (this.stateTimers.kickTimer) clearInterval(this.stateTimers.kickTimer);
    if (this.stateTimers.classifiedToggleTimer) clearInterval(this.stateTimers.classifiedToggleTimer);
    if (this.stateTimers.leaveTimer) clearInterval(this.stateTimers.leaveTimer);
    if (this.stateTimers.closeTimer) clearTimeout(this.stateTimers.closeTimer);

    this.stateTimers = {
      kickTimer: null,
      classifiedToggleTimer: null,
      leaveTimer: null,
      closeTimer: null
    };
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

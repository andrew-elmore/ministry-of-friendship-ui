export class RandomGenerator {
  static DIFFICULTIES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  static ENEMIES = ['BUGS', 'BOTS', 'SQUIDS'];
  static MICS = ['OPEN', 'PUSH', 'OFF'];
  static OBJECTIVES = ['MAJORORDER', 'MEDALS', 'SAMPLES'];

  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomFloat() {
    return Math.random();
  }

  static randomBool(probability = 0.5) {
    return Math.random() < probability;
  }

  static fisherYatesShuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  static randomSubset(array, minSize = 0, maxSize = null) {
    const actualMaxSize = maxSize ?? array.length;
    const size = this.randomInt(minSize, Math.min(actualMaxSize, array.length));

    const shuffled = this.fisherYatesShuffle(array);
    return shuffled.slice(0, size);
  }

  static randomPreference() {
    return {
      difficulty: this.randomSubset(this.DIFFICULTIES, 1),
      enemy: this.randomSubset(this.ENEMIES, 1),
      mic: this.randomSubset(this.MICS, 1),
      objective: this.randomSubset(this.OBJECTIVES, 1),
      type: 'PERSONAL'
    };
  }

  static randomSquadPreference() {
    return {
      difficulty: this.randomSubset(this.DIFFICULTIES, 1),
      enemy: this.randomSubset(this.ENEMIES, 1),
      mic: this.randomSubset(this.MICS, 1),
      objective: this.randomSubset(this.OBJECTIVES, 1),
      type: 'SQUAD'
    };
  }

  static randomGamerTag() {
    const adjectives = ['Swift', 'Dark', 'Steel', 'Shadow', 'Flame', 'Storm', 'Thunder', 'Iron', 'Ghost', 'Viper'];
    const nouns = ['Warrior', 'Hunter', 'Ranger', 'Striker', 'Soldier', 'Guard', 'Knight', 'Slayer', 'Wolf', 'Eagle'];
    const adj = adjectives[this.randomInt(0, adjectives.length - 1)];
    const noun = nouns[this.randomInt(0, nouns.length - 1)];
    const num = this.randomInt(10, 99);
    return `${adj}${noun}${num}`;
  }

  static randomFriendCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[this.randomInt(0, chars.length - 1)];
    }
    return code;
  }
}

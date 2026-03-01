import Squad from '@domain/Squad';
import Preference from '@domain/Preference';

describe('Squad Domain Model', () => {

  describe('constructor', () => {
    it('should create Squad with default values', () => {
      const squad = new Squad();

      expect(squad.code).toBeNull();
      expect(squad.host).toBeNull();
      expect(squad.guestOne).toBeNull();
      expect(squad.guestTwo).toBeNull();
      expect(squad.guestThree).toBeNull();
      expect(squad.preference).toBeInstanceOf(Preference);
    });

    it('should create Squad with provided values', () => {
      const squad = new Squad({
        code: 'ABC123',
        host: { id: 'user1' },
        guestOne: { id: 'user2' }
      });

      expect(squad.code).toBe('ABC123');
      expect(squad.host).toEqual({ id: 'user1' });
      expect(squad.guestOne).toEqual({ id: 'user2' });
    });
  });

  describe('isSavable', () => {
    it('should return false when code is null', () => {
      const squad = new Squad();
      expect(squad.isSavable()).toBe(false);
    });

    it('should return true when code is set', () => {
      const squad = new Squad({ code: 'ABC123' });
      expect(squad.isSavable()).toBe(true);
    });
  });

  describe('inspect', () => {
    it('should validate successfully with valid code', async () => {
      const squad = new Squad({ code: 'ABC123' });
      await expect(squad.inspect()).resolves.toBeTruthy();
    });

    it('should reject when code is missing', async () => {
      const squad = new Squad();
      await expect(squad.inspect()).rejects.toThrow('Friend Code is required');
    });
  });
});

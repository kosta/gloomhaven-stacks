import { battleGoalByGlobalId, officialBattleGoals, satireGamingBattleGoals } from 'battlegoals/battleGoals';
import CardIdentifier from 'cards/CardIdentifier';

function battleGoalWithTwoRewards() {
  return satireGamingBattleGoals[1];
}

function anySatireGamingBattleGoal() {
  return satireGamingBattleGoals[47];
}

function anyOfficialBattleGoal() {
  return officialBattleGoals[7];
}

describe('battle goals', () => {
  describe('official', () => {
    it('should be 24 available', () => {
      expect(officialBattleGoals).toHaveLength(24);
      expect(officialBattleGoals[officialBattleGoals.length - 1].globalCardId.cardNumber - officialBattleGoals[0].globalCardId.cardNumber).toEqual(23);
    });
  });
  describe('satire gaming', () => {
    it('should be available', () => {
      expect(satireGamingBattleGoals).toHaveLength(64);
    });
    it('should properly detect one rewards', () => {
      expect(satireGamingBattleGoals[0].reward).toBe(1);
    });
    it('parse name', () => {
      expect(satireGamingBattleGoals[0].displayName).toEqual('Bully');
    });
    it('should properly detect two rewards', () => {
      expect(battleGoalWithTwoRewards().reward).toBe(2);
    });
    it('strip reward amount from text', () => {
      expect(battleGoalWithTwoRewards().text).not.toContain('(2 Checks)');
    });
  });

  describe('resolve battle goal by global id', () => {
    it('should resolve satire gaming battle goals by generated global id', () => {
      const battleGoal = anySatireGamingBattleGoal();
      expect(battleGoalByGlobalId(battleGoal.globalCardId).globalCardId).toEqual(battleGoal.globalCardId)
    });
    it('should resolve official battle goals', () => {
      const battleGoal = anyOfficialBattleGoal();
      expect(battleGoalByGlobalId(battleGoal.globalCardId).globalCardId).toEqual(battleGoal.globalCardId);
    });
    it('should raise an error for unknown battle goals', () => {
      const notExisting = CardIdentifier.create('bogus', -1);
      expect(() => battleGoalByGlobalId(notExisting)).toThrowError('There is no battle goal with globalId=bogus--1')
    });
  });
});
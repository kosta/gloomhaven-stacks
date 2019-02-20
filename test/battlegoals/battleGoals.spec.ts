import { officialBattleGoals } from "battlegoals/battleGoals";
import { battleGoalByLocalId, communityBattleGoal } from "battlegoals/battleGoals";

function battleGoalWithTwoRewards() {
  return communityBattleGoal[1];
}

describe('battle goals', () => {
  describe('official', () => {
    it('should be 24 available', () => {
      expect(officialBattleGoals).toHaveLength(24);
      expect(officialBattleGoals[officialBattleGoals.length - 1].globalCardId - officialBattleGoals[0].globalCardId).toEqual(23);
    });
    it('should map 1 to battle goal with smallest global card id ', () => {
      expect(battleGoalByLocalId(1).name).toEqual("streamliner")
    });
    it('should map 24 to battle goal with largest global card id ', () => {
      expect(battleGoalByLocalId(24).name).toEqual("scrambler")
    });
  });
  describe('communicty', () => {
    it('should be available', () => {
      expect(communityBattleGoal).toHaveLength(64);
    });
    it('should properly detect one rewards', () => {
      expect(communityBattleGoal[0].reward).toBe(1);
    });
    it('parse name', () => {
      expect(communityBattleGoal[0].displayName).toEqual('Bully');
    });
    it('should properly detect two rewards', () => {
      expect(battleGoalWithTwoRewards().reward).toBe(2);
    });
    it('strip reward amount from text', () => {
      expect(battleGoalWithTwoRewards().text).not.toContain('(2 Checks)');
    });
  });
});
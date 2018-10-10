import { officialBattleGoals } from "battlegoals/battleGoals";
import { battleGoalByLocalId } from "../../src/battlegoals/battleGoals";

describe('battle goals', () => {
  describe('official', () => {
    it('should be 24 available', () => {
      expect(officialBattleGoals).toHaveLength(24);
      expect(officialBattleGoals[officialBattleGoals.length-1].globalCardId - officialBattleGoals[0].globalCardId).toEqual(23);
    });
    it('should map 1 to battle goal with smallest global card id ', () => {
      expect(battleGoalByLocalId(1).name).toEqual("streamliner")
    });
    it('should map 24 to battle goal with largest global card id ', () => {
      expect(battleGoalByLocalId(24).name).toEqual("scrambler")
    });
  });
});
class BattleGoal {
  constructor(
    readonly globalCardId: number,
    readonly name: string) {
  }
}

export const officialBattleGoals = [
  new BattleGoal(258, 'streamliner'),
  new BattleGoal(259, 'layabout'),
  new BattleGoal(260, 'workhorse'),
  new BattleGoal(261, 'zealot'),
  new BattleGoal(262, 'masochist'),
  new BattleGoal(263, 'fasthealer'),
  new BattleGoal(264, 'neutralizer'),
  new BattleGoal(265, 'plunderer'),
  new BattleGoal(266, 'protector'),
  new BattleGoal(267, 'explorer'),
  new BattleGoal(268, 'hoarder'),
  new BattleGoal(269, 'indigent'),
  new BattleGoal(270, 'pacifist'),
  new BattleGoal(271, 'sadist'),
  new BattleGoal(272, 'hunter'),
  new BattleGoal(273, 'professional'),
  new BattleGoal(274, 'aggressor'),
  new BattleGoal(275, 'dynamo'),
  new BattleGoal(276, 'purist'),
  new BattleGoal(277, 'opener'),
  new BattleGoal(278, 'diehard'),
  new BattleGoal(279, 'executioner'),
  new BattleGoal(280, 'straggler'),
  new BattleGoal(281, 'scrambler'),
];

export const battleGoalByLocalId = (localId: number): BattleGoal => {
  const zeroBasedIndex = localId - 1;
  return officialBattleGoals[zeroBasedIndex];
};
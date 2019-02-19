class BattleGoal {
  constructor(
    readonly globalCardId: number,
    readonly name: string,
    readonly displayName: string,
    readonly reward: number,
    readonly text: string
  ) {
  }
}

export const battleGoalImages = {
  background: 'https://lh3.googleusercontent.com/u/0/d/14yNwcdD1fUPuRE4WPIn9cYNpeZJinujR=w1440-h766-iv1',
  foreground: 'https://lh3.googleusercontent.com/u/0/d/19x3kdXZF2oEME3WipHeAXISfWkGtgmEA=w1440-h766-iv1'
};

export const officialBattleGoals = [
  new BattleGoal(258, 'streamliner', 'Streamliner', 1, 'Have five or more total cards in your hand and discard at the end of the scenario.'),
  new BattleGoal(259, 'layabout', 'Layabout', 2, 'Gain 7 or fewer experience points during the scenario.'),
  new BattleGoal(260, 'workhorse', 'Workhorse', 1, 'Gain 13 or more experience points during the scenario.'),
  new BattleGoal(261, 'zealot', 'Zealot', 1, 'Have three or fewer total cards in your hand and discard at the end of the scenario.'),
  new BattleGoal(262, 'masochist', 'Masochist', 1, 'Your current hit point value must be equal to or less than 2 at the end of the scenario.'),
  new BattleGoal(263, 'fasthealer', 'Fast Healer', 1, 'Your current hit point value must be equal to your maximum hit point value at the end of the scenario.'),
  new BattleGoal(264, 'neutralizer', 'Neutralizer', 1, 'Cause a trap to be sprung or disarmed on your turn or on the turn of one of your summons during the scenario.'),
  new BattleGoal(265, 'plunderer', 'Plunderer', 1, 'Loot a treasure overlay tile during the scenario.'),
  new BattleGoal(266, 'protector', 'Protector', 1, 'Allow none of your character allies to become exhausted during the scenario.'),
  new BattleGoal(267, 'explorer', 'Explorer', 1, 'Reveal a room tile by opening a door on your turn during the scenario.'),
  new BattleGoal(268, 'hoarder', 'Hoarder', 1, 'Loot five or more money tokens during the scenario.'),
  new BattleGoal(269, 'indigent', 'Indigent', 2, 'Loot no money tokens or treasure overlay tiles during the scenario.'),
  new BattleGoal(270, 'pacifist', 'Pacifist', 1, 'Kill three or fewer monsters during the scenario.'),
  new BattleGoal(271, 'sadist', 'Sadist', 1, 'Kill five or more monsters during the scenario.'),
  new BattleGoal(272, 'hunter', 'Hunter', 1, 'Kill one or more elite monsters during the scenario.'),
  new BattleGoal(273, 'professional', 'Professional', 1, 'Use your equipped items a number of times equal to or greater than your level plus 2 during the scenario.'),
  new BattleGoal(274, 'aggressor', 'Aggressor', 2, 'Have one or more monsters present on the map at the beginning of every round during the scenario.'),
  new BattleGoal(275, 'dynamo', 'Dynamo', 1, 'Kill a monster during the scenario by causing at least 3 more points of damage to it than is necessary.'),
  new BattleGoal(276, 'purist', 'Purist', 2, 'Use no items during the scenario.'),
  new BattleGoal(277, 'opener', 'Opener', 1, 'Be the first to kill a monster during the scenario.'),
  new BattleGoal(278, 'diehard', 'Diehard', 1, 'Never allow your current hit point value to drop below half your maximum hit point value (rounded up) during the scenario.'),
  new BattleGoal(279, 'executioner', 'Executioner', 1, 'Kill an undamaged monster with a single attack action during the scenario.'),
  new BattleGoal(280, 'straggler', 'Straggler', 1, 'Take only long rests during the scenario.'),
  new BattleGoal(281, 'scrambler', 'Scrambler', 1, 'Take only short rests during the scenario.'),
];

export const battleGoalByLocalId = (localId: number): BattleGoal => {
  const zeroBasedIndex = localId - 1;
  return officialBattleGoals[zeroBasedIndex];
};
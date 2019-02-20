class BattleGoal {
  constructor(
    readonly displayName: string,
    readonly reward: number,
    readonly text: string,
    readonly globalCardId: number,
    readonly name: string
  ) {
  }
}

export const battleGoalImages = {
  background: 'https://lh3.googleusercontent.com/u/0/d/14yNwcdD1fUPuRE4WPIn9cYNpeZJinujR=w1440-h766-iv1',
  foreground: 'https://lh3.googleusercontent.com/u/0/d/19x3kdXZF2oEME3WipHeAXISfWkGtgmEA=w1440-h766-iv1'
};

export const officialBattleGoals = [
  new BattleGoal('Streamliner', 1, 'Have five or more total cards in your hand and discard at the end of the scenario.', 258, 'streamliner'),
  new BattleGoal('Layabout', 2, 'Gain 7 or fewer experience points during the scenario.', 259, 'layabout'),
  new BattleGoal('Workhorse', 1, 'Gain 13 or more experience points during the scenario.', 260, 'workhorse'),
  new BattleGoal('Zealot', 1, 'Have three or fewer total cards in your hand and discard at the end of the scenario.', 261, 'zealot'),
  new BattleGoal('Masochist', 1, 'Your current hit point value must be equal to or less than 2 at the end of the scenario.', 262, 'masochist'),
  new BattleGoal('Fast Healer', 1, 'Your current hit point value must be equal to your maximum hit point value at the end of the scenario.', 263, 'fasthealer'),
  new BattleGoal('Neutralizer', 1, 'Cause a trap to be sprung or disarmed on your turn or on the turn of one of your summons during the scenario.', 264, 'neutralizer'),
  new BattleGoal('Plunderer', 1, 'Loot a treasure overlay tile during the scenario.', 265, 'plunderer'),
  new BattleGoal('Protector', 1, 'Allow none of your character allies to become exhausted during the scenario.', 266, 'protector'),
  new BattleGoal('Explorer', 1, 'Reveal a room tile by opening a door on your turn during the scenario.', 267, 'explorer'),
  new BattleGoal('Hoarder', 1, 'Loot five or more money tokens during the scenario.', 268, 'hoarder'),
  new BattleGoal('Indigent', 2, 'Loot no money tokens or treasure overlay tiles during the scenario.', 269, 'indigent'),
  new BattleGoal('Pacifist', 1, 'Kill three or fewer monsters during the scenario.', 270, 'pacifist'),
  new BattleGoal('Sadist', 1, 'Kill five or more monsters during the scenario.', 271, 'sadist'),
  new BattleGoal('Hunter', 1, 'Kill one or more elite monsters during the scenario.', 272, 'hunter'),
  new BattleGoal('Professional', 1, 'Use your equipped items a number of times equal to or greater than your level plus 2 during the scenario.', 273, 'professional'),
  new BattleGoal('Aggressor', 2, 'Have one or more monsters present on the map at the beginning of every round during the scenario.', 274, 'aggressor'),
  new BattleGoal('Dynamo', 1, 'Kill a monster during the scenario by causing at least 3 more points of damage to it than is necessary.', 275, 'dynamo'),
  new BattleGoal('Purist', 2, 'Use no items during the scenario.', 276, 'purist'),
  new BattleGoal('Opener', 1, 'Be the first to kill a monster during the scenario.', 277, 'opener'),
  new BattleGoal('Diehard', 1, 'Never allow your current hit point value to drop below half your maximum hit point value (rounded up) during the scenario.', 278, 'diehard'),
  new BattleGoal('Executioner', 1, 'Kill an undamaged monster with a single attack action during the scenario.', 279, 'executioner'),
  new BattleGoal('Straggler', 1, 'Take only long rests during the scenario.', 280, 'straggler'),
  new BattleGoal('Scrambler', 1, 'Take only short rests during the scenario.', 281, 'scrambler'),
];

export const battleGoalByLocalId = (localId: number): BattleGoal => {
  const zeroBasedIndex = localId - 1;
  return officialBattleGoals[zeroBasedIndex];
};
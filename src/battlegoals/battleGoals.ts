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

const communityBattleGoalsAsString = 'Bully: Kill a monster afflicted by a negative condition.\n' +
  'Challenger: Attack only monsters who have their starting hit point values. (2 Checks)\n' +
  'Discriminating: Kill no elite monsters or bosses during the scenario.\n' +
  'Distracted: Kill a monster you are not adjacent to while adjacent to to other monsters.\n' +
  'Elitist: Kill only elite monsters.\n' +
  'Exterminator: Kill three monsters in the same round. (2 Checks)\n' +
  'Finisher: Kill the last monster to die in the scenario.\n' +
  'Follower: Never attack a monster that has its starting hit point value.\n' +
  'Ineffective: Attack a monster and deal no damage.\n' +
  'Insulting: Apply another negative condition to a monster already afflicted by one.\n' +
  'Lucky: Kill a monster with an attack with disadvantage.\n' +
  'Marksman: Kill a monster three or more hexes away from you.\n' +
  'Multitasker: Kill a monster and open a door on the same round.\n' +
  'Peacemonger: Never deal the killing blow to a monster. (2 Checks)\n' +
  'Ritualistic: Kill a monster when two or more elements are strong or waning.\n' +
  'Sharpshooter: Kill a monster in a different room (neither of you may be on a doorway tile).\n' +
  'Underhanded: Only attack monsters that haven\'t yet acted each round.\n' +
  'Weakling: Never deal more than 4 damage with a single attack. (2 Checks)\n' +
  'Aggressive: Always play your top action before your bottom action.\n' +
  'Cuddler: Take a rest only on rounds in which an ally is also taking a long or short rest.\n' +
  'Feeble: Be the first player to become exhausted.\n' +
  'Hesitant: Never go first in a round\'s initiative.\n' +
  'Hothead: Add two cards to your lost pile before your first rest. (2 Checks)\n' +
  'Instigator: Never go last in a round\'s initiative.\n' +
  'Limping: Move using only basic move actions. (2 Checks)\n' +
  'Nimble: Always play your bottom action before your top action.\n' +
  'Ravager: Play two cards for their lost actions on the same turn.\n' +
  'Repeater: Play the same card three rounds in a row.\n' +
  'Reserved: Have the fewest cards in your lost pile at the end of the scenario.\n' +
  'Simplistic: On any turn in which you take a basic action, take only basic actions.\n' +
  'Specialized: Don\'t use any basic actions.\n' +
  'Stubborn: Do not lose any cards to negate damage during the scenario.\n' +
  'Winded: Never have fewer than three cards in your hand. (2 Checks)\n' +
  'Acrobatic: Lose a card to negate 5 or more damage.\n' +
  'Contagious: While afflicted by a negative condition, apply any negative condition to a monster.\n' +
  'Perforated: Lose 6 or more hit points in a single round. (2 Checks)\n' +
  'Pincushion: Get attacked by three or more monsters in the same round.\n' +
  'Retaliator: Don\'t make any attacks in the scenario until after you\'ve taken damage for the first time.\n' +
  'Sleepless: Take damage during the same round you take a long rest.\n' +
  'Untouchable: Take no damage. (2 Checks)\n' +
  'Wasteful: Lose a card to negate 2 or less damage.\n' +
  'Drowsy: Long rest while at your maximum hit point value.\n' +
  'Sober: Use no potions during the scenario.\n' +
  'Covetous: Never collect a money token from end-of-turn looting.\n' +
  'Miser: Never exit a room while money tokens remain in it. (2 Checks)\n' +
  'Mugger: Kill a monster and loot its money token on the same turn.\n' +
  'Pickpocket: Perform a loot action while adjacent to at least two monsters.\n' +
  'Prosperous: Collect three or more money tokens in the same turn.\n' +
  'Scavenger: Collect more money tokens than any other player.\n' +
  'Spotless: End the scenario in a room with no remaining money tokens or treasure overlay tiles.\n' +
  'Ambusher: Open a door and end your move action adjacent to a monster in the revealed room.\n' +
  'Bastion: Be adjacent to at least two monsters while standing on a door hex.\n' +
  'Compulsive: Every time you take a move action, move in a straight line.\n' +
  'Fearful: Never end your turn adjacent to a monster.\n' +
  'Hurdler: On your turn, enter three hexes containing monsters, traps, obstacles, hazardous or difficult terrain.\n' +
  'Leader: Never enter a room with an ally already in it.\n' +
  'Paranoid: End each of your turns adjacent to a wall or obstacle.\n' +
  'Recluse: Never end your turn adjacent to an ally.\n' +
  'Restless: Move at least one hex on each of your turns.\n' +
  'Shadow: End each of your turns adjacent to an ally.\n' +
  'Sociable: Never leave a room with a character ally remaining in it.\n' +
  'Stalwart: Never leave a hex adjacent to a monster. (2 Checks)\n' +
  'Thorough: Never exit a room with monsters remaining in it.\n' +
  'Trailblazer: Enter two or more hexes of difficult terrain, hazardous terrain, or traps in a single turn.';

export const communityBattleGoal = communityBattleGoalsAsString.split('\n')
  .map(it => it.trim())
  .map(it => it.split(':'))
  .map(it => {
    let text = it[1].trim();
    const twoChecks = text.includes(' (2 Checks)');
    text = text.replace(' (2 Checks)', '').replace('\n', '');
    return {
      displayName: it[0],
      text,
      reward: twoChecks ? 2 : 1
    }
  }).map((it, index) => new BattleGoal(it.displayName, it.reward, it.text, index, "empty"));

export const battleGoalByLocalId = (localId: number): BattleGoal => {
  const zeroBasedIndex = localId - 1;
  return officialBattleGoals[zeroBasedIndex];
};
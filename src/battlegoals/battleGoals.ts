import CardIdentifier from "cards/CardIdentifier";

export class BattleGoal {
  constructor(
    readonly displayName: string,
    readonly reward: number,
    readonly text: string,
    readonly globalCardId: CardIdentifier
  ) {
  }
}

export const battleGoalImages = {
  background: 'https://lh3.googleusercontent.com/u/0/d/14yNwcdD1fUPuRE4WPIn9cYNpeZJinujR=w1440-h766-iv1',
  foreground: 'https://lh3.googleusercontent.com/u/0/d/19x3kdXZF2oEME3WipHeAXISfWkGtgmEA=w1440-h766-iv1'
};

export const officialBattleGoals = [
  new BattleGoal('Streamliner', 1, 'Have five or more total cards in your hand and discard at the end of the scenario.', CardIdentifier.official(258)),
  new BattleGoal('Layabout', 2, 'Gain 7 or fewer experience points during the scenario.', CardIdentifier.official(259)),
  new BattleGoal('Workhorse', 1, 'Gain 13 or more experience points during the scenario.', CardIdentifier.official(260)),
  new BattleGoal('Zealot', 1, 'Have three or fewer total cards in your hand and discard at the end of the scenario.', CardIdentifier.official(261)),
  new BattleGoal('Masochist', 1, 'Your current hit point value must be equal to or less than 2 at the end of the scenario.', CardIdentifier.official(262)),
  new BattleGoal('Fast Healer', 1, 'Your current hit point value must be equal to your maximum hit point value at the end of the scenario.', CardIdentifier.official(263)),
  new BattleGoal('Neutralizer', 1, 'Cause a trap to be sprung or disarmed on your turn or on the turn of one of your summons during the scenario.', CardIdentifier.official(264)),
  new BattleGoal('Plunderer', 1, 'Loot a treasure overlay tile during the scenario.', CardIdentifier.official(265)),
  new BattleGoal('Protector', 1, 'Allow none of your character allies to become exhausted during the scenario.', CardIdentifier.official(266)),
  new BattleGoal('Explorer', 1, 'Reveal a room tile by opening a door on your turn during the scenario.', CardIdentifier.official(267)),
  new BattleGoal('Hoarder', 1, 'Loot five or more money tokens during the scenario.', CardIdentifier.official(268)),
  new BattleGoal('Indigent', 2, 'Loot no money tokens or treasure overlay tiles during the scenario.', CardIdentifier.official(269)),
  new BattleGoal('Pacifist', 1, 'Kill three or fewer monsters during the scenario.', CardIdentifier.official(270)),
  new BattleGoal('Sadist', 1, 'Kill five or more monsters during the scenario.', CardIdentifier.official(271)),
  new BattleGoal('Hunter', 1, 'Kill one or more elite monsters during the scenario.', CardIdentifier.official(272)),
  new BattleGoal('Professional', 1, 'Use your equipped items a number of times equal to or greater than your level plus 2 during the scenario.', CardIdentifier.official(273)),
  new BattleGoal('Aggressor', 2, 'Have one or more monsters present on the map at the beginning of every round during the scenario.', CardIdentifier.official(274)),
  new BattleGoal('Dynamo', 1, 'Kill a monster during the scenario by causing at least 3 more points of damage to it than is necessary.', CardIdentifier.official(275)),
  new BattleGoal('Purist', 2, 'Use no items during the scenario.', CardIdentifier.official(276)),
  new BattleGoal('Opener', 1, 'Be the first to kill a monster during the scenario.', CardIdentifier.official(277)),
  new BattleGoal('Diehard', 1, 'Never allow your current hit point value to drop below half your maximum hit point value (rounded up) during the scenario.', CardIdentifier.official(278)),
  new BattleGoal('Executioner', 1, 'Kill an undamaged monster with a single attack action during the scenario.', CardIdentifier.official(279)),
  new BattleGoal('Straggler', 1, 'Take only long rests during the scenario.', CardIdentifier.official(280)),
  new BattleGoal('Scrambler', 1, 'Take only short rests during the scenario.', CardIdentifier.official(281)),
];

const satireGamingBattleGoalsAsString = 'Bully: Kill a monster afflicted by a negative condition.\n' +
  'Challenger: Attack only monsters who have their starting hit point values. (2 Checks)\n' +
  'Discriminating: Kill no elite monsters or bosses during the scenario.\n' +
  'Distracted: Kill a monster you are not adjacent to while adjacent to other monsters.\n' +
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

export const satireGamingBattleGoals = satireGamingBattleGoalsAsString.split('\n')
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
  }).map((it, index) => new BattleGoal(it.displayName, it.reward, it.text, CardIdentifier.satireGaming(index)));

const allBattleGoals = officialBattleGoals.concat(satireGamingBattleGoals);

export const battleGoalByGlobalId = (globalId: CardIdentifier): BattleGoal => {
  const result = allBattleGoals.find(it => it.globalCardId.equals(globalId));
  if (result === undefined) {
    throw Error('There is no battle goal with globalId=' + globalId.asString())
  }
  return result;
};

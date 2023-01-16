import CardIdentifier from 'cards/CardIdentifier'

export class BattleGoal {
  constructor(
    readonly displayName: string,
    readonly reward: number,
    readonly text: string,
    readonly globalCardId: CardIdentifier,
  ) {}
}

export const battleGoalImages = {
  background: 'https://github.com/any2cards/worldhaven/raw/master/images/templates/gloomhaven/gh-battle-goals-back.jpg',
  foreground:
    'https://github.com/any2cards/worldhaven/raw/master/images/templates/gloomhaven/gh-battle-goals-front.jpg',
}

//prettier-ignore
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
  new BattleGoal('Scrambler', 1, 'Take only short rests during the scenario.', CardIdentifier.official(281))
];

//prettier-ignore
export const satireGamingBattleGoalsNewAsCsvString = 'Name;Text;NumChecksmarks\n' +
  'Acrobatic;Lose a card to negate 5 or more damage.;1\n' +
  'Ambusher;Open a door and end your move action adjacent to a monster in the revealed room.;1\n' +
  'Assassin;Kill a monster before it takes any actions in the scenario.;1\n' +
  'Assistant;Kill a monster attacked by an ally earlier in the round.;1\n' +
  'Bastion;Be adjacent to at least two monsters while standing on a door hex.;1\n' +
  'Bully;Kill a monster afflicted by a negative condition.;1\n' +
  'Contagious;While afflicted by a negative condition, apply any negative condition to a monster.;1\n' +
  'Covetous;Never collect a money token from end-of-turn looting.;1\n' +
  'Cuddler;Take a rest only on rounds in which an ally is also taking a long or short rest.;1\n' +
  'Discerning;Kill no elite monsters or bosses during the scenario.;1\n' +
  'Distracted;Kill a monster you are not adjacent to while adjacent to another monster.;1\n' +
  'Drowsy;Declare a long rest while at your maximum hit point value.;1\n' +
  'Elitist;Kill only elite monsters.;1\n' +
  'Exterminator;Kill three monsters in the same round.;2\n' +
  'Fearful;Never end your turn adjacent to a monster.;1\n' +
  'Feeble;Be the first player to become exhausted.;1\n' +
  'Feral;Have the most cards in your lost pile at the end of the scenario.;1\n' +
  'Finisher;Kill the last monster to die in the scenario.;1\n' +
  'Hesitant;Never go first in a round\'s initiative.;1\n' +
  'Hothead;Add two cards to your lost pile before your first rest.;2\n' +
  'Instigator;Except when long resting, never go last in a round\'s initiative.;1\n' +
  'Insulting;Apply another negative condition to a monster already afflicted by one.;1\n' +
  'Limping;Move using only basic move actions.;2\n' +
  'Lucky;Kill a monster with an attack with disadvantage.;1\n' +
  'Marksman;Kill a monster three or more hexes away from you.;1\n' +
  'Miser;Never exit a room while money tokens remain in it.;2\n' +
  'Mugger;Kill a monster and loot its money token on the same turn.;1\n' +
  'Multitasker;Kill a monster and open a door on the same round.;2\n' +
  'Paranoid;End each of your turns adjacent to a wall or obstacle.;2\n' +
  'Peacemonger;Never deal the killing blow to a monster.;2\n' +
  'Perforated;Lose 6 or more hit points in a single round.;1\n' +
  'Pickpocket;Perform a loot action while adjacent to at least two monsters.;1\n' +
  'Pincushion;Get attacked by three or more monsters in the same round.;1\n' +
  'Prosperous;Collect three or more money tokens in the same turn.;1\n' +
  'Ravager;Play two cards for their lost actions on the same turn.;1\n' +
  'Recluse;Never end your turn adjacent to an ally.;1\n' +
  'Reserved;Have the fewest cards in your lost pile at the end of the scenario.;1\n' +
  'Restless;Move at least one hex on each of your turns (except when long resting).;1\n' +
  'Retaliator;Don\'t make any attacks in the scenario until after you\'ve taken damage for the first time.;1\n' +
  'Ritualistic;Kill a monster when two or more elements are strong or waning.;1\n' +
  'Scavenger;Collect more money tokens than any other player.;1\n' +
  'Shadow;End each of your turns adjacent to an ally.;1\n' +
  'Sharpshooter;Kill a monster in a different room (neither of you may be on a doorway tile).;1\n' +
  'Slayer;Kill two monsters in the same round.;1\n' +
  'Sleepless;Take damage during the same round you take a long rest.;1\n' +
  'Sober;Use no potions during the scenario.;1\n' +
  'Sociable;Never leave a room with a character ally remaining in it.;1\n' +
  'Specialized;Don\'t use any basic actions.;1\n' +
  'Stalwart;Never leave a hex adjacent to a monster.;2\n' +
  'Stubborn;Do not lose any cards to negate damage during the scenario.;1\n' +
  'Thorough;Never exit a room with monsters remaining in it.;1\n' +
  'Untouchable;Take no damage.;2\n' +
  'Wasteful;Lose a card to negate 2 or less damage from an attack.;1\n' +
  'Winded;Never have fewer than one card in your hand.;1';

export const satireGamingBattleGoals = satireGamingBattleGoalsNewAsCsvString
  .split('\n')
  .slice(1)
  .map((line) => line.trim())
  .map((line) => line.split(';'))
  .map((it) => {
    return {
      displayName: it[0],
      text: it[1],
      reward: it[2] === '2' ? 2 : 1,
    }
  })
  .map((it, index) => new BattleGoal(it.displayName, it.reward, it.text, CardIdentifier.satireGaming(index)))

const allBattleGoals = officialBattleGoals.concat(satireGamingBattleGoals)

export const battleGoalByGlobalId = (globalId: CardIdentifier): BattleGoal => {
  const result = allBattleGoals.find((it) => it.globalCardId.equals(globalId))
  if (result === undefined) {
    throw new Error('There is no battle goal with globalId=' + globalId.asString())
  }
  return result
}

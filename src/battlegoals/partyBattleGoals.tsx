import * as React from "react";
import { NoProps, NoState } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import { range } from "lang/ranges";
import PlayerBattleGoals from "battlegoals/playerBattleGoals";

function battleGoals() {
  return range(1, 24);
}

function drawDistinctBattleGoals(count) {
  const allBattleGoals = battleGoals();
  return shuffle(allBattleGoals).slice(0, count);
}

export default class PartyBattleGoals extends React.Component<NoProps, NoState> {
  public render(): React.ReactNode {
    const battleGoalsPerPlayer = partition(2, drawDistinctBattleGoals(8));
    const containerStyle = {
      'display': 'flex',
      'flex-direction': 'row'
    };
    const playerBattleGoalsStyle = {
      'display': 'flex',
      'flex-direction': 'column',
      'padding': '0 0.25em 0 '
    };

    return <div style={containerStyle}>
      {battleGoalsPerPlayer.map((battleGoals, index) => {
        const first = battleGoals[0];
        const second = battleGoals[1];
        const playerNumber = index + 1;
        return <div style={playerBattleGoalsStyle} key={playerNumber}>
          <h4>Player {playerNumber}</h4>
          <PlayerBattleGoals key={playerNumber} first={first} second={second}/>
        </div>;
      })}
    </div>;
  }
}
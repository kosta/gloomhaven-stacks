import * as React from "react";
import { NoProps } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import { range } from "lang/ranges";
import PlayerBattleGoals from "battlegoals/playerBattleGoals";
import CommunityBattleGoalCard from "battlegoals/communityBattleGoalCard";
import BattleGoalCard from "./battleGoalCard";

function battleGoals(): Array<number> {
  return range(1, 24);
}

function communityBattleGoals(): Array<number> {
  return range(1, 100);
}

function drawDistinctBattleGoals(allBattleGoals: Array<number>, count:number): Array<number> {
  return shuffle(allBattleGoals).slice(0, count);
}

enum BattleGoalFlavour {
  Vanilla = 'Vanilla',
  Community = 'Community',
}

interface PartyBattleGoalsState {
  flavour: BattleGoalFlavour;
}

export default class PartyBattleGoals extends React.Component<NoProps, PartyBattleGoalsState> {

  constructor(props) {
    super(props);
    this.handleFlavourChange = this.handleFlavourChange.bind(this);
    this.state = {
      flavour: BattleGoalFlavour.Vanilla
    }
  }

  private handleFlavourChange(event) {
    this.setState({ flavour: event.target.value }, () => {
      console.log(this.state)
    });
  }

  public render(): React.ReactNode {
    const vanilla = this.state.flavour === BattleGoalFlavour.Vanilla;

    const allBattleGoals = vanilla ? battleGoals() : communityBattleGoals();
    const battleGoalsPerPlayer = partition(2, drawDistinctBattleGoals(allBattleGoals, 8));
    const containerStyle = {
      'display': 'flex',
      'flex-direction': 'row'
    };
    const playerBattleGoalsStyle = {
      'display': 'flex',
      'flex-direction': 'column',
      'padding': '0 0.25em 0 '
    };

    const kind = vanilla ? BattleGoalCard : CommunityBattleGoalCard;
    return [
      <select value={this.state.flavour} onChange={this.handleFlavourChange}>
        <option key={BattleGoalFlavour.Vanilla} value={BattleGoalFlavour.Vanilla}>vanilla</option>
        <option key={BattleGoalFlavour.Community} value={BattleGoalFlavour.Community}>community</option>
      </select>,
      <div style={containerStyle}>
        {battleGoalsPerPlayer.map((battleGoals, index) => {
          const first = battleGoals[0];
          const second = battleGoals[1];
          const playerNumber = index + 1;
          return <div style={playerBattleGoalsStyle} key={playerNumber}>
            <h4>Player {playerNumber}</h4>
            <PlayerBattleGoals kind={kind} key={playerNumber} first={first} second={second}/>
          </div>;
        })}
      </div>];
  }
}
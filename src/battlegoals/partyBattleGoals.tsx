import * as React from "react";
import { NoProps } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import PlayerBattleGoals from "battlegoals/playerBattleGoals";
import { BattleGoal, communityBattleGoals, officialBattleGoals } from "battlegoals/battleGoals";

function drawDistinctBattleGoals(allBattleGoals: Array<BattleGoal>, count: number): Array<BattleGoal> {
  return shuffle(allBattleGoals).slice(0, count);
}

interface PartyBattleGoalsState {
  includeVanilla: boolean;
  includeCommunity: boolean;
  drawnBattleGoals: BattleGoal[];
}

export default class PartyBattleGoals extends React.Component<NoProps, PartyBattleGoalsState> {

  constructor(props: NoProps) {
    super(props);
    this.handleDrawBattleGoals = this.handleDrawBattleGoals.bind(this);
    this.toggleVanilla = this.toggleVanilla.bind(this);
    this.toggleCommunity = this.toggleCommunity.bind(this);
    this.logState = this.logState.bind(this);
    this.state = {
      includeVanilla: false,
      includeCommunity: false,
      drawnBattleGoals: []
    }
  }

  private toggleVanilla(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeVanilla: event.target.checked }, this.logState);
  }

  private toggleCommunity(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeCommunity: event.target.checked }, this.logState);
  }

  private handleDrawBattleGoals() {
    const pool: BattleGoal[] = [];
    if (this.state.includeVanilla) {
      pool.push(...officialBattleGoals);
    }
    if (this.state.includeCommunity) {
      pool.push(...communityBattleGoals)
    }
    const partyGoals = drawDistinctBattleGoals(pool, 8);
    this.setState({ drawnBattleGoals: partyGoals }, this.logState);
  }

  private logState() {
    console.log(this.state);
  }

  public render(): React.ReactNode {
    const containerStyle = {
      'display': 'flex',
      'flexDirection': 'row'
    } as React.CSSProperties;
    const playerBattleGoalsStyle = {
      'display': 'flex',
      'flexDirection': 'column',
      'padding': '0 0.25em 0 '
    } as React.CSSProperties;

    const readyToDraw = this.state.includeVanilla || this.state.includeCommunity;
    const battleGoalsPerPlayer = partition(2, this.state.drawnBattleGoals);

    return [
      <div>
        <input type='checkbox' defaultChecked={this.state.includeVanilla} onChange={this.toggleVanilla}/><label>Vanilla</label>
        <input type='checkbox' defaultChecked={this.state.includeCommunity} onChange={this.toggleCommunity}/><label>Community</label>
        <button disabled={!readyToDraw} onClick={this.handleDrawBattleGoals}>draw</button>
      </div>,
      <div style={containerStyle}>
        {battleGoalsPerPlayer.map((battleGoals, index) => {
          const first = battleGoals[0];
          const second = battleGoals[1];
          const playerNumber = index + 1;
          return <div style={playerBattleGoalsStyle} key={playerNumber}>
            <h4>Player {playerNumber}</h4>
            <PlayerBattleGoals key={playerNumber} first={first} second={second}/>
          </div>;
        })}
      </div>];
  }
}
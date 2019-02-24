import * as React from "react";
import { NoProps } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import { range } from "lang/ranges";
import { BattleGoal, battleGoalByGlobalId, communityBattleGoals, officialBattleGoals } from "battlegoals/battleGoals";
import PlayerBattleGoals from "battlegoals/playerBattleGoals";
import BattleGoalCard from "battlegoals/battleGoalCard";


function drawDistinctBattleGoals(allBattleGoals: Array<BattleGoal>, count: number): Array<BattleGoal> {
  return shuffle(allBattleGoals).slice(0, count);
}

interface PartyBattleGoalsState {
  includeVanilla: boolean;
  includeCommunity: boolean;
  drawnBattleGoals: BattleGoal[];
  currentPlayer: void | number
}

export default class PartyBattleGoals extends React.Component<NoProps, PartyBattleGoalsState> {
  private storage: Storage = window.localStorage;

  constructor(props: NoProps) {
    super(props);
    this.handleDrawBattleGoals = this.handleDrawBattleGoals.bind(this);
    this.toggleVanilla = this.toggleVanilla.bind(this);
    this.toggleCommunity = this.toggleCommunity.bind(this);
    this.logState = this.logState.bind(this);
    this.handlePlayerToggle = this.handlePlayerToggle.bind(this);
    this.state = {
      includeVanilla: false,
      includeCommunity: false,
      drawnBattleGoals: [],
      currentPlayer: undefined
    }
  }

  componentDidMount() {
    const dtoAsString = this.storage.getItem('partyBattleGoalState');
    if (dtoAsString) {
      const dto = JSON.parse(dtoAsString);
      const stateFromStore = {
        includeVanilla: dto.includeVanilla,
        includeCommunity: dto.includeCommunity,
        drawnBattleGoals: dto.battleGoalIds.map(battleGoalByGlobalId)
      };
      this.setState(stateFromStore);
    }
  }

  componentWillUnmount(): void {
    const dto = {
      includeCommunity: this.state.includeCommunity,
      includeVanilla: this.state.includeVanilla,
      battleGoalIds: this.state.drawnBattleGoals.map(it => it.globalCardId)
    };
    this.storage.setItem('partyBattleGoalState', JSON.stringify(dto));
  }

  private toggleVanilla(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeVanilla: event.target.checked, drawnBattleGoals: [] }, this.logState);
  }

  private toggleCommunity(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeCommunity: event.target.checked, drawnBattleGoals: [] }, this.logState);
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

  private handlePlayerToggle(player: number) {
    const newCurrentPlayer = this.state.currentPlayer === player ? undefined : player;
    this.setState({ currentPlayer: newCurrentPlayer });
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
    const battleGoalsPerPlayer = partition(2, this.state.drawnBattleGoals);
    return [
      this.dealer(),
      this.picker(battleGoalsPerPlayer),
      <div key='player-pick' style={containerStyle}>
        {battleGoalsPerPlayer.map((battleGoals, index) => {
          const first = battleGoals[0];
          const second = battleGoals[1];
          const playerNumber = index + 1;
          return <div style={playerBattleGoalsStyle} key={`old-${playerNumber}`}>
            <h4>Player {playerNumber}</h4>
            <PlayerBattleGoals key={playerNumber} first={first} second={second}/>
          </div>;
        })}
      </div>];
  }

  private picker(battleGoalsPerPlayer: Array<Array<BattleGoal>>) {
    if (battleGoalsPerPlayer.length === 0) {
      return null;
    }

    const battleGoalSelectorStyle = {
      display: 'flex'
    } as React.CSSProperties;

    return <div key='battle-goal-selector' style={battleGoalSelectorStyle}>
      {this.playerSelection()}
      {this.cardPickers(battleGoalsPerPlayer)}
    </div>;
  }

  private playerSelection() {
    const playerSelectionStyle = {
      display: "flex",
      flexDirection: "column",
      width: '200px'
    } as React.CSSProperties;
    const buttonStyle = {
      borderRadius: '25px'
    } as React.CSSProperties;
    const buttonStyleSelected = {
      borderRadius: '25px',
      background: 'greenyellow'
    } as React.CSSProperties;

    return <div key='player-selection-container' style={playerSelectionStyle}>
      {range(0, 4).map(player => {
        const style = this.state.currentPlayer === player ? buttonStyleSelected : buttonStyle;
        return <button key={`select-player-${player}`} style={style} onClick={() => this.handlePlayerToggle(player)}>Player {player + 1}</button>;
      })}
    </div>
  }

  private cardPickers(battleGoalsPerPlayer: Array<Array<BattleGoal>>) {
    const currentPlayer = this.state.currentPlayer;
    if (currentPlayer === undefined) {
      return null;
    }

    const playerBattleGoals = battleGoalsPerPlayer[currentPlayer];
    const first = playerBattleGoals[0];
    const second = playerBattleGoals[1];
    return [
      <div key='first-battle-goal'>
        <BattleGoalCard key={first.globalCardId} battleGoal={first} show={true}/>
        <input type='checkbox'/>
      </div>,
      <div key='second-battle-goal'>
        <BattleGoalCard key={second.globalCardId} battleGoal={second} show={true}/>
        <input type='checkbox'/>
      </div>
    ];
  }

  private dealer() {
    const readyToDrawCards = this.state.includeVanilla || this.state.includeCommunity;
    return <div key='pool-configurator'>
      <input type='checkbox' checked={this.state.includeVanilla} onChange={this.toggleVanilla}/><label>Vanilla</label>
      <input type='checkbox' checked={this.state.includeCommunity} onChange={this.toggleCommunity}/><label>Community</label>
      <button disabled={!readyToDrawCards} onClick={this.handleDrawBattleGoals}>draw</button>
    </div>;
  }
}
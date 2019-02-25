import * as React from "react";
import { NoProps } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import { range } from "lang/ranges";
import { BattleGoal, battleGoalByGlobalId, satireGamingBattleGoals, officialBattleGoals } from "battlegoals/battleGoals";
import BattleGoalCard from "battlegoals/battleGoalCard";

function drawDistinctBattleGoals(allBattleGoals: Array<BattleGoal>, count: number): Array<BattleGoal> {
  return shuffle(allBattleGoals).slice(0, count);
}

interface Picks {
  [picks: number]: number
}

interface PartyBattleGoalsState {
  includeOfficial: boolean;
  includeSatireGaming: boolean;
  drawnBattleGoals: BattleGoal[];
  currentPlayer: void | number;
  picks: Picks;
}

export default class PartyBattleGoals extends React.Component<NoProps, PartyBattleGoalsState> {
  private storage: Storage = window.localStorage;

  constructor(props: NoProps) {
    super(props);
    this.handleDrawBattleGoals = this.handleDrawBattleGoals.bind(this);
    this.toggleIncludeOfficial = this.toggleIncludeOfficial.bind(this);
    this.toggleIncludeSatireGaming = this.toggleIncludeSatireGaming.bind(this);
    this.storeState = this.storeState.bind(this);
    this.handlePlayerToggle = this.handlePlayerToggle.bind(this);
    this.handlePlayerPick = this.handlePlayerPick.bind(this);
    this.state = {
      includeOfficial: false,
      includeSatireGaming: false,
      drawnBattleGoals: [],
      currentPlayer: undefined,
      picks: {}
    }
  }

  componentDidMount() {
    const dtoAsString = this.storage.getItem('partyBattleGoalState');
    if (dtoAsString !== null) {
      const dto = JSON.parse(dtoAsString);
      const stateFromStore = {
        includeOfficial: dto.includeOfficial,
        includeSatireGaming: dto.includeSatireGaming,
        drawnBattleGoals: dto.battleGoalIds.map(battleGoalByGlobalId),
        picks: dto.picks || {}
      };
      this.setState(stateFromStore);
    }
  }

  private toggleIncludeOfficial(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeOfficial: event.target.checked, drawnBattleGoals: [] }, this.storeState);
  }

  private toggleIncludeSatireGaming(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ includeSatireGaming: event.target.checked, drawnBattleGoals: [] }, this.storeState);
  }

  private handleDrawBattleGoals() {
    const pool: BattleGoal[] = [];
    if (this.state.includeOfficial) {
      pool.push(...officialBattleGoals);
    }
    if (this.state.includeSatireGaming) {
      pool.push(...satireGamingBattleGoals)
    }
    const partyGoals = drawDistinctBattleGoals(pool, 8);
    this.setState({ drawnBattleGoals: partyGoals, picks: {} }, this.storeState);
  }

  private handlePlayerToggle(player: number) {
    const newCurrentPlayer = this.state.currentPlayer === player ? undefined : player;
    this.setState({ currentPlayer: newCurrentPlayer });
  }

  private handlePlayerPick(checked: boolean, player: number, battleGoal: BattleGoal) {
    const newPicks = { ...this.state.picks };
    if (checked) {
      newPicks[player] = battleGoal.globalCardId;
    } else {
      delete newPicks[player];
    }
    this.setState({ picks: newPicks }, this.storeState);
  }

  private storeState() {
    const dto = {
      includeSatireGaming: this.state.includeSatireGaming,
      includeOfficial: this.state.includeOfficial,
      battleGoalIds: this.state.drawnBattleGoals.map(it => it.globalCardId),
      picks: this.state.picks
    };
    this.storage.setItem('partyBattleGoalState', JSON.stringify(dto));
  }

  public render(): React.ReactNode {
    return [
      this.dealer(),
      this.picker()
    ];
  }

  private picker() {
    const battleGoalsPerPlayer = partition(2, this.state.drawnBattleGoals);
    if (battleGoalsPerPlayer.length === 0) {
      return null;
    }

    const battleGoalSelectorStyle = {
      display: 'flex'
    } as React.CSSProperties;

    return <div key='battle-goal-selector' style={battleGoalSelectorStyle}>
      {this.playerSelection()}
      {this.battleGoalPicker(battleGoalsPerPlayer)}
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

  private battleGoalPicker(battleGoalsPerPlayer: Array<Array<BattleGoal>>) {
    const currentPlayer = this.state.currentPlayer;
    if (currentPlayer === undefined) {
      return null;
    }
    const playerBattleGoals = battleGoalsPerPlayer[currentPlayer];
    return playerBattleGoals.map((battleGoal, index) => {
      return <div key={`battle-goal-${index}`}>
        <BattleGoalCard key={battleGoal.globalCardId} battleGoal={battleGoal} show={true}/>
        <input type='checkbox' checked={this.pickedByPlayer(currentPlayer, battleGoal)} onChange={(e) => this.handlePlayerPick(e.target.checked, currentPlayer, battleGoal)}/>
      </div>
    });
  }

  private dealer() {
    const readyToDrawCards = this.state.includeOfficial || this.state.includeSatireGaming;
    return <div key='pool-configurator'>
      <input type='checkbox' checked={this.state.includeOfficial} onChange={this.toggleIncludeOfficial}/><label>Official</label>
      <input type='checkbox' checked={this.state.includeSatireGaming} onChange={this.toggleIncludeSatireGaming}/><label><a href='http://eepurl.com/dEDLkH' target='_blank'>Satire Gaming</a></label>
      <button disabled={!readyToDrawCards} onClick={this.handleDrawBattleGoals}>draw</button>
    </div>;
  }

  private pickedByPlayer(currentPlayer: number, battleGoal: BattleGoal) {
    return this.state.picks[currentPlayer] === battleGoal.globalCardId;
  }
}
import * as React from "react";
import { noop, NoProps } from "lang/react";
import { partition, shuffle } from "lang/arrays";
import { range } from "lang/ranges";
import { BattleGoal, battleGoalByGlobalId, officialBattleGoals, satireGamingBattleGoals } from "battlegoals/battleGoals";
import BattleGoalCard from "battlegoals/battleGoalCard";
import CardIdentifier from "cards/cardIdentifier";

function drawDistinctBattleGoals(allBattleGoals: Array<BattleGoal>, count: number): Array<BattleGoal> {
  return shuffle(allBattleGoals).slice(0, count);
}

interface Picks {
  [picks: number]: CardIdentifier | void
}

interface PartyBattleGoalsState {
  includeOfficial: boolean;
  includeSatireGaming: boolean;
  drawnBattleGoals: BattleGoal[];
  currentPlayer: void | number;
  picks: Picks;
  hover: number;
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
    this.startHover = this.startHover.bind(this);
    this.stopHover = this.stopHover.bind(this);
    this.state = {
      includeOfficial: false,
      includeSatireGaming: false,
      drawnBattleGoals: [],
      currentPlayer: undefined,
      picks: {},
      hover: -1
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
      this.setState(stateFromStore, noop);
    }
  }

  private startHover(cardIndex: number): void {
    this.setState({ hover: cardIndex }, noop);
  }

  private stopHover(cardIndex: number): void {
    if (this.state.hover !== cardIndex) {
      return;
    }
    this.setState({ hover: -1 }, noop);
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
    this.setState({ currentPlayer: newCurrentPlayer }, noop);
  }

  private handlePlayerPick(player: number, battleGoal: BattleGoal) {
    const pick = this.state.picks[player] !== battleGoal.globalCardId;
    const newPicks = { ...this.state.picks };
    if (pick) {
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
    return <React.Fragment>
      {this.dealer()}
      {this.picker()}
    </React.Fragment>;
  }

  private picker() {
    const battleGoalsPerPlayer = partition(2, this.state.drawnBattleGoals);
    if (battleGoalsPerPlayer.length === 0) {
      return null;
    }

    const battleGoalSelectorStyle = {
      display: 'flex',
      width: '50%',
      height: '300px',
      justifyContent: 'space-between'
    } as React.CSSProperties;

    return <div key='battle-goal-selector' style={battleGoalSelectorStyle}>
      {this.playerSelection()}
      {this.battleGoalPicker(battleGoalsPerPlayer)}
    </div>;
  }

  private playerSelection() {
    const playerSelectionStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      width: '200px'
    } as React.CSSProperties;
    const buttonStyle = {
      borderRadius: '25px',
      height: '50px'
    } as React.CSSProperties;
    return <div key='player-selection-container' style={playerSelectionStyle}>
      {range(0, 4).map(player => {
        const style = { ...buttonStyle };
        if (this.state.currentPlayer === player) {
          style.background = 'greenyellow'
        }
        return <button key={`select-player-${player}`} style={style} onClick={() => this.handlePlayerToggle(player)}>Player {player + 1}</button>;
      })}
    </div>
  }

  private battleGoalPicker(battleGoalsPerPlayer: Array<Array<BattleGoal>>) {
    const currentPlayer = this.state.currentPlayer;
    if (currentPlayer === undefined) {
      return null;
    }
    const style = {
      cursor: 'grab'
    } as React.CSSProperties;
    const playerBattleGoals = battleGoalsPerPlayer[currentPlayer];
    return playerBattleGoals.map((battleGoal, index) => {
      const pickedBattleGoalId = this.state.picks[currentPlayer];
      const playerPickedABattleGoal = pickedBattleGoalId !== undefined;
      const playerPickedCurrentBattleGoal = pickedBattleGoalId !== undefined && pickedBattleGoalId.equals(battleGoal.globalCardId);
      const notPickedCurrentBattleGoal = !playerPickedCurrentBattleGoal;
      return <div key={`battle-goal-${index}`}
                  style={style}
                  onMouseOver={() => this.startHover(index)}
                  onMouseOut={() => this.stopHover(index)}
                  onClick={() => this.handlePlayerPick(currentPlayer, battleGoal)}>
        <BattleGoalCard key={battleGoal.globalCardId.toString()}
                        battleGoal={battleGoal}
                        cardShadow={playerPickedCurrentBattleGoal}
                        blurCard={playerPickedABattleGoal && notPickedCurrentBattleGoal}
        />
      </div>
    });
  }

  private dealer() {
    const readyToDrawCards = this.state.includeOfficial || this.state.includeSatireGaming;
    const style = {
      margin: '25px 0 25px 25px'
    } as React.CSSProperties;
    return <div style={style} key='pool-configurator'>
      <input type='checkbox' checked={this.state.includeOfficial} onChange={this.toggleIncludeOfficial}/><label>Official</label>
      <input type='checkbox' checked={this.state.includeSatireGaming} onChange={this.toggleIncludeSatireGaming}/><label><a href='http://eepurl.com/dEDLkH' target='_blank'>Satire Gaming</a></label>
      <button disabled={!readyToDrawCards} onClick={this.handleDrawBattleGoals}>draw</button>
    </div>;
  }
}
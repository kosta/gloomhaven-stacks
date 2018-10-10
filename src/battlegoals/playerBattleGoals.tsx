import * as React from "react";
import { NoState } from "lang/react";
import BattleGoalCard from "battlegoals/battleGoalCard";

interface PlayerBattleGoalsProps {
  first: number,
  second: number;
}

export default class PlayerBattleGoals extends React.Component<PlayerBattleGoalsProps, NoState> {
  public render(): React.ReactNode {
    return <ul>
      <li key='first'><BattleGoalCard battleGoalId={this.props.first}/></li>
      <li key='second'><BattleGoalCard battleGoalId={this.props.second}/></li>
    </ul>;
  }
}

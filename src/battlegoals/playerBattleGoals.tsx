import * as React from "react";
import { NoState } from "lang/react";
import BattleGoalCard from "battlegoals/battleGoalCard";
import { BattleGoal } from "battlegoals/battleGoals";

interface PlayerBattleGoalsProps {
  first: BattleGoal,
  second: BattleGoal;
}

export default class PlayerBattleGoals extends React.Component<PlayerBattleGoalsProps, NoState> {
  public render(): React.ReactNode {
    return <ul>
      <li key='first'><BattleGoalCard battleGoal={this.props.first}/></li>
      <li key='second'><BattleGoalCard battleGoal={this.props.second}/></li>
    </ul>;
  }
}

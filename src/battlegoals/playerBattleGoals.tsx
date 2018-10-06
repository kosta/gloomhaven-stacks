import * as React from "react";
import { NoState } from "lang/react";

interface PlayerBattleGoalsProps {
  kind: any,
  first: number,
  second: number;
}

export default class PlayerBattleGoals extends React.Component<PlayerBattleGoalsProps, NoState> {
  public render(): React.ReactNode {
    return <ul>
      <li key='first'><this.props.kind battleGoalId={this.props.first}/></li>
      <li key='second'><this.props.kind battleGoalId={this.props.second}/></li>
    </ul>;
  }
}

import * as React from "react";
import { noop } from "lang/react";

interface BattleGoalCardProps {
  battleGoalId: number
}

interface BattleGoalCardState {
  hidden: boolean,
}

export default class BattleGoalCard extends React.Component<BattleGoalCardProps, BattleGoalCardState> {
  constructor(props) {
    super(props);
    this.reveal = this.reveal.bind(this);
    this.hide = this.hide.bind(this);
    this.state = { hidden: true };
  }

  private reveal (): void {
    this.setState({ hidden: false }, noop);
  }

  private hide(): void {
    this.setState({ hidden: true }, noop);
  }

  public render(): React.ReactNode {
    const style = {
      opacity: this.state.hidden ? 0 : 1
    };
    return <span style={style} onMouseOver={this.reveal} onMouseOut={this.hide} key='first'>{this.props.battleGoalId}</span>;
  }
}
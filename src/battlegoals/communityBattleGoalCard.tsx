import * as React from "react";
import { noop } from "lang/react";

interface CommunityBattleGoalCardProps {
  battleGoalId: number
}

interface CommunityBattleGoalCardState {
  hidden: boolean,
}

export default class CommunityBattleGoalCard extends React.Component<CommunityBattleGoalCardProps, CommunityBattleGoalCardState> {
  constructor(props: CommunityBattleGoalCardProps) {
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
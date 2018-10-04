import * as React from "react";
import { noop } from "lang/react";
import { battleGoalByLocalId } from "battlegoals/battleGoals";

const battleGoalBackground = 'battlegoal-back';

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

  private reveal(): void {
    this.setState({ hidden: false }, noop);
  }

  private hide(): void {
    this.setState({ hidden: true }, noop);
  }

  public render(): React.ReactNode {
    const style = {
      height: 300,
      width: 200
    } as React.CSSProperties;
    const imageName = this.state.hidden ? battleGoalBackground : battleGoalByLocalId(this.props.battleGoalId).name;
    const imageUrl = "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/battle-goals/" + imageName + ".png";
    return <span onMouseOver={this.reveal} onMouseOut={this.hide}>
                <img src={imageUrl} style={style}/>
    </span>;
  }
}
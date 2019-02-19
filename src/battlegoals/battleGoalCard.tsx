import * as React from "react";
import { noop } from "lang/react";
import { battleGoalByLocalId, battleGoalImages } from "battlegoals/battleGoals";

interface BattleGoalCardProps {
  battleGoalId: number
}

interface BattleGoalCardState {
  hidden: boolean,
}

export default class BattleGoalCard extends React.Component<BattleGoalCardProps, BattleGoalCardState> {
  constructor(props: BattleGoalCardProps) {
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
    const imageStyle = {
      height: 300,
      width: 200
    } as React.CSSProperties;
    const imageUrl = this.state.hidden ?
      battleGoalImages.background :
      "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/battle-goals/" + (battleGoalByLocalId(this.props.battleGoalId).name) + ".png";



    return <div onMouseOver={this.reveal} onMouseOut={this.hide}>
                <img src={imageUrl} style={imageStyle}/>
    </div>;
  }
}
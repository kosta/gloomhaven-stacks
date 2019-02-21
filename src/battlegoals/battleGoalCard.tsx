import * as React from "react";
import { noop } from "lang/react";
import { battleGoalImages, BattleGoal } from "battlegoals/battleGoals";
import { range } from "../lang/ranges";

interface BattleGoalCardProps {
  battleGoal: BattleGoal;
  show?: boolean;
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
    const battleGoalStyle = {
      position: 'relative',
      height: 300,
      width: 200
    } as React.CSSProperties;

    const imageStyle = {
      height: '100%',
      width: '100%'
    };

    const imageUrl = (this.state.hidden && !this.props.show) ? battleGoalImages.background : battleGoalImages.foreground;

    // "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/battle-goals/" + (battleGoalByLocalId(this.props.battleGoalId).name) + ".png"

    return <div style={battleGoalStyle} onMouseOver={this.reveal} onMouseOut={this.hide}>
      <img style={imageStyle} src={imageUrl} alt='ups'/>
      {this.renderOverlay()}
    </div>;
  }

  private renderOverlay(): React.ReactNode {
    if (this.state.hidden && !this.props.show) {
      return null;
    }

    const overlayStyle = {
      position: 'absolute',
      top: '22%',
      right: '20%',
      bottom: '10%',
      left: '20%',
      textAlign: 'center'
    } as React.CSSProperties;

    const textStyle = {
      position: 'absolute',
      width: '100%'
    } as React.CSSProperties;

    const titleStyle = {
      margin: '0 0 17% 0',
      fontSize: '1.35em',
      fontWeight: 'normal'
    } as React.CSSProperties;

    const descriptionStyle = {
      position: 'absolute',
      fontSize: '0.8em',
      lineHeight: '1.2em',
      left: '50%',
      width: '68%',
      margin: ' 0 0 0 -34%'
    } as React.CSSProperties;

    const perksStyle = {
      position: 'absolute',
      bottom: '12.5%',
      left: '50%',
      width: '50%',
      margin: '0 0 0 -30%',
      fontSize: '2em',
      fontWeight: 'bold'
    } as React.CSSProperties;

    const cardNumberStyle = {
      position: 'absolute',
      bottom: '3%',
      left: '50%',
      width: '20%',
      margin: '0 0 0 -15%',
      color: 'white',
      fontSize: 'xx-small',
    } as React.CSSProperties;

    const battleGoal = this.props.battleGoal;

    return <div style={overlayStyle}>
      <div style={textStyle}>
        <h3 style={titleStyle}>{battleGoal.displayName}</h3>
        <section style={descriptionStyle}>{battleGoal.text}</section>
      </div>
      <div style={perksStyle}>{range(0, battleGoal.reward).map(() => '✓').join('')}</div>
      <div style={cardNumberStyle}>{battleGoal.globalCardId}</div>
    </div>;
  }
}
import * as React from "react";
import { NoState } from "lang/react";
import { BattleGoal, battleGoalImages } from "battlegoals/battleGoals";
import { range } from "lang/ranges";

interface BattleGoalCardProps {
  battleGoal: BattleGoal;
  cardShadow: boolean;
}

export default class BattleGoalCard extends React.Component<BattleGoalCardProps, NoState> {
  constructor(props: BattleGoalCardProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const battleGoalStyle = {
      position: 'relative',
      height: 300,
      width: 200
    } as React.CSSProperties;

    const imageStyle = {
      borderRadius: '15px',
      height: '100%',
      width: '100%'
    } as React.CSSProperties;

    if (this.props.cardShadow) {
      imageStyle.boxShadow = '0px 12px 22px 1px rgb(27, 26, 26)';
    }

    return <div style={battleGoalStyle}>
      <img style={imageStyle} src={battleGoalImages.foreground} alt='ups'/>
      {this.renderOverlay()}
    </div>;
  }

  private renderOverlay(): React.ReactNode {
    const overlayStyle = {
      position: 'absolute',
      top: '22%',
      width: '64%',
      bottom: '10%',
      left: '18%',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center'
    } as React.CSSProperties;

    const titleStyle = {
      margin: '0',
      fontFamily: 'Pirata One',
      fontSize: '1.35em',
      fontWeight: 'normal'
    } as React.CSSProperties;

    const descriptionStyle = {
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'High Tower',
      fontSize: '0.8em',
      lineHeight: '1.2em',
      height: '52%',
      padding: '0 7% 0 7%',
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
      <h3 style={titleStyle}>{battleGoal.displayName}</h3>
      <section style={descriptionStyle}>{battleGoal.text}</section>
      <div key='perks' style={perksStyle}>{range(0, battleGoal.reward).map(() => '✓').join('')}</div>
      <div key='globalCardId' style={cardNumberStyle}>{battleGoal.globalCardId}</div>
    </div>;
  }
}
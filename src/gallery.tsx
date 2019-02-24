import * as React from "react"
import * as ReactDOM from "react-dom";
import { NoProps, NoState } from "lang/react";
import { officialBattleGoals, communityBattleGoals } from 'battlegoals/battleGoals'
import BattleGoalCard from "battlegoals/battleGoalCard";
import { CSSProperties } from "react";
import "./style.css";

class Gallery extends React.Component<NoProps, NoState> {
  render(): React.ReactNode {
    const allBattleGoals = officialBattleGoals.concat(communityBattleGoals);
    const style = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    } as CSSProperties;
    const imageStyle = {
      width: 200,
      height: 300
    };
    const cards = allBattleGoals.map(it => {
      const imgUrl = "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/battle-goals/" + (it.name) + ".png";
      const style = {
        display: 'flex',
        flexDirection: 'row'
      } as CSSProperties;
      return <div style={style} key={it.globalCardId}>
        <BattleGoalCard battleGoal={it} show={true}/>
        <img style={imageStyle} src={imgUrl} alt='bogus'/>
      </div>
    });
    return <div style={style}>
      {cards}
    </div>
  }
}

ReactDOM.render(
  <Gallery/>,
  document.getElementById('root')
);
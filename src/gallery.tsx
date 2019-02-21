import * as React from "react"
import * as ReactDOM from "react-dom";
import { NoProps, NoState } from "lang/react";
import { officialBattleGoals, communityBattleGoal } from 'battlegoals/battleGoals'
import BattleGoalCard from "./battlegoals/battleGoalCard";
import { CSSProperties } from "react";

class Gallery extends React.Component<NoProps, NoState> {
  render(): React.ReactNode {
    const allBattleGoals = officialBattleGoals.concat(communityBattleGoal);
    const style = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    } as CSSProperties;
    const cards = allBattleGoals.map(it => <BattleGoalCard key={it.globalCardId} battleGoal={it} show={true}/>);
    return <div style={style}>
      {cards}
    </div>
  }
}

ReactDOM.render(
  <Gallery/>,
  document.getElementById('root')
);
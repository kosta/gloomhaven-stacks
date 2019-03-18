import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NoProps, NoState } from 'lang/react';
import { BattleGoal, officialBattleGoals, satireGamingBattleGoals } from 'battlegoals/battleGoals';
import BattleGoalCard from 'battlegoals/BattleGoalCard';
import { CSSProperties } from 'react';
import './style.css';

function urlToScanFor(it: BattleGoal) {
  if (it.globalCardId.origin !== 'official') {
    return 'empty';
  }
  return it.name;
}

class Gallery extends React.Component<NoProps, NoState> {
  render(): React.ReactNode {
    const allBattleGoals = officialBattleGoals.concat(satireGamingBattleGoals);
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
      const imgUrl = `https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/battle-goals/${urlToScanFor(it)}.png`;
      const style = {
        display: 'flex',
        flexDirection: 'row'
      } as CSSProperties;
      return <div style={style} key={it.globalCardId.asString()}>
        <BattleGoalCard battleGoal={it} cardShadow={false} blurCard={false}/>
        <img style={imageStyle} src={imgUrl} alt='empty'/>
      </div>;
    });
    return <div style={style}>
      {cards}
    </div>;
  }
}

ReactDOM.render(
  <Gallery/>,
  document.getElementById('root')
);
import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { PartyBattleGoals } from 'battlegoals/PartyBattleGoals';
import "./style.css";


let app = (<PartyBattleGoals/>);
ReactDOM.render(
  app,
  document.getElementById('root')
);

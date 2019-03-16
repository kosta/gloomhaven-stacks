import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { App } from "app/App";
import "./style.css";

const initialCardStacks = App.initializeStacksFromLocalStorage();
let app = <App initialCardStacks={initialCardStacks}/>;
ReactDOM.render(
  app,
  document.getElementById('root')
);

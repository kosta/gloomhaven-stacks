import * as React from 'react';
import { CardRenderProps, isPersonalGoalProps, isRandomSideScenarioProps } from './CardRenderProps';
import { PersonalGoalCard } from 'cards/PersonalGoalCard';

export interface CardStack {
  list: Array<number>,
  stack: Array<number>,
  history: Array<CardStackEvent>
}

export interface CardStackEvent {
  action: string,
  card?: number,
  cards?: Array<number>,
  event?: number,
}

export function cardToDiv(cardId: number, props: CardRenderProps) {
  if (isPersonalGoalProps(props)) {
    return <PersonalGoalCard cardId={cardId}/>
  } else if (isRandomSideScenarioProps(props)) {
    return null
  } else {
    let n = cardId - props.offset;
    let row = Math.floor(n / props.cols);
    let col = n % props.cols;
    let style = {
      borderRadius: '15px',
      background: "url(" + props.url + ") no-repeat scroll top -" + (row * props.height) + "px left -" + (col * props.width) + "px",
      width: (props.width - 14) + "px",
      maxWidth: (props.width - 14) + "px",
      height: (props.height - 3) + "px",
      marginLeft: "10px",
      color: "white",
      padding: "0 0 3px 14px",
      display: "inline-block",
    };
    return <div key={cardId} style={style}>{cardId}</div>;
  }
}


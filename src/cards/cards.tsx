import { gloomhavenItems } from 'cards/items-data';
import { ItemCard, PersonalGoalCard } from 'cards/PersonalGoalCard';
import * as React from 'react';
import { CardRenderProps, isItemProps, isPersonalGoalProps, isRandomSideScenarioProps, ItemProps } from './CardRenderProps';

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

export function itemToDiv(itemId: number) {
  const path = gloomhavenItems.get(itemId);
  if (path === undefined) {
    throw new Error(`no patch for item ${itemId}`);
  }
  return cardToDiv(itemId, new ItemProps(itemId, path, 'stand-in'));
}

export function cardToDiv(cardId: number, props: CardRenderProps) {
  if (isPersonalGoalProps(props)) {
    return <PersonalGoalCard cardId={cardId}/>;
  } else if (isRandomSideScenarioProps(props)) {
    return null;
  } else if (isItemProps(props)) {
    return <ItemCard {...props}></ItemCard>;
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


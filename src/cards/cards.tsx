import { ItemCard } from 'cards/ItemCard'
import { gloomhavenItems } from 'cards/items-data'
import { PersonalGoalCard } from 'cards/PersonalGoalCard'
import * as React from 'react'
import {
  CardRenderProps,
  isItemProps,
  isPersonalGoalProps,
  isRandomItemDesignProps,
  isRandomSideScenarioProps,
  ItemProps,
} from './CardRenderProps'

export interface CardStack {
  list: Array<number>
  stack: Array<number>
  history: Array<CardStackEvent>
}

export interface CardStackEvent {
  action: string
  card?: number
  cards?: Array<number>
  event?: number
}

export function itemToDiv(itemId: number) {
  const path = gloomhavenItems.get(itemId)
  if (path === undefined) {
    throw new Error(`no patch for item ${itemId}`)
  }
  return cardToDiv(itemId, new ItemProps(itemId, path, 'Item'))
}

export function cardToDiv(cardId: number, props: CardRenderProps) {
  if (isPersonalGoalProps(props)) {
    return <PersonalGoalCard cardId={cardId} />
  } else if (isRandomSideScenarioProps(props)) {
    return null
  } else if (isItemProps(props)) {
    return <ItemCard key={cardId} {...props}></ItemCard>
  } else if (isRandomItemDesignProps(props)) {
    const path = gloomhavenItems.get(cardId)
    if (path === undefined) {
      throw new Error(`no patch for item ${cardId}`)
    }
    return (
      <ItemCard
        key={cardId}
        kind="random-item-design-props"
        id={cardId}
        path={path}
        name="Random Item Design"
      ></ItemCard>
    )
  }
}

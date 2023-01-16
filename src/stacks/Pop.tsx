import { OpenDialog } from 'app/OpenDialog'
import { AddCards, AddCardsProps } from 'cards/addCards'
import { CardStack } from 'cards/cards'
import { BringEventToConclusion } from 'events/BringEventToConclusion'
import { EventType } from 'events/EventCard'
import * as React from 'react'

export interface StackPopped {
  stackPopped: (name: string, returnToBottom: boolean) => void
}

interface PopProps extends OpenDialog, AddCardsProps, StackPopped {
  name: EventType
  cards: CardStack
}

// Pop draws the _top_ card of the deck
export const Pop = (props: PopProps) => {
  const clicked = () => {
    props.setDialog(
      <BringEventToConclusion name={props.name} number={props.cards.stack[0]} stackPopped={props.stackPopped}>
        <AddCards onAddCards={props.onAddCards} />
      </BringEventToConclusion>,
    )
  }

  return (
    <button type="button" onClick={clicked} disabled={props.cards.stack.length === 0}>
      {'Draw ' + props.name + ' Event'}
    </button>
  )
}

import { OpenDialog } from 'app/OpenDialog'
import { CardRenderProps, isPersonalGoalProps } from 'cards/CardRenderProps'
import { CardStack, cardToDiv } from 'cards/cards'
import { css } from 'lang/react'
import * as React from 'react'

export interface DrawnCallback {
  drawn: (name: String, cards: CardStack, cardNo: number) => void
}

interface RandomCardProps {
  drawnCards: Array<number>
  name: string
  drawn: (name: string, cards: CardStack, cardNo: number) => void
  cards: CardStack
  cardProps: CardRenderProps
}

export const RandomCard = (props: RandomCardProps) => {
  const clicked = (cardNo: number) => {
    props.drawn(props.name, props.cards, cardNo)
  }

  return (
    <React.Fragment>
      <h2 key="h2">
        Drawn {props.name}: {props.drawnCards.join(' ')}
      </h2>
      <div key="button-div">
        {props.drawnCards.map((cardNumber) => {
          const styles = css({
            display: 'inline-block',
          })
          if (isPersonalGoalProps(props.cardProps)) {
            styles.width = props.cardProps.divWidth
          }
          return (
            <div key={'span-' + cardNumber} style={styles}>
              <div key={'button-div-' + cardNumber}>
                <button key={'button-' + cardNumber} type="button" onClick={() => clicked(cardNumber)}>
                  Accept {cardNumber}
                </button>
              </div>
              {cardToDiv(cardNumber, props.cardProps)}
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )
}

interface DrawProps extends OpenDialog, DrawnCallback {
  cards: CardStack
  n: number
  name: string
  cardProps: CardRenderProps
}

// Draw draws a _random_ card from the deck
export const Draw = (props: DrawProps) => {
  const clicked = () => {
    let drawnCards = []
    let next
    for (let i = 0; i < props.n && drawnCards.length < props.cards.stack.length; i++) {
      do {
        next = props.cards.stack[Math.floor(Math.random() * props.cards.stack.length)]
      } while (drawnCards.indexOf(next) > -1)
      drawnCards.push(next)
    }
    drawnCards.sort()
    props.setDialog(
      <RandomCard
        name={props.name}
        drawnCards={drawnCards}
        cards={props.cards}
        drawn={props.drawn}
        cardProps={props.cardProps}
      />,
    )
  }

  return (
    <button type="button" onClick={clicked} disabled={props.cards.stack.length === 0}>
      {'Draw ' + props.name}
    </button>
  )
}

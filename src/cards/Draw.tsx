import * as React from 'react'
import { css, NoState } from 'lang/react'
import { CardStack } from 'cards/cards'
import { CardRenderProps, isPersonalGoalProps } from 'cards/CardRenderProps'
import { OpenDialog } from 'app/OpenDialog'
import { cardToDiv } from 'cards/cards'

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

export class RandomCard extends React.Component<RandomCardProps, NoState> {
  clicked(cardNo: number) {
    this.props.drawn(this.props.name, this.props.cards, cardNo)
  }

  render() {
    return (
      <React.Fragment>
        <h2 key="h2">
          Drawn {this.props.name}: {this.props.drawnCards.join(' ')}
        </h2>
        <div key="button-div">
          {this.props.drawnCards.map((cardNumber) => {
            const styles = css({
              display: 'inline-block',
            })
            if (isPersonalGoalProps(this.props.cardProps)) {
              styles.width = this.props.cardProps.divWidth
            }
            return (
              <div key={'span-' + cardNumber} style={styles}>
                <div key={'button-div-' + cardNumber}>
                  <button key={'button-' + cardNumber} type="button" onClick={() => this.clicked(cardNumber)}>
                    Accept {cardNumber}
                  </button>
                </div>
                {cardToDiv(cardNumber, this.props.cardProps)}
              </div>
            )
          })}
        </div>
      </React.Fragment>
    )
  }
}

interface DrawProps extends OpenDialog, DrawnCallback {
  cards: CardStack
  n: number
  name: string
  cardProps: CardRenderProps
}

// Draw draws a _random_ card from the deck
export class Draw extends React.Component<DrawProps, NoState> {
  constructor(props: DrawProps) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }

  clicked() {
    let drawnCards = []
    let next
    for (let i = 0; i < this.props.n && drawnCards.length < this.props.cards.stack.length; i++) {
      do {
        next = this.props.cards.stack[Math.floor(Math.random() * this.props.cards.stack.length)]
      } while (drawnCards.indexOf(next) > -1)
      drawnCards.push(next)
    }
    drawnCards.sort()
    this.props.setDialog(
      <RandomCard
        name={this.props.name}
        drawnCards={drawnCards}
        cards={this.props.cards}
        drawn={this.props.drawn}
        cardProps={this.props.cardProps}
      />,
    )
  }

  render() {
    return (
      <button type="button" onClick={this.clicked} disabled={this.props.cards.stack.length === 0}>
        {'Draw ' + this.props.name}
      </button>
    )
  }
}

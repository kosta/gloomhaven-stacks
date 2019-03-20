import * as React from 'react';
import { NoState } from 'lang/react';
import { OpenDialog } from 'app/OpenDialog';
import { AddCards, AddCardsProps } from 'cards/addCards';
import { CardStack } from 'cards/cards';
import { BringEventToConclusion } from 'events/BringEventToConclusion';

export interface StackPopped {
  stackPopped: (name: string, returnToBottom: boolean) => void,
}

interface PopProps extends OpenDialog, AddCardsProps, StackPopped {
  name: string,
  cards: CardStack
}

// Pop draws the _top_ card of the deck
export class Pop extends React.Component<PopProps, NoState> {
  constructor(props: PopProps) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    this.props.setDialog(
      <BringEventToConclusion
        name={this.props.name}
        number={this.props.cards.stack[0]}
        stackPopped={this.props.stackPopped}>
        <AddCards onAddCards={this.props.onAddCards}/>
      </BringEventToConclusion>
    );
  }

  render() {
    return <button type="button" onClick={this.clicked} disabled={this.props.cards.stack.length === 0}>{'Draw ' + this.props.name + ' Event'}</button>;
  }
}

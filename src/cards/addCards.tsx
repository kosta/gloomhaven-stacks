import * as React from "react";
import { NoState } from "lang/react";

export interface AddCardsProps {
  onAddCards: (cardType: string, cardIdsToAdd: Array<number>) => void
}

export class AddCards extends React.Component<AddCardsProps, NoState> {
  private readonly inputs: any;

  constructor(props: AddCardsProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.parseCardIdsFromInputFor = this.parseCardIdsFromInputFor.bind(this);
    this.inputs = {};
  }

  parseCardIdsFromInputFor(cardType: string) {
    const stringCardIds: Array<string> = this.inputs[cardType].value.split(/\D+/);
    return stringCardIds.map((s) => parseInt(s, 10)).filter((x) => x === x);
  }

  handleClick(e: React.MouseEvent, cardType: string) {
    e.preventDefault();
    const cardIdsToAdd = this.parseCardIdsFromInputFor(cardType);
    this.props.onAddCards(cardType, cardIdsToAdd);
    return false;
  }

  render() {
    return <React.Fragment>
      <h2 key="h2">Add Cards</h2>
      {
        ["City Events", "Road Events", "Item Designs", "Single Items"].map((cardType) => {
          const buttonId = `add-${cardType}-id`.replace(/\s/g, '-');
          return <div key={'div' + cardType}>
            <button id={buttonId} key={cardType} type="button" onClick={(e) => this.handleClick(e, cardType)}>{cardType}</button>
            :
            <input aria-labelledby={buttonId} type="text" ref={(i) => this.inputs[cardType] = i}/>
          </div>;
          }
        )
      }
    </React.Fragment>;
  }
}
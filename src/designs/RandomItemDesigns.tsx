import * as React from 'react'
import { NoState } from 'lang/react'
import { itemToDiv } from 'cards/cards'

interface RandomItemDesignsProps {
  list: Array<number>
}

export class RandomItemDesigns extends React.Component<RandomItemDesignsProps, NoState> {
  render() {
    if (this.props.list.length === 0) {
      return null
    } else {
      return [<h2 key="h2">Random Item Designs</h2>, <div key="cards">{this.props.list.map((i) => itemToDiv(i))}</div>]
    }
  }
}

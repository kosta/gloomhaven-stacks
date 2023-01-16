import { itemToDiv } from 'cards/cards'
import * as React from 'react'

interface RandomItemDesignsProps {
  list: Array<number>
}

export const RandomItemDesigns = (props: RandomItemDesignsProps) => {
  if (props.list.length === 0) {
    return null
  } else {
    return (
      <>
        <h2 key="h2">Random Item Designs</h2>
        <div key="cards">{props.list.map((i) => itemToDiv(i))}</div>
      </>
    )
  }
}

import { itemToDiv } from '../cards/cards'
import * as React from 'react'
import { range } from '../lang/ranges'

export const itemIdsByProsperityLevel: { [prosperityLevel: number]: Array<number> } = {
  1: range(1, 14),
  2: range(15, 7),
  3: range(22, 7),
  4: range(29, 7),
  5: range(36, 7),
  6: range(43, 7),
  7: range(50, 7),
  8: range(57, 7),
  9: range(64, 7),
}

export function itemsAboveProsperity(title: String, items: Array<number>, prosperity: number) {
  let maxProsperityItem = itemIdsByProsperityLevel[prosperity].slice(-1)[0]
  let itemDivs = items.filter((item) => item > maxProsperityItem).map(itemToDiv)
  return (
    <div key={title + '-div'}>
      {itemDivs.length > 0 && <h2 key="h2">{title}</h2>}
      {itemDivs}
    </div>
  )
}

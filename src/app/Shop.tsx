import { itemIdsByProsperityLevel } from 'app/Propsperity'
import { itemToDiv } from 'cards/cards'
import { rangeFromTo } from 'lang/ranges'
import { noop } from 'lang/react'
import * as React from 'react'

interface ProsperityInputProps {
  onIncreaseProsperity: () => void
  prosperity: number
}

export const ProsperityInput = (props: ProsperityInputProps) => {
  const increaseProsperity = () => {
    props.onIncreaseProsperity()
  }

  const prosperity = props.prosperity
  return (
    <h2 key="h2">
      Prosperity {prosperity}
      <button disabled={prosperity >= 9} type="button" onClick={increaseProsperity}>
        +
      </button>
    </h2>
  )
}

interface ShopProps {
  prosperity: number
}

enum ShopItemFilter {
  All = 'all',
}

interface ShopState {
  shopItemFilter: ShopItemFilter
}

export class Shop extends React.Component<ShopProps, ShopState> {
  static levelWithItems(level: number, items: Array<number>) {
    return { level, items }
  }

  constructor(props: ShopProps) {
    super(props)
    this.handleShopItemFilterChange = this.handleShopItemFilterChange.bind(this)
    this.itemsToDisplay = this.itemsToDisplay.bind(this)

    this.state = {
      shopItemFilter: ShopItemFilter.All,
    }
  }

  handleShopItemFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ shopItemFilter: event.target.value as ShopItemFilter }, noop)
    event.preventDefault()
  }

  itemsToDisplay() {
    const filterAsString = this.state.shopItemFilter
    switch (filterAsString) {
      case 'all':
        return rangeFromTo(1, this.props.prosperity + 1).map((level) =>
          Shop.levelWithItems(level, itemIdsByProsperityLevel[level]),
        )
      default:
        const maybeProsperity = parseInt(filterAsString, 10)
        const prosperityLevel = isNaN(maybeProsperity) ? 1 : maybeProsperity
        return [Shop.levelWithItems(prosperityLevel, itemIdsByProsperityLevel[prosperityLevel])]
    }
  }

  render() {
    const prosperity = this.props.prosperity
    return (
      <div key="cards">
        <div>
          <select value={this.state.shopItemFilter} onChange={this.handleShopItemFilterChange}>
            <option key="all" value="all">
              all
            </option>
            {rangeFromTo(1, prosperity + 1).map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {this.itemsToDisplay().map((category) => {
          return (
            <div key={category.level}>
              <h3 key={'h3-' + category.level}>Prosperity {category.level}</h3>
              {category.items.map(itemToDiv)}
            </div>
          )
        })}
      </div>
    )
  }
}

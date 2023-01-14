import { range } from 'lang/ranges'
import { removeFromArray, shuffle } from 'lang/arrays'
import { PersonalGoalProps, RandomItemDesignProps } from 'cards/CardRenderProps'
import { CardStack } from 'cards/cards'

const randomItemDesigns = new RandomItemDesignProps()
const personalGoals = new PersonalGoalProps()

const randomScenarios = {
  offset: 63,
  n: 9,
}

export interface CardStacks {
  cityEvents: CardStack
  roadEvents: CardStack
  itemDesigns: CardStack
  randomItemDesigns: CardStack
  randomScenarios: CardStack
  singleItems: CardStack
  personalGoals: CardStack
  prosperity: number

  [key: string]: CardStacks[keyof CardStacks] // https://stackoverflow.com/a/47465004
}

export class GloomHaven {
  static initializeStacks(loadedState: any): CardStacks {
    //prettier-ignore
    let thirty = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];

    let initialRandomItems = range(randomItemDesigns.offset, randomItemDesigns.n)
    let initialRandomScenarios = range(randomScenarios.offset, randomScenarios.n)
    let initialPersonalGoals = range(personalGoals.offset, personalGoals.n)

    loadedState = loadedState || {}
    loadedState.cityEvents = loadedState.cityEvents || {}
    loadedState.cityEvents.stack = loadedState.cityEvents.stack || shuffle(thirty.slice(0))
    loadedState.cityEvents.history = loadedState.cityEvents.history || []

    loadedState.roadEvents = loadedState.roadEvents || {}
    loadedState.roadEvents.stack = loadedState.roadEvents.stack || shuffle(thirty.slice(0))
    loadedState.roadEvents.history = loadedState.roadEvents.history || []

    loadedState.randomItemDesigns = loadedState.randomItemDesigns || {}
    loadedState.randomItemDesigns.list = loadedState.randomItemDesigns.list || []
    loadedState.randomItemDesigns.list.sort()
    // remove duplicates
    loadedState.randomItemDesigns.list = loadedState.randomItemDesigns.list.filter(
      (e: number, i: number, a: Array<number>) => e !== a[i - 1],
    )
    loadedState.randomItemDesigns.stack = loadedState.randomItemDesigns.stack || initialRandomItems
    // remove everything in list from stack
    for (let c of loadedState.randomItemDesigns.list) {
      removeFromArray(loadedState.randomItemDesigns.stack, c)
    }
    loadedState.randomItemDesigns.history = loadedState.randomItemDesigns.history || []

    loadedState.itemDesigns = loadedState.itemDesigns || {}
    loadedState.itemDesigns.list = loadedState.itemDesigns.list || []
    loadedState.itemDesigns.history = loadedState.itemDesigns.history || []
    loadedState.singleItems = loadedState.singleItems || {}
    loadedState.singleItems.list = loadedState.singleItems.list || []
    loadedState.singleItems.history = loadedState.singleItems.history || []

    loadedState.randomScenarios = loadedState.randomScenarios || {}
    loadedState.randomScenarios.stack = loadedState.randomScenarios.stack || initialRandomScenarios
    loadedState.randomScenarios.list = loadedState.randomScenarios.list || []
    loadedState.randomScenarios.history = loadedState.randomScenarios.history || []

    loadedState.personalGoals = loadedState.personalGoals || {}
    loadedState.personalGoals.stack = loadedState.personalGoals.stack || initialPersonalGoals
    loadedState.personalGoals.list = loadedState.personalGoals.list || []
    loadedState.personalGoals.history = loadedState.personalGoals.history || []

    loadedState.prosperity = loadedState.prosperity || 1
    return loadedState
  }
}

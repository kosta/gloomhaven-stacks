import * as React from 'react'
import { range } from 'lang/ranges';
import { removeFromArray, shuffle, unique } from 'lang/arrays';
import { PartyBattleGoals } from 'battlegoals/partyBattleGoals';
import { AddCards } from 'cards/addCards';
import { Draw } from 'cards/draw';
import { CardStack } from 'cards/cards';
import { RandomItemDesignProps, PersonalGoalProps, RandomSideScenarioProps } from 'cards/CardRenderProps';
import { Pop } from 'stacks/Pop';
import { Shop, ProsperityInput } from 'app/Shop';
import { itemsAboveProsperity } from 'app/Propsperity';
import { ImportExport } from 'app/ImportExport';
import { RandomItemDesigns} from 'designs/RandomItemDesigns';

const randomItemDesigns = new RandomItemDesignProps();
const personalGoals = new PersonalGoalProps();

const randomScenarios = {
  offset: 63,
  n: 9,
};

export interface CardStacks {
  cityEvents: CardStack;
  roadEvents: CardStack;
  itemDesigns: CardStack;
  randomItemDesigns: CardStack;
  randomScenarios: CardStack;
  singleItems: CardStack;
  personalGoals: CardStack;
  prosperity: number;

  [key: string]: CardStacks[keyof CardStacks]; // https://stackoverflow.com/a/47465004
}

export interface AppState {
  stacks: CardStacks;
  dialog: JSX.Element | null;
}

export interface AppProps {
  initialCardStacks: CardStacks;
}

export class App extends React.Component<AppProps, AppState> {

  static initializeStacks(loadedState: any): CardStacks {
    let thirty = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];

    let initialRandomItems = range(randomItemDesigns.offset, randomItemDesigns.n);
    let initialRandomScenarios = range(randomScenarios.offset, randomScenarios.n);
    let initialPersonalGoals = range(personalGoals.offset, personalGoals.n);

    loadedState = loadedState || {};
    loadedState.cityEvents = loadedState.cityEvents || {};
    loadedState.cityEvents.stack = loadedState.cityEvents.stack || shuffle(thirty.slice(0));
    loadedState.cityEvents.history = loadedState.cityEvents.history || [];

    loadedState.roadEvents = loadedState.roadEvents || {};
    loadedState.roadEvents.stack = loadedState.roadEvents.stack || shuffle(thirty.slice(0));
    loadedState.roadEvents.history = loadedState.roadEvents.history || [];

    loadedState.randomItemDesigns = loadedState.randomItemDesigns || {};
    loadedState.randomItemDesigns.list = loadedState.randomItemDesigns.list || [];
    loadedState.randomItemDesigns.list.sort();
    // remove duplicates
    loadedState.randomItemDesigns.list = loadedState.randomItemDesigns.list.filter((e: number, i: number, a: Array<number>) => e !== a[i - 1]);
    loadedState.randomItemDesigns.stack = loadedState.randomItemDesigns.stack || initialRandomItems;
    // remove everything in list from stack
    for (let c of loadedState.randomItemDesigns.list) {
      removeFromArray(loadedState.randomItemDesigns.stack, c);
    }
    loadedState.randomItemDesigns.history = loadedState.randomItemDesigns.history || [];

    loadedState.itemDesigns = loadedState.itemDesigns || {};
    loadedState.itemDesigns.list = loadedState.itemDesigns.list || [];
    loadedState.itemDesigns.history = loadedState.itemDesigns.history || [];
    loadedState.singleItems = loadedState.singleItems || {};
    loadedState.singleItems.list = loadedState.singleItems.list || [];
    loadedState.singleItems.history = loadedState.singleItems.history || [];

    loadedState.randomScenarios = loadedState.randomScenarios || {};
    loadedState.randomScenarios.stack = loadedState.randomScenarios.stack || initialRandomScenarios;
    loadedState.randomScenarios.list = loadedState.randomScenarios.list || [];
    loadedState.randomScenarios.history = loadedState.randomScenarios.history || [];

    loadedState.personalGoals = loadedState.personalGoals || {};
    loadedState.personalGoals.stack = loadedState.personalGoals.stack || initialPersonalGoals;
    loadedState.personalGoals.list = loadedState.personalGoals.list || [];
    loadedState.personalGoals.history = loadedState.personalGoals.history || [];

    loadedState.prosperity = loadedState.prosperity || 1;
    return loadedState;
  }

  static initializeStacksFromLocalStorage() {
    const maybeStateFromStorage = window.localStorage.getItem("state");
    const stateFromStorage = maybeStateFromStorage ? JSON.parse(maybeStateFromStorage) : {};
    return App.initializeStacks(stateFromStorage);
  }

  constructor(props: AppProps) {
    super(props);

    this.showAddCards = this.showAddCards.bind(this);
    this.addCards = this.addCards.bind(this);
    this.addCardsAndCloseDialog = this.addCardsAndCloseDialog.bind(this);
    this.stackPopped = this.stackPopped.bind(this);
    this.stackDrawn = this.stackDrawn.bind(this);
    this.showImportExport = this.showImportExport.bind(this);
    this.setDialog = this.setDialog.bind(this);
    this.import = this.import.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.increaseProsperity = this.increaseProsperity.bind(this);
    this.onDrawBattleGoals = this.onDrawBattleGoals.bind(this);
    this.state = {
      stacks: props.initialCardStacks,
      dialog: null
    };
    this.save();
  }

  showImportExport() {
    this.setDialog(<ImportExport
      stacks={this.state.stacks}
      import={this.import}
      cancel={this.cancel}
    />);
  }

  stackPopped(name: string, returnToBottom: boolean) {
    this.setState((prevState) => {
      let state = prevState;
      let events = this.state.stacks[name.toLowerCase() + "Events"] as any;
      console.log("events", events);
      let event = events.stack.shift();
      let action = "removed from game";
      if (returnToBottom) {
        events.stack.push(event);
        action = "returned to bottom";
      }
      events.history.push({
        event: event,
        action: action,
      });
      return state;
    }, this.save);
    this.cancel();
  }

  stackDrawn(name: String, cards: CardStack, cardNo: number): void {
    this.setState((prevState: Readonly<AppState>) => {
      let state = prevState;
      removeFromArray(cards.stack, cardNo);
      cards.list.push(cardNo);
      cards.list.sort();
      cards.history.push({
        action: "drawn",
        card: cardNo,
      });

      return state;
    }, this.save);
    this.cancel();
  }

  import(text: string) {
    try {
      let stacks = App.initializeStacks(JSON.parse(text));
      this.setState({
        stacks: stacks
      }, this.save);
    } catch (e) {
      //TODO :(
      alert(e.message)
    }
    this.cancel();
  }

  addCardsAndCloseDialog(cardType: string, cardIdsToAdd: Array<number>) {
    this.addCards(cardType, cardIdsToAdd);
    this.cancel();
  }

  addCards(cardType: string, cardIdsToAdd: Array<number>) {
    if (!cardIdsToAdd || cardIdsToAdd.length === 0) {
      return;
    }

    let simpleListMappings: { [cardType: string]: CardStack } = {
      "Item Designs": this.state.stacks.itemDesigns,
      "Single Items": this.state.stacks.singleItems,
    };
    if (simpleListMappings[cardType]) {
      this.setState((prevState) => {
        let state = prevState;
        let list = simpleListMappings[cardType].list.concat(cardIdsToAdd);
        list.sort();
        if (cardType !== "Single Items") {
          // remove duplicates, but not on "Single Items"
          list = list.filter((el, idx, arr) => el !== arr[idx - 1]);
        }
        simpleListMappings[cardType].list = list;
        simpleListMappings[cardType].history.push({
          action: "added cards",
          cards: cardIdsToAdd,
        });

        return state;
      }, this.save);
    } else {
      // assuming "City Event" or "Road Event"
      const eventStackName = cardType.split(" ")[0].toLowerCase() + "Events";
      const stack = this.state.stacks[eventStackName];
      if (!stack || typeof stack === "number") {
        throw "Unknown name for addCards: " + cardType;
      }

      const notAlreadyContainedCards = unique(cardIdsToAdd).filter((it) => !stack.stack.includes(it));
      if (notAlreadyContainedCards.length === 0) {
        return;
      }

      this.setState((prevState) => {
        stack.stack = stack.stack.concat(notAlreadyContainedCards);
        shuffle(stack.stack);

        stack.history.push({
          action: "added cards & shuffled",
          cards: cardIdsToAdd,
        });

        return prevState;
      }, this.save)
    }
  }

  showAddCards() {
    this.setDialog(<AddCards onAddCards={this.addCardsAndCloseDialog}/>);
  }

  increaseProsperity() {
    this.setState((prevState) => {
      let state = prevState;
      if (state.stacks.prosperity < 9) {
        state.stacks.prosperity += 1;
      }
      return state;
    }, this.save);
  }

  onDrawBattleGoals() {
    this.setDialog((<PartyBattleGoals/>));
  }

  setDialog(dialog: JSX.Element) {
    // first remove, then add so that the component doesnt get recycled
    this.setState({
      dialog: null
    }, () => {
      if (dialog) {
        this.setState({
          dialog: dialog
        })
      }
    });
  }

  cancel() {
    this.setState({
      dialog: null
    })
  }

  save() {
    window.localStorage.setItem("state", JSON.stringify(this.state.stacks))
  }

  render() {
    let prosperity = this.state.stacks.prosperity;
    return <React.Fragment>
      <div key="button-frame" className="frame">
        <Pop key="city" name="City" cards={this.state.stacks.cityEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} onAddCards={this.addCards}/>
        <Pop key="road" name="Road" cards={this.state.stacks.roadEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} onAddCards={this.addCards}/>
        <Draw key="randomItem" name="Random Item Design" n={1} cards={this.state.stacks.randomItemDesigns} cardProps={new RandomItemDesignProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="randomScenario" name="Random Side Scenario" n={1} cards={this.state.stacks.randomScenarios} cardProps={new RandomSideScenarioProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="personalGoal" name="Personal Goal" n={2} cards={this.state.stacks.personalGoals} cardProps={new PersonalGoalProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <button type="button" onClick={this.showAddCards}>Add Cards</button>
        <button type="button" onClick={this.showImportExport}>Import / Export</button>
        <button type="button" onClick={this.onDrawBattleGoals}>Draw Battle Goals</button>
      </div>
      <div key="dialog-frame" className="frame">
        {this.state.dialog}
      </div>
      <div key="random-items-div">
        <RandomItemDesigns list={this.state.stacks.randomItemDesigns.list}/>
      </div>
      <div key="item-designs-div">
        {itemsAboveProsperity("Item Designs", this.state.stacks.itemDesigns.list, prosperity)}
      </div>
      <div key="single-items-div">
        {itemsAboveProsperity("Single Items", this.state.stacks.singleItems.list, prosperity)}
      </div>
      <ProsperityInput key="prosperity-input" prosperity={prosperity} onIncreaseProsperity={this.increaseProsperity}/>
      <Shop key="shop" prosperity={prosperity}/>
    </React.Fragment>;
  }
}

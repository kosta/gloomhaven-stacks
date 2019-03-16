import * as React from 'react'
import { range, rangeFromTo } from 'lang/ranges';
import { removeFromArray, shuffle, unique } from 'lang/arrays';
import { noop, NoState } from 'lang/react';
import StackPopped from 'stacks/stackPopped';
import BringEventToConclusion from 'events/bringEventToConclusion';
import PartyBattleGoals from 'battlegoals/partyBattleGoals';
import AddCards, { AddCardsProps } from 'cards/addCards';
import { Draw } from 'cards/draw';
import { CardStack } from 'cards/cards';
import { OpenDialog } from 'app/app';
import { RandomItemDesignProps, PersonalGoalProps, ItemUrl, ItemProps, RandomSideScenarioProps } from "cards/CardRenderProps";
import { cardToDiv } from "cards/cards";

const randomItemDesigns = new RandomItemDesignProps();
const personalGoals = new PersonalGoalProps();

const itemIdsByProsperityLevel: { [prosperityLevel: number]: Array<number> } = {
  1: range(1, 14),
  2: range(15, 7),
  3: range(22, 7),
  4: range(29, 7),
  5: range(36, 7),
  6: range(43, 7),
  7: range(50, 7),
  8: range(57, 7),
  9: range(64, 7),
};

const itemUrls = function (): Array<ItemUrl> {
  const itemCounts = [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const itemUrls = [{
    maxItem: 20,
    url: "https://lh3.googleusercontent.com/u/0/d/1P0bd7vtA_SVwC7Qm9dJ_YmZkQPNDLOCk=s3200-k-iv2",
  }, {
    maxItem: 40,
    url: "https://lh3.googleusercontent.com/u/0/d/1uHYherEvc9bv3Jpl2TpA2DlRPgGT8l3z=s3200-k-iv2",
  }, {
    maxItem: 60,
    url: "https://lh3.googleusercontent.com/u/0/d/172NPm8x9T8zPE2Vd672_10rZ3ieFHHOX=s3200-k-iv2",
  }, {
    maxItem: 90,
    url: "https://lh3.googleusercontent.com/u/0/d/1XAabPK_Hs8gBXXJVpaBaSsAv6_NioEyu=s3200-k-iv2",
  }, {
    maxItem: 133,
    url: "https://lh3.googleusercontent.com/u/0/d/1KW0TZOs7SDVl5frTM9y-ISR-4dZFIex4=s3200-k-iv2",
  }, {
    maxItem: 150,
    url: "https://lh3.googleusercontent.com/u/0/d/1BHfEwqmC_dax5dV4RFFP5MlfJ76eS7KZ=s3200-k-iv2",
  }];

  let acc = 0;
  let itemSheet = 0;
  return itemCounts.map((num, i) => {
    if (i >= 71 && i <= 95) {
      // there are two random items but only one of them is "red", i.e. in this picture
      num -= 1;
    }
    let numberInPicture = acc;
    if (i > itemUrls[itemSheet].maxItem) {
      itemSheet += 1;
      numberInPicture = 0;
      acc = num;
    } else {
      acc += num;
    }
    return new ItemUrl(itemUrls[itemSheet].url, numberInPicture, itemUrls[itemSheet].maxItem - (itemUrls[itemSheet - 1] && itemUrls[itemSheet - 1].maxItem || 0));
  });
}();

const randomScenarios = {
  offset: 63,
  n: 9,
};

function itemToDiv(itemId: number) {
  let item = itemUrls[itemId];
  return cardToDiv(itemId, new ItemProps(item, itemId - item.numberInPicture));
}

interface RandomItemDesignsProps {
  list: Array<number>
}

class RandomItemDesigns extends React.Component<RandomItemDesignsProps, NoState> {
  render() {
    if (this.props.list.length === 0) {
      return null
    } else {
      return [
        <h2 key="h2">Random Item Designs</h2>,
        <div key="cards">
          {this.props.list.map(i => itemToDiv(i))}
        </div>
      ]
    }
  }
}

interface PopProps extends OpenDialog, AddCardsProps, StackPopped {
  name: string,
  cards: CardStack
}

// Pop draws the _top_ card of the deck
class Pop extends React.Component<PopProps, NoState> {
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
    return <button type="button" onClick={this.clicked} disabled={this.props.cards.stack.length === 0}>{"Draw " + this.props.name + " Event"}</button>
  }
}

interface ProsperityInputProps {
  onIncreaseProsperity: () => void,
  prosperity: number,
}

class ProsperityInput extends React.Component<ProsperityInputProps, NoState> {
  constructor(props: ProsperityInputProps) {
    super(props);
    this.increaseProsperity = this.increaseProsperity.bind(this);
  }

  increaseProsperity() {
    this.props.onIncreaseProsperity();
  }

  render() {
    const prosperity = this.props.prosperity;
    return <h2 key="h2">
      Prosperity {prosperity}
      <button disabled={(prosperity >= 9)} type="button" onClick={this.increaseProsperity}>+</button>
    </h2>;
  }
}

interface ShopProps {
  prosperity: number,

}

enum ShopItemFilter {
  All = 'all',
}

interface ShopState {
  shopItemFilter: ShopItemFilter
}

class Shop extends React.Component<ShopProps, ShopState> {
  static levelWithItems(level: number, items: Array<number>) {
    return { level, items }
  }

  constructor(props: ShopProps) {
    super(props);
    this.handleShopItemFilterChange = this.handleShopItemFilterChange.bind(this);
    this.itemsToDisplay = this.itemsToDisplay.bind(this);

    this.state = {
      shopItemFilter: ShopItemFilter.All
    };
  }

  handleShopItemFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ shopItemFilter: event.target.value as ShopItemFilter }, noop);
    event.preventDefault();
  }

  itemsToDisplay() {
    const filterAsString = this.state.shopItemFilter;
    switch (filterAsString) {
      case 'all':
        return rangeFromTo(1, this.props.prosperity + 1).map(level => Shop.levelWithItems(level, itemIdsByProsperityLevel[level]));
      default:
        const maybeProsperity = parseInt(filterAsString, 10);
        const prosperityLevel = isNaN(maybeProsperity) ? 1 : maybeProsperity;
        return [Shop.levelWithItems(prosperityLevel, itemIdsByProsperityLevel[prosperityLevel])];
    }
  }

  render() {
    const prosperity = this.props.prosperity;
    return <div key="cards">
      <div>
        <select value={this.state.shopItemFilter} onChange={this.handleShopItemFilterChange}>
          <option key='all' value="all">all</option>
          {rangeFromTo(1, prosperity + 1).map(level => <option key={level} value={level}>{level}</option>)}
        </select>
      </div>

      {
        this.itemsToDisplay().map(category => {
          return (
            <div key={category.level}>
              <h3 key={"h3-" + category.level}>Prosperity {category.level}</h3>
              {category.items.map(itemToDiv)}
            </div>
          )
        })
      }
    </div>;
  }
}

interface CancelDialog {
  cancel: () => void;
}

interface ImportExportProps extends CancelDialog {
  stacks: CardStacks,
  import: (text: string) => void,
}

interface ImportExportState {
  stateAsJsonString: string;
}

class ImportExport extends React.Component<ImportExportProps, ImportExportState> {
  static supportForCopyToClipboard(): boolean {
    const maybeClipboard = navigator.clipboard;
    return maybeClipboard != undefined && (typeof maybeClipboard.readText === "function");
  }

  static supportForImportFromClipboard(): boolean {
    const maybeClipboard = navigator.clipboard;
    return maybeClipboard != undefined && (typeof maybeClipboard.writeText === "function");
  }

  constructor(props: ImportExportProps) {
    super(props);
    this.importClicked = this.importClicked.bind(this);
    this.stacksToJsonString = this.stacksToJsonString.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.importFromClipboard = this.importFromClipboard.bind(this);
    this.state = { stateAsJsonString: '' };
  }

  importClicked() {
    this.props.import(this.state.stateAsJsonString)
  }

  stacksToJsonString() {
    return JSON.stringify(this.props.stacks, null, 2)
  }

  copyToClipboard() {
    navigator.clipboard!.writeText(this.stacksToJsonString())
      .then(() => console.log("copied to clipboard"))
      .catch((error) => alert(error));
  }

  importFromClipboard() {
    navigator.clipboard!.readText().then(this.props.import);
  }

  onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ stateAsJsonString: e.target.value })
  };

  render() {
    return <React.Fragment>
      <h2 key="h2">Import / Export</h2>
      <textarea
        key="textarea" rows={20} cols={20}
        defaultValue={this.stacksToJsonString()}
        onChange={this.onTextChange}
      />
      <button key="to-clipboard" hidden={!ImportExport.supportForCopyToClipboard()} type="submit" onClick={this.copyToClipboard}>Copy to Clipboard</button>
      <button key="from-clipboard" hidden={!ImportExport.supportForImportFromClipboard()} type="submit" onClick={this.importFromClipboard}>Import from Clipboard</button>
      <button key="import" type="submit" onClick={this.importClicked}>{"Import"}</button>
      <button key="cancel" type="submit" onClick={this.props.cancel}>{"Cancel"}</button>
    </React.Fragment>;
  }
}

function itemsAboveProsperity(title: String, items: Array<number>, prosperity: number) {
  let maxProsperityItem = itemIdsByProsperityLevel[prosperity].slice(-1)[0];
  let itemDivs = items.filter(item => item > maxProsperityItem).map(itemToDiv);
  return <div key={title + "-div"}>
    {itemDivs.length > 0 && <h2 key="h2">{title}</h2>}
    {itemDivs}
  </div>;
}

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

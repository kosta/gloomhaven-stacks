import * as React from "react"
import * as ReactDOM from "react-dom";
import { range, rangeFromTo } from "lang/ranges";
import { removeFromArray, shuffle } from "lang/arrays";
import { noop, NoProps, NoState } from "lang/react";
import StackPopped from "stacks/stackPopped";
import BringEventToConclusion from "events/bringEventToConclusion";
import PartyBattleGoals from "battlegoals/partyBattleGoals";

class RandomSideScenarioProps {
    readonly kind: string = 'random-side-scenario-props';
    readonly notUsedByAnyOne: boolean = false; // if you delete this, typescript becomes un-happy
}

class RandomItemDesignProps {
  readonly kind: string = 'random-item-design-props';
  readonly url: string = "https://lh3.googleusercontent.com/u/0/d/1ubPFoTJ1_Ly-Eqn_yMvNhG0Dwq_tuw5c=s4800-k-iv1";
  readonly width: number = 409;
  readonly height: number = 636;
  readonly offset: number = 71;
  readonly cols: number = 10;
  readonly n: number =  25;
}

class ItemUrl {
  constructor(readonly url: string,
              readonly numberInPicture: number,
              readonly n: number) {
  }
}

class PersonalGoalProps {
  readonly kind: string = 'persona-goal-props';
  readonly offset: number = 510;
  readonly n: number = 24;
  readonly divWidth: string = "605px";
}

class ItemProps {
  readonly kind: string = 'item-props';
  readonly url: string;
  readonly width: number = 292;
  readonly height: number = 456;
  readonly cols: number = 10;
  readonly n: number;

  constructor(private item: ItemUrl, readonly offset: number){
    this.item = item;
    this.url = item.url;
    this.offset = offset;
    this.n = item.n;
  }
}

type CardRenderProps = RandomItemDesignProps | ItemProps | PersonalGoalProps | RandomSideScenarioProps;

const randomItemDesigns = new RandomItemDesignProps();
const personalGoals =  new PersonalGoalProps();

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

const itemUrls = function(): Array<ItemUrl>{
  const itemCounts = [0,2,2,2,2,2,2,2,2,2,2,2,4,4,4,2,2,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,2,2,2,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  const itemUrls = [{
    maxItem: 20,
    url: "https://lh3.googleusercontent.com/u/0/d/1P0bd7vtA_SVwC7Qm9dJ_YmZkQPNDLOCk=s3200-k-iv2",
  },{
    maxItem: 40,
    url: "https://lh3.googleusercontent.com/u/0/d/1uHYherEvc9bv3Jpl2TpA2DlRPgGT8l3z=s3200-k-iv2",
  },{
    maxItem: 60,
    url: "https://lh3.googleusercontent.com/u/0/d/172NPm8x9T8zPE2Vd672_10rZ3ieFHHOX=s3200-k-iv2",
  },{
    maxItem: 90,
    url: "https://lh3.googleusercontent.com/u/0/d/1XAabPK_Hs8gBXXJVpaBaSsAv6_NioEyu=s3200-k-iv2",
  },{
    maxItem: 133,
    url: "https://lh3.googleusercontent.com/u/0/d/1KW0TZOs7SDVl5frTM9y-ISR-4dZFIex4=s3200-k-iv2",
  },{
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

function isPersonalGoalProps(arg: CardRenderProps): arg is PersonalGoalProps {
  return arg.kind === 'persona-goal-props';
}

function isRandomSideScenarioProps(arg: CardRenderProps): arg is RandomSideScenarioProps {
  return arg.kind === 'random-side-scenario-props';
}

function cardToDiv(cardId: number, props: CardRenderProps) {
  if (isPersonalGoalProps(props)) {
    return <PersonalGoalCard cardId={cardId}/>
  } else if (isRandomSideScenarioProps(props)) {
    return null
  } else {
    let n = cardId - props.offset;
    let row = Math.floor(n / props.cols);
    let col = n % props.cols;
    let style = {
      background: "url(" + props.url + ") no-repeat scroll top -" + (row * props.height) + "px left -" + (col * props.width) + "px",
      width: (props.width - 14) + "px",
      maxWidth: (props.width - 14) + "px",
      height: (props.height - 3) + "px",
      marginLeft: "10px",
      color: "white",
      padding: "0 0 3px 14px",
      display: "inline-block",
    };
    return <div key={cardId} style={style}>{cardId}</div>;
  }
}

interface PersonalGoalCardProps {
  cardId: number;
}

class PersonalGoalCard extends React.Component<PersonalGoalCardProps, NoState> {
  render() {
    const cardId = this.props.cardId;
    return <div style={({ display: "inline-block", width: "605px" })} key={"cardToDiv-div-" + cardId}>
      <img key={cardId} src={"https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/personal-goals/pg-" + cardId + ".png"}/>
    </div>;
  }
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

interface AddCardsProps {
  onAddCards: (cardType: string, cardIdsToAdd: Array<number>) => void
}

class AddCards extends React.Component<AddCardsProps, NoState> {
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

  handleClick(e: React.MouseEvent, cardType:string) {
    e.preventDefault();
    const cardIdsToAdd = this.parseCardIdsFromInputFor(cardType);
    this.props.onAddCards(cardType, cardIdsToAdd);
    return false;
  }

  render() {
    return [
      <h2 key="h2">Add Cards</h2>,
    ].concat(["City Events", "Road Events", "Item Designs", "Single Items"].map((cardType) =>
      <div key={"div" + cardType}>
        <button key={cardType} type="button" onClick={(e) => this.handleClick(e, cardType)}>{cardType}</button>
        :
        <input ref={(i) => this.inputs[cardType] = i}/>
      </div>
    ));
  }
}

interface RandomCardProps {
  drawnCards: Array<number>;
  name: string;
  drawn: (name: string, cards: CardStack, cardNo: number) => void;
  cards: CardStack;
  cardProps: CardRenderProps;
}

class RandomCard extends React.Component<RandomCardProps, NoState> {
  clicked(cardNo: number) {
    this.props.drawn(this.props.name, this.props.cards, cardNo);
  }

  render() {
    return [
      <h2 key="h2">Drawn {this.props.name}: {this.props.drawnCards.join(" ")}</h2>,
      <div key="button-div">
        {this.props.drawnCards.map(cardNumber => {
          const styles = {display: "inline-block"} as React.CSSProperties;
          if(isPersonalGoalProps(this.props.cardProps)){
            styles.width = this.props.cardProps.divWidth
          }
          return <div key={"span-" + cardNumber} style={(styles)}>
            <div key={"button-div-" + cardNumber}>
              <button key={"button-" + cardNumber} type="button" onClick={() => this.clicked(cardNumber)}>Accept {cardNumber}</button>
            </div>
            {cardToDiv(cardNumber, this.props.cardProps)}
          </div>
        })}
      </div>,
    ]
  }
}

interface OpenDialog {
  setDialog: (component: JSX.Element) => void;
}

interface CardStackEvent {
  action: string,
  card?: number,
  cards?: Array<number>,
  event?: number,
}

interface CardStack {
  list : Array<number>,
  stack : Array<number>,
  history: Array<CardStackEvent>
}

interface DrawProps extends OpenDialog, DrawnCallback {
  cards: CardStack;
  n: number;
  name: string;
  cardProps: CardRenderProps;
}

// Draw draws a _random_ card from the deck
class Draw extends React.Component<DrawProps, NoState> {
  constructor(props: DrawProps) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    let drawnCards = [];
    let next;
    for (let i = 0; (i < this.props.n) && (drawnCards.length < this.props.cards.stack.length); i++) {
      do {
        next = this.props.cards.stack[Math.floor(Math.random() * this.props.cards.stack.length)];
      } while (drawnCards.indexOf(next) > -1);
      drawnCards.push(next);
    }
    drawnCards.sort();
    this.props.setDialog(
      <RandomCard
        name={this.props.name}
        drawnCards={drawnCards}
        cards={this.props.cards}
        drawn={this.props.drawn}
        cardProps={this.props.cardProps}
      />
    );
  }

  render() {
    return <button type="button" onClick={this.clicked} disabled={this.props.cards.stack.length === 0}>{"Draw " + this.props.name}</button>
  }
}

interface PopProps extends OpenDialog, AddCardsProps, StackPopped{
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

interface ProsperityInputProps {
  onIncreaseProsperity: () => void,
  prosperity: number,
}

class ProsperityInput extends React.Component<ProsperityInputProps, NoState> {
  constructor(props: ProsperityInputProps){
    super(props);
    this.increaseProsperity = this.increaseProsperity.bind(this);
  }

  increaseProsperity(){
    this.props.onIncreaseProsperity();
  }

  render(){
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

enum ShopItemFilter {
  All = 'all',
}

interface ShopState {
  shopItemFilter: ShopItemFilter
}

class Shop extends React.Component<ShopProps, ShopState> {
  static levelWithItems(level: number, items: Array<number>){
    return {level, items}
  }

  constructor(props: ShopProps){
    super(props);
    this.handleShopItemFilterChange = this.handleShopItemFilterChange.bind(this);
    this.itemsToDisplay = this.itemsToDisplay.bind(this);

    this.state = {
      shopItemFilter: ShopItemFilter.All
    };
  }

  handleShopItemFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({shopItemFilter: event.target.value as ShopItemFilter}, noop);
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

  render(){
    const prosperity = this.props.prosperity;
    return <div key="cards">
      <div>
        <select value={this.state.shopItemFilter} onChange={this.handleShopItemFilterChange}>
          <option key='all' value="all">all</option>
          {rangeFromTo(1, prosperity + 1).map( level => <option key={level} value={level}>{level}</option>)}
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

interface ImportExportState{
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
    return [
      <h2 key="h2">Import / Export</h2>,
      <textarea
        key="textarea" rows={20} cols={20}
        defaultValue={this.stacksToJsonString()}
        onChange={this.onTextChange}
      />,
      <button key="to-clipboard" hidden={!ImportExport.supportForCopyToClipboard()} type="submit" onClick={this.copyToClipboard}>Copy to Clipboard</button>,
      <button key="from-clipboard" hidden={!ImportExport.supportForImportFromClipboard()} type="submit" onClick={this.importFromClipboard}>Import from Clipboard</button>,
      <button key="import" type="submit" onClick={this.importClicked}>{"Import"}</button>,
      <button key="cancel" type="submit" onClick={this.props.cancel}>{"Cancel"}</button>,
    ];
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

interface DrawnCallback {
  drawn: (name: String, cards: CardStack, cardNo: number) => void;
}

interface CardStacks {
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

interface AppState {
  stacks: CardStacks;
  dialog: JSX.Element | null;
}

class App extends React.Component<NoProps, AppState> {
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

  constructor(props: NoProps) {
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

    const maybeStateFromStorage = window.localStorage.getItem("state");
    const stateFromStorage = maybeStateFromStorage ? JSON.parse(maybeStateFromStorage) : {};

    this.state = {
      stacks: App.initializeStacks(stateFromStorage),
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

  addCardsAndCloseDialog(cardType: string, cardIdsToAdd: Array<number>){
    this.addCards(cardType, cardIdsToAdd);
    this.cancel();
  }

  addCards(cardType: string, cardIdsToAdd:Array<number>) {
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
      this.setState((prevState) => {
        stack.stack = stack.stack.concat(cardIdsToAdd);
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
    console.log("saving", this.state.stacks);
    window.localStorage.setItem("state", JSON.stringify(this.state.stacks))
  }

  render() {
    let prosperity = this.state.stacks.prosperity;
    return [
      <div key="button-frame" className="frame">
        <Pop key="city" name="City" cards={this.state.stacks.cityEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} onAddCards={this.addCards}/>
        <Pop key="road" name="Road" cards={this.state.stacks.roadEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} onAddCards={this.addCards}/>
        <Draw key="randomItem" name="Random Item Design" n={1} cards={this.state.stacks.randomItemDesigns} cardProps={new RandomItemDesignProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="randomScenario" name="Random Side Scenario" n={1} cards={this.state.stacks.randomScenarios} cardProps={new RandomSideScenarioProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="personalGoal" name="Personal Goal" n={2} cards={this.state.stacks.personalGoals} cardProps={new PersonalGoalProps()} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <button type="button" onClick={this.showAddCards}>Add Cards</button>
        <button type="button" onClick={this.showImportExport}>Import / Export</button>
        <button type="button" onClick={this.onDrawBattleGoals}>Draw Battle Goals</button>
      </div>,
      <div key="dialog-frame" className="frame">
        {this.state.dialog}
      </div>,
      <div key="random-items-div">
        <RandomItemDesigns list={this.state.stacks.randomItemDesigns.list}/>
      </div>,
      <div key="item-designs-div">
        {itemsAboveProsperity("Item Designs", this.state.stacks.itemDesigns.list, prosperity)}
      </div>,
      <div key="single-items-div">
        {itemsAboveProsperity("Single Items", this.state.stacks.singleItems.list, prosperity)}
      </div>,
      <ProsperityInput key="prosperity-input" prosperity={prosperity} onIncreaseProsperity={this.increaseProsperity}/>,
      <Shop key="shop" prosperity={prosperity}/>
    ];
  }
}

let app = <App/>;
ReactDOM.render(
  app,
  document.getElementById('root')
);

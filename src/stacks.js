import React from 'react';
import ReactDOM from 'react-dom';
import {shuffle, removeFromArray} from 'lang/arrays';
import {rangeFromTo, range} from 'lang/ranges';
import PartyBattleGoals from 'battlegoals/partyBattleGoals';

const randomItemDesigns = {
  url: "https://lh3.googleusercontent.com/u/0/d/1ubPFoTJ1_Ly-Eqn_yMvNhG0Dwq_tuw5c=s4800-k-iv1",
  width: 409,
  height: 636,
  offset: 71,
  cols: 10,
  n: 25,
};

const itemIdsByProsperityLevel = {
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

const itemUrls = function(){
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
    return {
      url: itemUrls[itemSheet].url,
      numberInPicture: numberInPicture,
      n: itemUrls[itemSheet].maxItem - (itemUrls[itemSheet-1] && itemUrls[itemSheet-1].maxItem || 0),
    };
  });
}();

const randomScenarios = {
  offset: 63,
  n: 9,
};

const personalGoals = {
  offset: 510,
  n: 24,
  divWidth: "605px",
};

function itemToDiv(itemId) {
  let item = itemUrls[itemId];
  return cardToDiv(itemId, {
    url: item.url,
    width: 292,
    height: 456,
    offset: itemId - item.numberInPicture,
    cols: 10,
    n: item.n,
  });
}

class PersonalGoalCard extends React.Component {
  render() {
    const cardId = this.props.cardId;
    return <div style={({display: "inline-block", width: "605px"})} key={"cardToDiv-div-" + cardId}>
      <img key={cardId} src={"https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/personal-goals/pg-" + cardId + ".png"}/>
    </div>;
  }
}

function cardToDiv(cardId, props) {
  if (cardId >= 510) {
    //sorry for this spaghetti special case :(
    return <PersonalGoalCard cardId={cardId}/>
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

class RandomItemDesigns extends React.Component {
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

class AddCards extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.parseCardIdsFromInputFor = this.parseCardIdsFromInputFor.bind(this);
    this.inputs = {};
  }

  parseCardIdsFromInputFor(cardType) {
    const stringCardIds = this.inputs[cardType].value.split(/\D+/);
    return stringCardIds.map((s) => parseInt(s, 10)).filter((x) => x === x);
  }

  handleClick(e, cardType) {
    e.preventDefault();
    const cardIdsToAdd = this.parseCardIdsFromInputFor(cardType);
    this.props.onAddCards(cardType, cardIdsToAdd);
    return false;
  }

  render() {
    return [
      <h2 key="h2">Add Cards</h2>,
    ].concat(["City Events", "Road Events", "Item Designs", "Single Items"].map((s) =>
      <div key={"div" + s}>
        <button key={s} type="button" onClick={(e) => this.handleClick(e, s)}>{s}</button>
        :
        <input ref={(i) => this.inputs[s] = i}/>
      </div>
    ));
  }
}

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.eventCardImageUrl = this.eventCardImageUrl.bind(this);
  }

  render() {
    return <img key='image-front' src={this.eventCardImageUrl()}/>
  }

  eventCardImageUrl() {
    let number = this.props.eventCardId;
    if (number <= 9) {
      number = "0" + number;
    }
    const imageName = this.props.name.toLowerCase();
    const imageBaseUrl = "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/events/base/" + imageName + "/" + imageName.charAt(0) + "e-" + number + "-";
    const sideUrlPart = this.props.side === 'back' ? 'b' : 'f';
    return imageBaseUrl + sideUrlPart + '.png';
  }
}

class BringEventToConclusion extends React.Component {
  constructor(props) {
    super(props);

    this.selectA = this.selectA.bind(this);
    this.selectB = this.selectB.bind(this);
    this.returnToBottom = this.returnToBottom.bind(this);
    this.removeFromGame = this.removeFromGame.bind(this);
    this.state = {};
  }

  selectA(e) {
    this.setState({selected: "a"});
    e.preventDefault();
    return false;
  }

  selectB(e) {
    this.setState({selected: "b"});
    e.preventDefault();
    return false;
  }

  returnToBottom(e) {
    this.props.stackPopped(this.props.name, true);
    e.preventDefault();
    return false;
  }

  removeFromGame(e) {
    this.props.stackPopped(this.props.name, false);
    e.preventDefault();
    return false;
  }

  render() {
    const containerStyle = {
      'display': 'flex',
      'flex-direction': 'row'
    };
    const choiceStyle = {
      'display': 'flex',
      'flex-direction': 'column',
      'padding': '0 1em 0'
    };
    const resolutionStyle = {
      'display': 'flex',
      'flex-direction': 'column',
      'padding': '0 1em 0 '
    };
    return [<h2 key="h2">{this.props.name} Event {this.props.number}</h2>,
      <div style={containerStyle}>
        <EventCard key='event-card-front' eventCardId={this.props.number} side='front' name={this.props.name}/>
        <div style={choiceStyle}>
          <button key="a" type="button" onClick={this.selectA} className={this.state.selected === "a" ? "selected" : ""}>A</button>
          <button key="b" type="button" onClick={this.selectB} className={this.state.selected === "b" ? "selected" : ""}>B</button>
        </div>
        {this.state.selected && [
          <EventCard key='event-card-back' eventCardId={this.props.number} side='back' name={this.props.name}/>,
          <div style={resolutionStyle}>
            {this.props.children}
            <h3>Conclusion</h3>
            <button key="ret" type="button" onClick={this.returnToBottom}>Return to bottom</button>
            <button key="rem" type="button" onClick={this.removeFromGame}>Remove from game</button>
          </div>
        ]}
      </div>
    ];
  }
}

class RandomCard extends React.Component {
  clicked(cardNo) {
    this.props.drawn(this.props.name, this.props.cards, cardNo);
  }

  render() {
    return [
      <h2 key="h2">Drawn {this.props.name}: {this.props.drawnCards.join(" ")}</h2>,
      <div key="button-div">
        {this.props.drawnCards.map(cardNumber => {
          return <div key={"span-" + cardNumber} style={({display: "inline-block", width: this.props.cardProps && this.props.cardProps.divWidth})}>
            <div key={"button-div-" + cardNumber}>
              <button key={"button-" + cardNumber} type="button" onClick={() => this.clicked(cardNumber)}>Accept {cardNumber}</button>
            </div>
            {this.props.cardProps && cardToDiv(cardNumber, this.props.cardProps)}
          </div>
        })}
      </div>,
    ]
  }
}

// Draw draws a _random_ card from the deck
class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.clicked = this.clicked.bind(this);
  }

  clicked() {
    let drawnCards = [];
    let next;
    for (let i = 0; (i < (this.props.n || 1)) && (drawnCards.length < this.props.cards.stack.length); i++) {
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

// Pop draws the _top_ card of the deck
class Pop extends React.Component {
  constructor(props) {
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

class ProsperityInput extends React.Component {
  constructor(props) {
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

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.handleShopItemFilterChange = this.handleShopItemFilterChange.bind(this);
    this.itemsToDisplay = this.itemsToDisplay.bind(this);

    this.state = {
      shopItemFilter: 'all'
    };
  }

  handleShopItemFilterChange(event) {
    this.setState({shopItemFilter: event.target.value}, () => {});
    event.preventDefault();
  }

  itemsToDisplay() {
    const filterAsString = this.state.shopItemFilter;
    switch (filterAsString) {
      case 'all':
        return rangeFromTo(1, this.props.prosperity + 1).map(level => this.levelWithItems(level, itemIdsByProsperityLevel[level]));
      default:
        const maybeProsperity = parseInt(filterAsString, 10);
        const prosperityLevel = isNaN(maybeProsperity) ? 1 : maybeProsperity;
        return [this.levelWithItems(prosperityLevel, itemIdsByProsperityLevel[prosperityLevel])];
    }
  }

  levelWithItems(level, items) {
    return {level, items}
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

class ImportExport extends React.Component {
  constructor(props) {
    super(props);
    this.importClicked = this.importClicked.bind(this);
    this.stacksToJsonString = this.stacksToJsonString.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.importFromClipboard = this.importFromClipboard.bind(this);
    this._textarea = null;
  }

  importClicked() {
    this.props.import(this._textarea.value)
  }

  stacksToJsonString() {
    return JSON.stringify(this.props.stacks, null, 2)
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.stacksToJsonString())
      .then(() => console.log("copied to clipboard"))
      .catch((error) => alert(error));
  }

  importFromClipboard() {
    navigator.clipboard.readText().then(this.props.import);
  }

  render() {
    let that = this;
    return [
      <h2 key="h2">Import / Export</h2>,
      <textarea
        key="textarea" rows="20" cols="20"
        defaultValue={this.stacksToJsonString()}
        ref={(textarea) => that._textarea = textarea}
      />,
      <button key="to-clipboard" type="submit" onClick={this.copyToClipboard}>Copy to Clipboard</button>,
      <button key="from-clipboard" type="submit" onClick={this.importFromClipboard}>Import from Clipboard</button>,
      <button key="import" type="submit" onClick={this.importClicked}>{"Import"}</button>,
      <button key="cancel" type="submit" onClick={this.props.cancel}>{"Cancel"}</button>,
    ];
  }
}

function itemsAboveProsperity(title, items, prosperity) {
  let maxProsperityItem = itemIdsByProsperityLevel[prosperity].slice(-1)[0];
  let itemDivs = items.filter(item => item > maxProsperityItem).map(itemToDiv);
  return <div key={title + "-div"}>
    {itemDivs.length > 0 && <h2 key="h2">{title}</h2>}
    {itemDivs}
  </div>;
}

class App extends React.Component {
  constructor(props) {
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
      stacks: this.initializeStacks(JSON.parse(window.localStorage.getItem("state"))),
      dialog: null
    };
    this.save();
  }

  initializeStacks(s) {
    let thirty = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    let initialRandomItems = [...Array(randomItemDesigns.n).keys()].map(i => i + randomItemDesigns.offset);
    let initialRandomScenarios = [...Array(randomScenarios.n).keys()].map(i => i + randomScenarios.offset);
    let initialPersonalGoals = [...Array(personalGoals.n).keys()].map(i => i + personalGoals.offset);

    s = s || {};
    s.cityEvents = s.cityEvents || {};
    s.cityEvents.stack = s.cityEvents.stack || shuffle(thirty.slice(0));
    s.cityEvents.history = s.cityEvents.history || [];

    s.roadEvents = s.roadEvents || {};
    s.roadEvents.stack = s.roadEvents.stack || shuffle(thirty.slice(0));
    s.roadEvents.history = s.roadEvents.history || [];

    s.randomItemDesigns = s.randomItemDesigns || {};
    s.randomItemDesigns.list = s.randomItemDesigns.list || [];
    s.randomItemDesigns.list.sort();
    // remove duplicates
    s.randomItemDesigns.list = s.randomItemDesigns.list.filter((e, i, a) => e !== a[i - 1]);
    s.randomItemDesigns.stack = s.randomItemDesigns.stack || initialRandomItems;
    // remove everything in list from stack
    for (let c of s.randomItemDesigns.list) {
      removeFromArray(s.randomItemDesigns.stack, c);
    }
    s.randomItemDesigns.history = s.randomItemDesigns.history || [];

    s.itemDesigns = s.itemDesigns || {};
    s.itemDesigns.list = s.itemDesigns.list || [];
    s.itemDesigns.history = s.itemDesigns.history || [];
    s.singleItems = s.singleItems || {};
    s.singleItems.list = s.singleItems.list || [];
    s.singleItems.history = s.singleItems.history || [];

    s.randomScenarios = s.randomScenarios || {};
    s.randomScenarios.stack = s.randomScenarios.stack || initialRandomScenarios;
    s.randomScenarios.list = s.randomScenarios.list || [];
    s.randomScenarios.history = s.randomScenarios.history || [];

    s.personalGoals = s.personalGoals || {};
    s.personalGoals.stack = s.personalGoals.stack || initialPersonalGoals;
    s.personalGoals.list = s.personalGoals.list || [];
    s.personalGoals.history = s.personalGoals.history || [];

    s.prosperity = s.prosperity || 1;

    return s;
  }

  showImportExport() {
    this.setDialog(<ImportExport
      stacks={this.state.stacks}
      import={this.import}
      cancel={this.cancel}
    />);
  }

  stackPopped(name, returnToBottom) {
    this.setState((prevState, props) => {
      let state = prevState;
      let events = this.state.stacks[name.toLowerCase() + "Events"];
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

      state.dialog = null;

      return state;
    }, this.save)
  }

  stackDrawn(name, cards, cardNo) {
    this.setState((prevState, props) => {
      let state = prevState;
      removeFromArray(cards.stack, cardNo);
      cards.list.push(cardNo);
      cards.list.sort();
      cards.history.push({
        action: "drawn",
        card: cardNo,
      });

      state.dialog = null;

      return state;
    }, this.save);
  }

  import(text) {
    try {
      let stacks = this.initializeStacks(JSON.parse(text));
      this.setState({
        stacks: stacks,
        dialog: null,
      }, this.save);
    } catch (e) {
      //TODO :(
      alert(e.message)
    }
  }

  addCardsAndCloseDialog(name, cardIdsToAdd){
    this.addCards(name, cardIdsToAdd);
    this.cancel();
  }

  addCards(name, cardIdsToAdd) {
    if (!cardIdsToAdd || cardIdsToAdd.length === 0) {
      return;
    }
    let simpleListMappings = {
      "Item Designs": this.state.stacks.itemDesigns,
      "Single Items": this.state.stacks.singleItems,
    };
    if (simpleListMappings[name]) {
      this.setState((prevState, props) => {
        let state = prevState;
        let list = simpleListMappings[name].list.concat(cardIdsToAdd);
        list.sort();
        if (name !== "Single Items") {
          // remove duplicates, but not on "Single Items"
          list = list.filter((el, idx, arr) => el !== arr[idx - 1]);
        }
        simpleListMappings[name].list = list;
        simpleListMappings[name].history.push({
          action: "added cards",
          cards: cardIdsToAdd,
        });

        return state;
      }, this.save);
    } else {
      // assuming "City Event" or "Road Event"
      const eventStackName = name.split(" ")[0].toLowerCase() + "Events";
      const stack = this.state.stacks[eventStackName];
      if (!stack) {
        throw "Unknown name for addCards: " + name;
      }
      this.setState((prevState, props) => {
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
    this.setState((prevState, props) => {
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

  setDialog(dialog) {
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
        <Draw key="randomItem" name="Random Item Design" cards={this.state.stacks.randomItemDesigns} cardProps={randomItemDesigns} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="randomScenario" name="Random Side Scenario" cards={this.state.stacks.randomScenarios} setDialog={this.setDialog} drawn={this.stackDrawn}/>
        <Draw key="personalGoal" name="Personal Goal" n={2} cards={this.state.stacks.personalGoals} cardProps={personalGoals} setDialog={this.setDialog} drawn={this.stackDrawn}/>
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

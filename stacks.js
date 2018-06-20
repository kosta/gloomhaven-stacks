    const randomItemDesigns = {
        url: "https://lh3.googleusercontent.com/u/0/d/1ubPFoTJ1_Ly-Eqn_yMvNhG0Dwq_tuw5c=s4800-k-iv1",
        width: 409,
        height: 636,
        offset: 71,
        cols: 10,
        n: 25,
    };

    const randomScenarios = {
        offset: 63,
        n: 9,
    }

    // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function removeFromArray(a, v) {
        while (true) {
        let i = a.indexOf(v);
        if (i === -1) {
            return;
        }
        a.splice(i, 1);
        }
    }

    function cardToDiv(i, props) {
        let n = i - props.offset;
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
        return <div key={i} style={style}>{i}</div>;
    }

    class RandomItemDesigns extends React.Component {
        render() {
        if (this.props.list.length === 0) {
            return null
        } else {
            return [
            <h2 key="h2">Random Item Designs</h2>,
            <div key="cards">
                {this.props.list.map(i => cardToDiv(i, randomItemDesigns))}
            </div>
            ]
        }
        }
    }

    class AddCards extends React.Component {
        constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.inputs = {};
        }

        handleClick(e, s) {
        e.preventDefault;
        this.props.addCards(s, this.inputs[s].value.split(/\D+/))
        return false;
        }

        render() {
        return [
            <h2 key="h2">Add Cards</h2>,
        ].concat(["City Events", "Road Events"].map((s) =>
            <div key={"div" + s}>
                <button key={s} type="button" onClick={(e) => this.handleClick(e, s)}>{s}</button>:
                <input ref={(i) => this.inputs[s] = i}/>
            </div>
        ));
        }
    }

    class EventCard extends React.Component {
        constructor(props) {
        super(props);

        this.selectA = this.selectA.bind(this);
        this.selectB = this.selectB.bind(this);
        this.returnToBottom = this.returnToBottom.bind(this);
        this.removeFromGame = this.removeFromGame.bind(this);

        this.state = {};
        }

        selectA(e) {
        this.setState({selected: "a"})
        e.preventDefault();
        return false;
        }

        selectB(e) {
        this.setState({selected: "b"})
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
        let r = [
            <h2 key="h2">{this.props.name} Event {this.props.number}</h2>,
            <div key="div-a"><button key="a" type="button" onClick={this.selectA} className={this.state.selected === "a" ? "selected" : ""}>A</button></div>,
            <div key="div-b"><button key="b" type="button" onClick={this.selectB} className={this.state.selected === "b" ? "selected" : ""}>B</button></div>,
        ];
        if (this.state.selected) {
            r = r.concat([
            <div key="div-ret"><button key="ret" type="button" onClick={this.returnToBottom}>Return to bottom</button></div>,
            <div key="div-rem"><button key="rem" type="button" onClick={this.removeFromGame}>Remove from game</button></div>,
            ])
        }
        return r;
        }
    }

    class RandomCard extends React.Component {
        constructor(props) {
        super(props);
        this.clicked = this.clicked.bind(this);
        }

        clicked() {
            this.props.drawn(this.props.name, this.props.cards, this.props.cardNo);
        }

        render() {
        return [
            <h2 key="h2">Drawn {this.props.name}: {this.props.cardNo}</h2>,
            <p key="button-div"><button key="button" type="button" onClick={this.clicked}>Accept {this.props.name}</button></p>,
            this.props.cardProps && cardToDiv(this.props.cardNo, this.props.cardProps)
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
        let cardNo = this.props.cards.stack[Math.floor(Math.random() * this.props.cards.stack.length)];
        // console.log("cardNo", cardNo);
        this.props.setDialog(
            <RandomCard
            name={this.props.name}
            cardNo={cardNo}
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
            <EventCard
            name={this.props.name}
            number={this.props.cards.stack[0]}
            stackPopped={this.props.stackPopped}
            />
        );
        }

        render() {
        return <button type="button" onClick={this.clicked} disabled={this.props.cards.stack.length === 0}>{"Draw " + this.props.name + " Event"}</button>
        }
    }

    class ImportExport extends React.Component {
        constructor(props) {
        super(props);
        this.importClicked = this.importClicked.bind(this)
        this._textarea = null;
        }

        importClicked() {
        this.props.import(this._textarea.value)
        }

        render() {
        let that = this;
        return [
            <h2 key="h2">Import / Export</h2>,
            <textarea
            key="textarea" rows="20" cols="20"
            defaultValue={JSON.stringify(this.props.stacks, null, 2)}
            ref={(textarea) => that._textarea = textarea}
            />,
            <button key="import" type="submit" onClick={this.importClicked}>{"Import"}</button>,
            <button key="cancel" type="submit" onClick={this.props.cancel}>{"Cancel"}</button>,
        ];
        }
    }

    class App extends React.Component {
        constructor(props) {
        super(props);

        this.showAddCards = this.showAddCards.bind(this);
        this.addCards = this.addCards.bind(this);
        this.stackPopped = this.stackPopped.bind(this);
        this.stackDrawn = this.stackDrawn.bind(this);
        this.showImportExport = this.showImportExport.bind(this);
        this.setDialog = this.setDialog.bind(this);
        this.import = this.import.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            stacks: this.initializeStacks(JSON.parse(window.localStorage.getItem("state"))),
            dialog: null,
        };
        this.save();
        }

        initializeStacks(s) {
        let thirty = [
            1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ];
        let initialRandomItems = [...Array(randomItemDesigns.n).keys()].map(i => i+randomItemDesigns.offset)
        let initialRandomScenarios = [...Array(randomScenarios.n).keys()].map(i => i+randomScenarios.offset)

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
        s.randomItemDesigns.list = s.randomItemDesigns.list.filter((e, i, a) => e !== a[i-1]);
        s.randomItemDesigns.stack = s.randomItemDesigns.stack || initialRandomItems;
        // remove everything in list from stack
        for(let c of s.randomItemDesigns.list) {
            removeFromArray(s.randomItemDesigns.stack, c);
        }
        s.randomItemDesigns.history = s.randomItemDesigns.history || [];

        s.randomScenarios = s.randomScenarios || {};
        s.randomScenarios.stack = s.randomScenarios.stack || initialRandomScenarios;
        s.randomScenarios.list = s.randomScenarios.list || [];
        s.randomScenarios.history = s.randomScenarios.history || [];

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
            console.log("events", events)
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
        } catch(e) {
            //TODO :(
            alert(e.message)
        }
        }

        addCards(name, cards) {
        console.log("addCards", name, cards);
        cards = cards.map((s) => parseInt(s, 10)).filter((x) => x === x);
        var stack;
        if (name === "Random Item Designs") {
            stack = this.state.stacks.randomItemDesigns;
            this.setState((prevState, props) => {
            let state = prevState;

            let list = state.stacks.randomItemDesigns.list.concat(cards);
            list.sort();
            // remove duplicates
            list = list.filter((el, idx, arr) => el !== arr[idx-1]);
            state.stacks.randomItemDesigns.list = list;

            state.stacks.randomItemDesigns.history.push({
                action: "added cards & shuffled",
                cards: cards,
            })

            return state;
            }, this.save);
        } else {
            // assuming "City Event" or "Road Event"
            stack = this.state.stacks[name.split(" ")[0].toLowerCase()+"Events"];
            if (!stack) {
            throw "Unknown name for addCards: " + name;
            }
            this.setState((state, props) => {
            stack.stack = stack.stack.concat(cards);
            shuffle(stack.stack);

            stack.history.push({
                action: "added cards & shuffled",
                cards: cards,
            });

            return state;
            }, this.save)
        }
        console.log("addCards", name, cards);
        this.cancel();
        }

        showAddCards() {
        this.setDialog(<AddCards addCards={this.addCards}/>);
        }

        setDialog(dialog) {
        this.setState({
            dialog: dialog
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
        return [
            <div key="button-frame" className="frame">
            <Pop key="city" name="City" cards={this.state.stacks.cityEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} />
            <Pop key="road" name="Road" cards={this.state.stacks.roadEvents} setDialog={this.setDialog} stackPopped={this.stackPopped} />
            <Draw key="randomItem" name="Random Item Design" cards={this.state.stacks.randomItemDesigns} cardProps={randomItemDesigns} setDialog={this.setDialog} drawn={this.stackDrawn} />
            <Draw key="randomScenario" name="Random Side Scenario" cards={this.state.stacks.randomScenarios} setDialog={this.setDialog} drawn={this.stackDrawn} />
            <button type="button" onClick={this.showAddCards}>Add Cards</button>
            <button type="button" onClick={this.showImportExport}>Import / Export</button>
            </div>,
            <div key="dialog-frame" className="frame">
            {this.state.dialog}
            </div>,
            <div key="random-items-div">
            <RandomItemDesigns list={this.state.stacks.randomItemDesigns.list} />
            </div>
        ];
        }
    };

    let app = <App />;
    ReactDOM.render(
        app,
        document.getElementById('root')
    );
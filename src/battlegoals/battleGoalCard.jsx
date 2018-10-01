import React from "react";

export default class BattleGoalCard extends React.Component {
    constructor(props) {
        super(props);
        this.reveal = this.reveal.bind(this);
        this.hide = this.hide.bind(this);
        this.state = {hidden: true};
    }

    reveal() {
        this.setState({hidden: false}, () => {
        });
    }

    hide() {
        this.setState({hidden: true}, () => {
        });
    }

    render() {
        const style = {
            opacity: this.state.hidden ? 0 : 1
        };
        return <span style={style} onMouseOver={this.reveal} onMouseOut={this.hide} key='first'>{this.props.battleGoalId}</span>;
    }
}
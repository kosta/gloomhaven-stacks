import React from "react";
import BattleGoalCard from 'battlegoals/battleGoalCard';

export default class PlayerBattleGoals extends React.Component {
    render() {
        return <ul>
            <li key='first'><BattleGoalCard battleGoalId={this.props.first}/></li>
            <li key='second'><BattleGoalCard battleGoalId={this.props.second}/></li>
        </ul>;
    }
}
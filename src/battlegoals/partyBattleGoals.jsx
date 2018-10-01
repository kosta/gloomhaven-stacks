import React from "react";
import {partition, shuffle} from "lang/arrays";
import {range} from "lang/ranges";
import PlayerBattleGoals from "battlegoals/playerBattleGoals";


function communityBattleGoals() {
    return range(1, 100);
}

function drawDistinctBattleGoals(count) {
    const allBattleGoals = communityBattleGoals();
    return shuffle(allBattleGoals).slice(0, count);
}

export default class PartyBattleGoals extends React.Component {
    render() {
        const battleGoalsPerPlayer = partition(2, drawDistinctBattleGoals(8));
        return (<table key={1}>
            <thead>
            <tr key='header'>
                {battleGoalsPerPlayer.map((battleGoals, index) => {
                    const playerNumber = index + 1;
                    return <th key={playerNumber}>Player {playerNumber}</th>;
                })}
            </tr>
            </thead>
            <tbody>
            <tr key='player-goals'>
                {battleGoalsPerPlayer.map((battleGoals, index) => {
                    const first = battleGoals[0];
                    const second = battleGoals[1];
                    const playerNumber = index + 1;
                    return <td key={playerNumber}><PlayerBattleGoals key={playerNumber} first={first} second={second}/></td>;
                })}
            </tr>
            </tbody>
        </table>);
    }
}

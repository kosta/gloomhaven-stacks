import * as React from "react";
import { NoState } from "../lang/react";

interface PersonalGoalCardProps {
  cardId: number;
}

export class PersonalGoalCard extends React.Component<PersonalGoalCardProps, NoState> {
  render() {
    const style = {
      display: "inline-block",
      width: "605px",
      borderRadius: '20px'
    } as React.CSSProperties;
    const cardId = this.props.cardId;
    return <img key={cardId} style={style} src={"https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/personal-quests/gloomhaven/gh-pq-" + cardId + ".png"} alt='personal goal'/>
  }
}

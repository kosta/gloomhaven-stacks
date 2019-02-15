import * as React from "react";
import { NoState } from "lang/react";
import Side from "cards/side";

interface EventCardProps {
  eventCardId: number,
  name: string,
  side: Side
}

export default class EventCard extends React.Component<EventCardProps, NoState> {
  constructor(props: EventCardProps) {
    super(props);
    this.eventCardImageUrl = this.eventCardImageUrl.bind(this);
  }

  render() {
    return <img key='image-front' src={this.eventCardImageUrl()}/>
  }

  eventCardImageUrl() {
    const twoDigitNumber = (this.props.eventCardId <= 9 ? "0" : "") + this.props.eventCardId;
    const imageName = this.props.name.toLowerCase();
    const imageBaseUrl = "https://raw.githubusercontent.com/any2cards/gloomhaven/master/images/events/base/" + imageName + "/" + imageName.charAt(0) + "e-" + twoDigitNumber + "-";
    const sideUrlPart = this.props.side === Side.Back ? 'b' : 'f';
    return imageBaseUrl + sideUrlPart + '.png';
  }
}

import * as React from 'react'
import { css, NoState } from 'lang/react'
import Side from 'cards/Side'

export type EventType = 'City' | 'Road'

interface EventCardProps {
  eventCardId: number
  name: EventType
  side: Side
}

export default class EventCard extends React.Component<EventCardProps, NoState> {
  constructor(props: EventCardProps) {
    super(props)
    this.eventCardImageUrl = this.eventCardImageUrl.bind(this)
  }

  render() {
    const style = css({
      borderRadius: '15px',
    })
    return <img key="image-front" style={style} src={this.eventCardImageUrl()} alt="event card" />
  }

  eventCardImageUrl() {
    const twoDigitNumber = (this.props.eventCardId <= 9 ? '0' : '') + this.props.eventCardId
    const imageName = this.props.name.toLowerCase()
    const firstLetter = imageName.charAt(0)
    const imageBaseUrl = `https://raw.githubusercontent.com/any2cards/worldhaven/master/images/events/gloomhaven/${imageName}/gh-${firstLetter}e-${twoDigitNumber}-`
    const sideUrlPart = this.props.side === Side.Back ? 'b' : 'f'
    return imageBaseUrl + sideUrlPart + '.png'
  }
}

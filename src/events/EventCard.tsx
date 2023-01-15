import Side from 'cards/Side'
import { css } from 'lang/react'
import * as React from 'react'

export type EventType = 'City' | 'Road'

interface EventCardProps {
  eventCardId: number
  name: EventType
  side: Side
}

const imageStyle = css({
  borderRadius: '15px',
})

const eventCardImageUrl = (props: Readonly<EventCardProps>) => {
  const twoDigitNumber = (props.eventCardId <= 9 ? '0' : '') + props.eventCardId
  const imageName = props.name.toLowerCase()
  const firstLetter = imageName.charAt(0)
  const imageBaseUrl = `https://raw.githubusercontent.com/any2cards/worldhaven/master/images/events/gloomhaven/${imageName}/gh-${firstLetter}e-${twoDigitNumber}-`
  const sideUrlPart = props.side === Side.Back ? 'b' : 'f'
  return imageBaseUrl + sideUrlPart + '.png'
}

export const EventCard = (props: EventCardProps) => {
  const src = eventCardImageUrl(props)
  return <img key="image-front" style={imageStyle} src={src} alt="event card" />
}

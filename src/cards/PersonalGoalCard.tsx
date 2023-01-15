import * as React from 'react'
import { css } from '../lang/react'

interface PersonalGoalCardProps {
  cardId: number
}

const style = css({
  display: 'inline-block',
  width: '605px',
  borderRadius: '20px',
})

export const PersonalGoalCard = (props: PersonalGoalCardProps) => {
  const cardId = props.cardId
  const imgSrc = `https://raw.githubusercontent.com/any2cards/worldhaven/master/images/personal-quests/gloomhaven/gh-pq-${cardId}.png`
  return <img key={cardId} style={style} src={imgSrc} alt="personal goal" />
}

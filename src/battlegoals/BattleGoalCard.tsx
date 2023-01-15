import { BattleGoal, battleGoalImages } from 'battlegoals/battleGoals'
import { range } from 'lang/ranges'
import { css } from 'lang/react'
import * as React from 'react'

interface BattleGoalCardProps {
  battleGoal: BattleGoal
  cardShadow: boolean
  blurCard: boolean
}

const battleGoalStyle = css({
  position: 'relative',
  height: 300,
  width: 200,
})

export const BattleGoalCard = (props: BattleGoalCardProps) => {
  const imageStyle = css({
    borderRadius: '15px',
    height: '100%',
    width: '100%',
  })

  if (props.cardShadow) {
    imageStyle.boxShadow = '0px 12px 22px 1px rgb(27, 26, 26)'
  }
  if (props.blurCard) {
    imageStyle.filter = 'blur(5px) brightness(0.5)'
  }

  return (
    <div style={battleGoalStyle}>
      <img style={imageStyle} src={battleGoalImages.foreground} alt="ups" />
      <BattleGoalCardOverlay battleGoal={props.battleGoal} />
    </div>
  )
}

const overlayStyle = css({
  position: 'absolute',
  top: '22%',
  width: '64%',
  bottom: '10%',
  left: '18%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
})

const titleStyle = css({
  margin: '0',
  fontFamily: 'Pirata One',
  fontSize: '1.35em',
  fontWeight: 'normal',
})

const descriptionStyle = css({
  display: 'flex',
  alignItems: 'center',
  fontFamily: 'High Tower',
  fontSize: '0.8em',
  lineHeight: '1.2em',
  height: '52%',
  padding: '0 7% 0 7%',
})

const perksStyle = css({
  position: 'absolute',
  bottom: '12.5%',
  left: '50%',
  width: '50%',
  margin: '0 0 0 -30%',
  fontSize: '2em',
  fontWeight: 'bold',
})

const cardNumberStyle = css({
  position: 'absolute',
  bottom: '3%',
  left: '50%',
  width: '20%',
  margin: '0 0 0 -15%',
  color: 'white',
  fontSize: 'xx-small',
})

const BattleGoalCardOverlay = (props: Pick<BattleGoalCardProps, 'battleGoal'>) => {
  const battleGoal = props.battleGoal

  return (
    <div style={overlayStyle}>
      <h3 style={titleStyle}>{battleGoal.displayName}</h3>
      <section style={descriptionStyle}>{battleGoal.text}</section>
      <div key="perks" style={perksStyle}>
        {range(0, battleGoal.reward)
          .map(() => '✓')
          .join('')}
      </div>
      <div key="globalCardId" style={cardNumberStyle}>
        {battleGoal.globalCardId.displayString()}
      </div>
    </div>
  )
}

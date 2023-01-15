import BattleGoalCard from 'battlegoals/BattleGoalCard'
import { BattleGoal, battleGoalImages, officialBattleGoals, satireGamingBattleGoals } from 'battlegoals/battleGoals'
import { css } from 'lang/react'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

interface ScanFilenameLookupTable {
  [key: number]: string
}

const scanFilenameLookupTable: ScanFilenameLookupTable = {
  258: 'streamliner',
  259: 'layabout',
  260: 'workhorse',
  261: 'zealot',
  262: 'masochist',
  263: 'fast-healer',
  264: 'neutralizer',
  265: 'plunderer',
  266: 'protector',
  267: 'explorer',
  268: 'hoarder',
  269: 'indigent',
  270: 'pacifist',
  271: 'sadist',
  272: 'hunter',
  273: 'professional',
  274: 'aggressor',
  275: 'dynamo',
  276: 'purist',
  277: 'opener',
  278: 'diehard',
  279: 'executioner',
  280: 'straggler',
  281: 'scrambler',
}

function urlToScanFor(it: BattleGoal) {
  if (it.globalCardId.origin === 'official') {
    return scanFilenameLookupTable[it.globalCardId.cardNumber]
  }
  return 'empty'
}

const galleryStyle = css({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})
const imageStyle = css({
  width: 200,
  height: 300,
})
const battleGoalContainerStyles = css({
  display: 'flex',
  flexDirection: 'row',
})

const Gallery = () => {
  const allBattleGoals = officialBattleGoals.concat(satireGamingBattleGoals)
  const cards = allBattleGoals.map((it) => {
    const nameInRepository = urlToScanFor(it)
    const battleCardGoalurl = `https://raw.githubusercontent.com/any2cards/worldhaven/master/images/battle-goals/gloomhaven/gh-${nameInRepository}.png`
    const imgUrl = nameInRepository === 'empty' ? battleGoalImages.background : battleCardGoalurl
    return (
      <div style={battleGoalContainerStyles} key={it.globalCardId.asString()}>
        <BattleGoalCard battleGoal={it} cardShadow={false} blurCard={false} />
        <img style={imageStyle} src={imgUrl} alt="empty" />
      </div>
    )
  })
  return <div style={galleryStyle}>{cards}</div>
}

const container = document.getElementById('root')
if (container === null) {
  throw new Error('root element not found')
}
createRoot(container).render(<Gallery />)

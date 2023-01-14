import BattleGoalCard from 'battlegoals/BattleGoalCard'
import { BattleGoal, officialBattleGoals, satireGamingBattleGoals } from 'battlegoals/battleGoals'
import { NoProps, NoState } from 'lang/react'
import * as React from 'react'
import { CSSProperties } from 'react'
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
  263: 'fasthealer',
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

class Gallery extends React.Component<NoProps, NoState> {
  render(): React.ReactNode {
    const allBattleGoals = officialBattleGoals.concat(satireGamingBattleGoals)
    const style = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    } as CSSProperties
    const imageStyle = {
      width: 200,
      height: 300,
    }
    const cards = allBattleGoals.map((it) => {
      const imgUrl = `https://raw.githubusercontent.com/any2cards/worldhaven/master/images/battle-goals/gloomhaven/gh-${urlToScanFor(
        it,
      )}.png`
      const style = {
        display: 'flex',
        flexDirection: 'row',
      } as CSSProperties
      return (
        <div style={style} key={it.globalCardId.asString()}>
          <BattleGoalCard battleGoal={it} cardShadow={false} blurCard={false} />
          <img style={imageStyle} src={imgUrl} alt="empty" />
        </div>
      )
    })
    return <div style={style}>{cards}</div>
  }
}

const container = document.getElementById('root')
if (container === null) {
  throw new Error('root element not found')
}
createRoot(container).render(<Gallery />)

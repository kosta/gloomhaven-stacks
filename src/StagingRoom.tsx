import { PartyBattleGoals } from 'battlegoals/PartyBattleGoals'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const container = document.getElementById('root')
if (container === null) {
  throw new Error('root element not found')
}
createRoot(container).render(<PartyBattleGoals />)

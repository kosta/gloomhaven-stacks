import { App } from 'app/App'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const initialCardStacks = App.initializeStacksFromLocalStorage()
const container = document.getElementById('root')
if (container === null) {
  throw new Error('root element not found')
}
createRoot(container).render(<App initialCardStacks={initialCardStacks} />)

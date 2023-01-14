import { App } from 'app/App'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const initialCardStacks = App.initializeStacksFromLocalStorage()
const app = <App initialCardStacks={initialCardStacks} />

const container = document.getElementById('root')
if (container === null) {
  throw new Error('root element not found')
}
createRoot(container).render(app)

import * as React from 'react'
import { css, NoState } from 'lang/react'
import { StackPopped } from 'stacks/Pop'
import { EventCard, EventType } from 'events/EventCard'
import Side from 'cards/Side'

interface ButtonWithSelectionHighlightProps {
  onClick: React.MouseEventHandler
  selected: boolean
  text: string
}

class ButtonWithSelectionHighlight extends React.Component<ButtonWithSelectionHighlightProps, NoState> {
  render() {
    const style = css({})
    if (this.props.selected) {
      style.borderColor = 'red'
    }
    return (
      <button key={this.props.text} style={style} type="button" onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

interface BringEventToConclusionProps extends StackPopped {
  name: EventType
  number: number
  children: React.ReactNode
}

enum Choice {
  A = 'A',
  B = 'B',
}

interface BringEventToConclusionState {
  selected: Choice | undefined
}

export class BringEventToConclusion extends React.Component<BringEventToConclusionProps, BringEventToConclusionState> {
  constructor(props: BringEventToConclusionProps) {
    super(props)

    this.selectA = this.selectA.bind(this)
    this.selectB = this.selectB.bind(this)
    this.returnToBottom = this.returnToBottom.bind(this)
    this.removeFromGame = this.removeFromGame.bind(this)
    this.state = { selected: undefined }
  }

  selectA(e: React.MouseEvent) {
    this.setState({ selected: Choice.A })
    e.preventDefault()
    return false
  }

  selectB(e: React.MouseEvent) {
    this.setState({ selected: Choice.B })
    e.preventDefault()
    return false
  }

  returnToBottom(e: React.MouseEvent) {
    this.props.stackPopped(this.props.name, true)
    e.preventDefault()
    return false
  }

  removeFromGame(e: React.MouseEvent) {
    this.props.stackPopped(this.props.name, false)
    e.preventDefault()
    return false
  }

  render() {
    const containerStyle = css({
      display: 'flex',
      flexDirection: 'row',
    })
    const choiceStyle = css({
      display: 'flex',
      flexDirection: 'column',
      padding: '0 1em 0',
    })
    const resolutionStyle = css({
      display: 'flex',
      flexDirection: 'column',
      padding: '0 1em 0 ',
    })
    return (
      <React.Fragment>
        <h2 key="h2">
          {this.props.name} Event {this.props.number}
        </h2>
        <div key="event-conclusion-container" style={containerStyle}>
          <EventCard key="event-card-front" eventCardId={this.props.number} side={Side.Front} name={this.props.name} />
          <div key="choice-container" style={choiceStyle}>
            <ButtonWithSelectionHighlight onClick={this.selectA} selected={this.state.selected === Choice.A} text="A" />
            <ButtonWithSelectionHighlight onClick={this.selectB} selected={this.state.selected === Choice.B} text="B" />
          </div>
          {this.state.selected && [
            <EventCard key="event-card-back" eventCardId={this.props.number} side={Side.Back} name={this.props.name} />,
            <div key="resolution-container" style={resolutionStyle}>
              {this.props.children}
              <h3>Conclusion</h3>
              <button key="ret" type="button" onClick={this.returnToBottom}>
                Return to bottom
              </button>
              <button key="rem" type="button" onClick={this.removeFromGame}>
                Remove from game
              </button>
            </div>,
          ]}
        </div>
      </React.Fragment>
    )
  }
}

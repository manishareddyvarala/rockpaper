import {Component} from 'react'

import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './index.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class RockPaper extends Component {
  state = {
    isShow: false,
    score: 0,
    newArray: [choicesList[0], choicesList[1]],
    text: '',
  }

  onClickPlayAgainButton = () => {
    this.setState({
      newArray: [choicesList[0], choicesList[1]],
      isShow: false,
      text: '',
    })
  }

  renderGetResultView = () => {
    const {text, newArray} = this.state
    return (
      <>
        <div className="result-view-container">
          <div className="result-cont">
            <h1 className="own_name">YOU</h1>
            <img
              src={newArray[0].imageUrl}
              alt="your choice"
              className="game-img-icon"
            />
          </div>
          <div className="result-cont">
            <h1 className="own_name">OPPONENT</h1>
            <img
              src={newArray[1].imageUrl}
              alt="opponent choice"
              className="game-img-icon"
            />
          </div>
        </div>
        <div className="result-card-con">
          <p className="your-own-text">{text}</p>
          <button
            type="button"
            onClick={this.onClickPlayAgainButton}
            className="display-text"
          >
            PLAY AGAIN
          </button>
        </div>
      </>
    )
  }

  getResultView = (choice1, choice2) => {
    if (choice2.id === 'ROCK') {
      switch (choice1.id) {
        case 'PAPER':
          return 'YOU WON'
        case 'SCISSORS':
          return 'YOU LOSE'

        default:
          return 'IT IS DRAW'
      }
    } else if (choice2.id === 'PAPER') {
      switch (choice1.id) {
        case 'SCISSORS':
          return 'YOU WON'
        case 'ROCK':
          return 'YOU LOSE'

        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (choice1.id) {
        case 'PAPER':
          return 'YOU LOSE'
        case 'ROCK':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  checkResultStatus = id => {
    const {score} = this.state
    const choice1 = choicesList[Math.floor(Math.random() * choicesList.length)]
    const choice2 = choicesList.filter(each => each.id === id)
    const result = this.getResultView(choice2[0], choice1)
    if (result === 'YOU WON') {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else if (result === 'IT IS DRAW') {
      this.setState({score})
    } else {
      this.setState(prevState => ({score: prevState.score - 1}))
    }
    this.setState({newArray: [choice2[0], choice1]})
    this.setState({text: result})
  }

  onClickRules = () => {
    this.setState({isShow: true})
  }

  onClickRock = id => {
    const {isShow} = this.state
    this.checkResultStatus(id)
    if (isShow === true) {
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  onClickScissors = id => {
    const {isShow} = this.state
    this.checkResultStatus(id)
    if (isShow === true) {
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  onClickPaper = id => {
    const {isShow} = this.state
    this.checkResultStatus(id)
    if (isShow === true) {
      this.setState({isShow: false})
    } else {
      this.setState({isShow: true})
    }
  }

  renderRockPaperDisplay = () => (
    <>
      <div>
        <div className="game-cont">
          <div className="game-img-list">
            <div className="game-btn">
              <button
                type="button"
                data-testid="rockButton"
                onClick={() => this.onClickRock(choicesList[0].id)}
              >
                <img
                  src={choicesList[0].imageUrl}
                  alt={choicesList[0].id}
                  key={choicesList[0].id}
                  className="game-img-icon "
                />
              </button>
              <button
                type="button"
                data-testid="scissorsButton"
                onClick={() => this.onClickScissors(choicesList[1].id)}
              >
                <img
                  src={choicesList[1].imageUrl}
                  alt={choicesList[1].id}
                  key={choicesList[1].id}
                  className="game-img-icon"
                />
              </button>
            </div>
            <div className="game-btn1">
              <button
                type="button"
                data-testid="paperButton"
                onClick={() => this.onClickPaper(choicesList[2].id)}
              >
                <img
                  src={choicesList[2].imageUrl}
                  alt={choicesList[2].id}
                  key={choicesList[2].id}
                  className="game-img-icon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rules-btn-cont">
        <Popup
          trigger={
            <button type="button" className="rules-btn">
              RULES
            </button>
          }
          mouse
          nested
          div
          className="pop-up-cont"
        >
          {close => (
            <div className="pop-up-cont">
              <button type="button" onClick={close}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                  alt="rules"
                  className="rules-img"
                />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </>
  )

  render() {
    const {isShow, score} = this.state

    return (
      <div className="rock-paper-container">
        <div className="rock-paper-score-container">
          <div className="rock-sub-cont">
            <h1 className="rock-para">
              ROCK <br /> PAPER <br /> SCISSORS
            </h1>
          </div>
          <div className="scores-count-cont">
            <p className="score-display">Score</p>
            <p className="score-count-display">{score}</p>
          </div>
        </div>
        {isShow ? this.renderGetResultView() : this.renderRockPaperDisplay()}
      </div>
    )
  }
}
export default RockPaper

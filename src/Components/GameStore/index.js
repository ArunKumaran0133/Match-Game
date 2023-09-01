import {Component} from 'react'

import GameTabs from '../GameTabs'

import GameItem from '../GameItem'

import './index.css'

const tabsList = [
  {tabId: 'FRUIT', displayText: 'Fruits'},
  {tabId: 'ANIMAL', displayText: 'Animals'},
  {tabId: 'PLACE', displayText: 'Places'},
]

class GameStore extends Component {
  state = {
    initialImage:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    activeTabId: tabsList[0].tabId,
    isGameActive: false,
    time: 60,
    score: 0,
  }

  componentDidMount() {
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameActive: true})
    }
  }

  getActiveTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  filteredThumbnailList = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    const filteredList = imagesList.filter(
      eachImage => eachImage.category === activeTabId,
    )
    return filteredList
  }

  imageClick = thumbnailUrl => {
    const {imagesList} = this.props
    const {initialImage} = this.state
    const imageValue = imagesList.filter(
      eachImage => eachImage.thumbnailUrl === thumbnailUrl,
    )

    const {imageUrl} = imageValue[0]

    if (initialImage === imageUrl) {
      const newImageUrl =
        imagesList[Math.floor(Math.random() * imagesList.length)].imageUrl
      this.setState(prevState => ({
        score: prevState.score + 1,
        initialImage: newImageUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameActive: true})
    }
  }

  playAgain = () => {
    this.setState({
      initialImage:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      activeTabId: tabsList[0].tabId,
      isGameActive: false,
      time: 60,
      score: 0,
    })
    this.timerId = setInterval(this.statusChange, 1000)
  }

  render() {
    const {initialImage, activeTabId, score, time, isGameActive} = this.state
    const filteredList = this.filteredThumbnailList()
    return (
      <div className="main-bg-container">
        <nav className="nav-bar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="app-logo"
          />
          <ul className="score-score-text-container">
            <li>
              <p className="score-text">
                Score:<span className="span-element">{score}</span>
              </p>
            </li>
            <li className="timer-image-seconds-text">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-image"
              />
              <p className="seconds-text">{time} Sec</p>
            </li>
          </ul>
        </nav>
        {!isGameActive && (
          <div className="image-tab-thumbnail-container">
            <div className="top-image-container">
              <img src={initialImage} alt="match" className="top-image" />
            </div>
            <ul className="list-container">
              {tabsList.map(eachTabs => (
                <GameTabs
                  key={eachTabs.tabId}
                  eachTabs={eachTabs}
                  getActiveTabId={this.getActiveTabId}
                  isActiveTab={eachTabs.tabId === activeTabId}
                />
              ))}
            </ul>
            <ul className="list-container-thumbnail">
              {filteredList.map(eachImageDetail => (
                <GameItem
                  key={eachImageDetail.id}
                  eachImageDetail={eachImageDetail}
                  imageClick={this.imageClick}
                />
              ))}
            </ul>
          </div>
        )}
        {isGameActive && (
          <div className="game-over-bg-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="game-over-image"
            />
            <p className="your-score-text">Your Score</p>
            <p className="your-score">{score}</p>
            <button
              type="button"
              className="play-again-button"
              onClick={this.playAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              Play Again
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default GameStore

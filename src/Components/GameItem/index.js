import './index.css'

const GameItem = props => {
  const {eachImageDetail, imageClick} = props
  const {thumbnailUrl} = eachImageDetail
  const isImgClicked = () => {
    imageClick(thumbnailUrl)
  }

  return (
    <li>
      <button type="button" className="thumbnail-button" onClick={isImgClicked}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default GameItem

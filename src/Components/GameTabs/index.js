import './index.css'

const GameTabs = props => {
  const {eachTabs, getActiveTabId, isActiveTab} = props
  const {tabId, displayText} = eachTabs

  const className = isActiveTab ? 'isActive' : ''

  const activeTabId = () => {
    getActiveTabId(tabId)
  }

  return (
    <li>
      <button
        type="button"
        className={`tab-item ${className}`}
        onClick={activeTabId}
      >
        {displayText}
      </button>
    </li>
  )
}

export default GameTabs

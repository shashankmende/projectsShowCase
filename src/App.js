import './App.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Select from './components/Select'
import ProjectItem from './components/ProjectItem'

//  This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

// Replace your code here

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class App extends Component {
  state = {
    list: [],
    category: categoriesList[0].id,
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {category} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(url)
    const data = await response.json()

    if (response.ok === true) {
      const newData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))

      this.setState({
        list: newData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onChangeOption = event => {
    this.setState(
      {
        category: event.target.value,
      },
      this.getData,
    )
  }

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    this.setState(
      {
        apiStatus: apiStatusConstant.inProgress,
      },
      this.getData,
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retryBtn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {list} = this.state

    return (
      <ul className="list-container">
        {list.map(each => (
          <ProjectItem key={each.id} project={each} />
        ))}
      </ul>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {list} = this.state
    console.log('list', list)
    return (
      <div className="bg-container">
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </div>
        <div className="bottom-container">
          <select className="select-container" onChange={this.onChangeOption}>
            {categoriesList.map(each => (
              <Select key={each.id} categoryList={each} />
            ))}
          </select>
          {this.renderResult()}
        </div>
      </div>
    )
  }
}

export default App

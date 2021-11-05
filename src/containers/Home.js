import React, { Component } from 'react'
import { LIST_VIEW, CHART_VIEW } from '../utility'
import MonthPicker from '../components/MonthPicker.js'
import withContext from '../withContext'
import TotalPrice from '../components/TotalPrice'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg';
import Loader from '../components/Loader'
//方便拓展，这里做成一个数组，并且重构ViewTab组件
const tabsView = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsView[0]
    }
  }
  render () {
    const { data } = this.props
    const { isLoading } = data
    const { tabView } = this.state
    return (
      <React.Fragment>
        <div className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo">
            </img>
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker
                year={2021}
                month={11}
                onchange={() => { }}
              >

              </MonthPicker>
            </div>
            <div className="col">
              <TotalPrice income={100} outcome={500}>

              </TotalPrice>
            </div>
          </div>
        </div>

      </React.Fragment >
    )
  }
}
export default withContext(Home)
import React, { Component } from 'react'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, Colors } from '../utility'
import MonthPicker from '../components/MonthPicker.js'
import withContext from '../withContext'
import TotalPrice from '../components/TotalPrice'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg'
import Loader from '../components/Loader'
//方便拓展，这里做成一个数组，并且重构ViewTab组件
const tabsView = [LIST_VIEW, CHART_VIEW]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsView[0]
    }
    this.onChangeDate = (year, month) => {
      this.props.actions.selectNewMonth(year, month)
    }
  }
  render () {
    const { data } = this.props
    const { items, categories, currentDate, isLoading } = data
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
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.onChangeDate}>

              </MonthPicker>
            </div>
            <div className="col">
              <TotalPrice>

              </TotalPrice>
            </div>
          </div>
        </div>
        <div className="content-area py-3 px-3">
          {isLoading && <Loader></Loader>}
          {!isLoading &&
            <React.Fragment>
              <ViewTab></ViewTab>
              <CreateBtn></CreateBtn>
              {
                tabView === LIST_VIEW &&
                <></>
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment >
    )
  }
}
export default withContext(Home)
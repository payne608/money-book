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

  }
  componentDidMount () {
    this.props.actions.getInitalData()
    console.log(this.props.data.items[1]);
  }
  onChangeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  }
  render () {
    const { data } = this.props
    const { items, categories, currentDate, isLoading } = data
    console.log(isLoading);
    const { tabView } = this.state
    //操作不可变值
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })

    return (
      <React.Fragment>
        <div className="App-header">
          <div className="row mb-5 justify-content-center">
            <img src={logo} className="App-logo" alt="logo">
            </img>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.onChangeDate}>

              </MonthPicker>
            </div>
            <div className="col ">

              <TotalPrice>

              </TotalPrice>

            </div>
          </div>
        </div>
        <div className="content-area py-3 px-3">
          {isLoading && <Loader />}
          {!isLoading &&
            <React.Fragment>
              <ViewTab activeTab={this.state.tabView}
                onTabChange={(value) => {
                  this.setState({
                    tabView: value
                  })
                }}></ViewTab>
              <CreateBtn onClick={() => { this.props.history.push('/create') }}></CreateBtn>
              {
                tabView === LIST_VIEW && itemsWithCategory.length > 0 &&
                <PriceList
                  items={itemsWithCategory}
                  onModifyItem={this.modifyItem}
                  onDeleteItem={this.deleteItem}
                ></PriceList>
              }
              {
                tabView === LIST_VIEW && itemsWithCategory.length === 0 &&
                <div className="alert alert-light text-center no-record">
                  您还没有任何记账记录
                </div>
              }
              {
                tabView === CHART_VIEW &&
                <div >
                  这里是图表区域
                </div>
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment >
    )
  }
}
export default withContext(Home)
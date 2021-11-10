import React, { Component } from 'react'
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, Colors } from '../utility'
import MonthPicker from '../components/MonthPicker.js'
import withContext from '../withContext'
import TotalPrice from '../components/TotalPrice'
import PriceList from '../components/PriceList'
import { Tabs, Tab } from '../components/Tabs'
import CreateBtn from '../components/CreateBtn'
import logo from '../logo.svg'
import Loader from '../components/Loader'
import Ionicon from 'react-ionicons'
import PieChart from '../components/PieChart'


//Colors转为数组
const colorsArr = Object.keys(Colors).map(item => Colors[item])
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);


};

//方便拓展，这里做成一个数组，并且重构ViewTab组件
const tabsView = [LIST_VIEW, CHART_VIEW]
const generateChartDataByCategory = (items, type = TYPE_OUTCOME) => {
  //为减小时间复杂度这里使用map，然后遍历一遍items即可
  let categoryMap = {}
  items.filter(item => item.category.type === type).forEach(item => {
    if (categoryMap[item.cid]) {
      //转成数字*1
      categoryMap[item.cid].value += item.price * 1
      categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id]
    } else {
      categoryMap[item.cid] = {
        name: item.category.name,
        value: item.price * 1,
        items: [item.id]
      }
    }
  })

  return Object.keys(categoryMap).map(id => {
    return categoryMap[id]
  })



}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabView: tabsView[0]
    }
  }
  componentDidMount () {
    this.props.actions.getInitalData()

  }
  onChangeDate = (year, month) => {
    this.props.actions.selectNewMonth(year, month)
  }
  modifyItem = (item) => {
    this.props.history.push(`/edit/${item.id}`)
  }
  deleteItem = (item) => {
    this.props.actions.deleteItem(item)
  }
  handleClick = () => { this.props.history.push('/create') }
  changeView = (index) => {
    console.log(index);
    this.setState({
      tabView: tabsView[index]
    })
  }

  render () {
    const { data } = this.props
    const { items, categories, currentDate, isLoading } = data

    const { tabView } = this.state
    //操作不可变值
    const itemsWithCategory = Object.keys(items).map(id => {
      items[id].category = categories[items[id].cid]
      return items[id]
    })
    let totalIncome = 0, totalOutcome = 0
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price
      } else {
        totalIncome += item.price
      }
    })
    const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_OUTCOME)
    const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, TYPE_INCOME)
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

              <TotalPrice income={totalIncome} outcome={totalOutcome}>

              </TotalPrice>

            </div>
          </div>
        </div>
        <div className="content-area py-3 px-3">
          {isLoading && <Loader />}
          {!isLoading &&
            <React.Fragment>
              <Tabs activeIndex={0} onTabChange={this.changeView}>
                <Tab>
                  <Ionicon
                    className="rounded-circle mr-2"
                    fontSize="25px"
                    color={Colors.blue}
                    icon='ios-paper'
                  />
                  列表模式
                </Tab>
                <Tab>
                  <Ionicon
                    className="rounded-circle mr-2"
                    fontSize="25px"
                    color={Colors.blue}
                    icon='ios-pie'
                  />
                  图表模式
                </Tab>
              </Tabs>
              <CreateBtn onClick={this.handleClick}></CreateBtn>
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
                <React.Fragment>
                  <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                  <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
                </React.Fragment>

              }
            </React.Fragment>
          }
        </div>
      </React.Fragment >
    )
  }
}
export default withContext(Home)
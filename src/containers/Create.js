import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import withContext from '../withContext'
import Loader from '../components/Loader'

const tabsText = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: TYPE_OUTCOME,
      selectedCategory: null,
      validationPassed: true,
    }
  }
  componentDidMount () {
    const { id } = this.props.match.params
    //通过getEditData获取类别和对应要编辑项目信息
    //之所以通过getEditData获取数据，
    //而不是this.props.data中获取是因为我们希望能对异步做一些优化
    //考虑用户直接输入/edit/:id，这个时候app.js中没有挂载好数据可以得到
    //getEditData的封装就是做了这样一个事情，如果有数据直接拿，没有数据还要再请求一次
    if (id) {
      this.props.actions.getEditData(id).then(data => {
        const { editItem, categories } = data
        this.setState({
          //如果找不到id或者找不到editItem,本页面变为创建页
          selectedTab: (editItem) ? categories[editItem.cid].type : TYPE_OUTCOME,
          selectedCategory: (editItem) ? categories[editItem.cid] : null
        })
      })
    }

  }
  tabChange = (index) => {
    this.setState({
      selectedTab: tabsText[index]
    })
  }
  render () {

    return (
      <div className="create-page py-3 px-3 rounded mt-3" style={{ background: '#fff' }}>
        {data.isLoading &&
          <Loader />
        }
        <Tabs activeIndex={tabIndex} onTabChange={this.tabChange}>
          <Tab>
            支出
          </Tab>
          <Tab>
            收入
          </Tab>
        </Tabs>
        <CategorySelect
          categories={this.filterCategories}
          selectedCategory={this.selectCategory}
          onSelectCategory={this.onSelectCategory}></CategorySelect>
      </div>
    )
  }
}
Create.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
export default withContext(Create)
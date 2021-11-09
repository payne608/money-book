import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TYPE_INCOME, TYPE_OUTCOME } from '../utility'
import CategorySelect from '../components/CategorySelect'
import { Tabs, Tab } from '../components/Tabs'
import withContext from '../withContext'
import Loader from '../components/Loader'
import PriceForm from '../components/PriceForm'

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
  selectCategory = (category) => {
    this.setState({
      selectedCategory: category
    })
  }
  submitForm = (data, isEditMode) => {

    //这里是最终执行位置，在这里卡住不符合要求的值即可
    if (!this.state.selectedCategory) {
      this.setState({
        validationPassed: false
      })
      return
    }

    if (!isEditMode) {
      // create

      //成功后再跳回

      this.props.actions.createItem(data, this.state.selectedCategory.id).then(this.navigateToHome)
    } else {

      // update 
      this.props.actions.updateItem(data, this.state.selectedCategory.id).then(this.navigateToHome)
    }
    //后台出现错误，都更新失败了也跳回
    this.props.history.push('/')
  }
  cancelSubmit = () => {
    this.props.history.push('/')
  }
  navigateToHome = () => {
    this.props.history.push('/')
  }
  render () {
    const { selectedTab, selectedCategory, validationPassed } = this.state
    const tabIndex = tabsText.findIndex(text => text === selectedTab)
    const { data, actions } = this.props
    const items = data.items
    const categories = data.categories
    const filterCategories = Object.keys(categories)
      .map(id => categories[id])
      .filter(item => item.type === selectedTab)
    const id = this.props.match.params.id
    const editItem = (id && items[id]) ? items[id] : {}
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
          categories={filterCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={this.selectCategory}>
        </CategorySelect>
        <PriceForm item={editItem} onFormSubmit={this.submitForm} onCancelSubmit={this.cancelSubmit}></PriceForm>
        {!validationPassed &&
          <div className="alert alert-danger mt-5" role="alert">
            请选择分类信息
          </div>
        }
      </div>
    )
  }
}
Create.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
export default withContext(Create)
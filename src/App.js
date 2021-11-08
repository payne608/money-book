import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './containers/Home'
import Create from './containers/Create'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContext } from './AppContext'
import { flatternArr, parseToYearAndMonth, ID } from './utility'
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    super(props)
    //同一在容器型组件中获取数据
    this.state = {
      items: {},
      categories: {},
      isLoading: false,
      currentDate: parseToYearAndMonth("2021-12")
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: withLoading(async () => {
        const { currentDate } = this.state
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(categories.data),
          isLoading: false
        })
        return { items, categories }
      }),
      selectNewMonth: withLoading(async (year, month) => {
        //开启loading之后
        //重新获取数据，发送网络请求
        const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items: flatternArr(items.data),
          currentDate: {
            year, month
          },
          isLoading: false
        })
        return items
      }),
      deleteItem: withLoading(async (item) => {
        // await axios.delete(`/items/${item.id}`)
        const itemsCopy = JSON.parse(JSON.stringify(this.state.items))
        delete itemsCopy[item.id]
        this.setState({
          items: itemsCopy,
          isLoading: false
        })
      }),
      getEditData: withLoading(async (id) => {
        //根据id获取数据
        //如果有就不用获取了,如果没有就获取
        const { items, categories } = this.state
        const promises = []
        if (!items[id]) {
          //如果找不到该item，那么需要发送网络请求
          ///items?id=${id}返回的是一个数组，但是/items/${id}返回的是一个对象
          promises.push(axios.get(`/items/${id}`))
        } else {
          promises.push(new Promise(resolve => resolve(null)))
        }
        if (Object.keys(categories).length === 0) {
          promises.push(axios.get('/categories'))
        } else {
          promises.push(new Promise(resolve => resolve(null)))
        }
        const [editItem, fetchedCategories] = await Promise.all(promises)
        //editItem有可能取不到
        //取到了分两种情况，app.js中已经取到和通过Create.js发送网络请求得到
        const finaEditItem = editItem ? editItem.data : items[id]
        const finalCategories = fetchedCategories ? flatternArr(fetchedCategories.data) : categories
        this.setState({
          categories: finalCategories,
          isLoading: false
        })

        return {
          editItem: finaEditItem,
          categories: finalCategories
        }
      })
    }
  }
  render () {

    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Router>
          <div className="App sm">
            <div className="container pb-5">
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </div>
          </div>
        </Router>
      </AppContext.Provider>
    )
  }

  ;
}

export default App;

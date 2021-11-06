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
      currentDate: parseToYearAndMonth("2021-11")
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({ isLoading: true })
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: async () => {
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
      },
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
          <div className="App">
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

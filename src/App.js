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
      currentDate: parseToYearAndMonth()
    }
    const withLoading = (cb) => {
      return (...args) => {
        this.setState({ isLoading: true })
        return cb(...args)
      }
    }
    this.actions = {
      getInitalData: async () => {
        const { currentDate } = this.date
        const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}`
        const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)])
        const [categories, items] = results
        this.setState({
          items: flatternArr(items.data),
          categories: flatternArr(items.data),
          isLoading: false
        })
        return { items, categories }



      }
      ,




      selectNewMonth: withLoading((year, month) => {

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

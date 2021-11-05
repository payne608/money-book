import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './containers/Home'
import Create from './containers/Create'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContext } from './AppContext'
import { parseToYearAndMonth } from './utility';



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
    this.actions = {

    }



  }
  render () {
    return (
      <AppContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>
        <Home></Home>
      </AppContext.Provider>
    )
  }

  ;
}

export default App;

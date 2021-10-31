import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab';
import { LIST_VIEW } from './utility';
const items = [
  {
    id: 1,
    titile: "去云南旅游",
    price: 400,
    date: "2018-10-10",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "ios-plane"
    }
  },
  {
    id: 2,
    titile: "去云南旅游",
    price: 200,
    date: "2018-10-10",
    category: {
      id: "1",
      name: "旅行",
      type: "outcome",
      iconName: "ios-plane"
    }
  }
]

class App extends React.Component {
  function
  render () {
    return (
      <div className="App" >
        <ViewTab activeTab={LIST_VIEW} onTabChange={() => { }}></ViewTab>
        <PriceList items={items} onModifyItem={(item) => {
          alert("添加")
        }}
          onDeleteItem={item => {
            alert("删除")
          }}></PriceList>
      </div>
    )
  }

  ;
}

export default App;

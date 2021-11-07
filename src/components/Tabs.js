//重构标签页，实现组件复用
//UI结构通过props.children接收
//拆分子结构通过React.children.map(this.props.children,(child,index)=>{})
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Tabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: this.props.activeIndex
    }
  }
  onTabChange = (event, value) => {
    event.preventDefault()
    this.setState({
      activeIndex: value
    })
    this.props.onTabChange(value)
  }
  render () {
    console.log(this.props.children);
    //可以得到items
    const { children } = this.props
    return (

      <React.Fragment>
        <ul className="nav nav-tabs nav-fill my-4">
          {React.Children.map(children, (child, index) => {
            return (
              <li className="nav-item">
                <a className={(index === this.activeIndex) ? 'nav-link active' : 'nav-link'} href="#" onClick={(event) => {
                  this.onTabChange(event, index)
                }}>{child}</a>
              </li>
            )
          })}
        </ul>

      </React.Fragment>
    )

  }

}

export const Tab = ({ children }) => {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired,
}
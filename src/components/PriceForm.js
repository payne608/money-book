import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { isValidDate } from '../utility'

// {
//   "title": "新的吃饭",
//   "price": 2000,
//   "date": "2021-11-15",
//   "monthCategory": "2021-11",
//   "id": "_qmatbbw11",
//   "cid": "6",
//   "timestamp": 1542896269187
// },
class PriceForm extends Component {
  state = {
    validatePass: true,
    errorMessage: '',
  }
  sumbitForm (event) {
    const { item, onFormSubmit } = this.props
    const editMode = !!item.id
    const price = this.priceInput.value.trim() * 1
    const date = this.dateInput.value.trim()
    const title = this.titleInput.value.trim()
    //用排除法来做
    //手下如果price不符合，然后date不符合，最后title不符合
    if (price && date && title) {
      if (price < 0) {
        this.setState({
          validatePass: false,
          errorMessage: '价格数字必须大于0'
        })
      } else if (!isValidDate(date)) {
        this.setState({
          validatePass: false,
          errorMessage: '请填写正确的日期格式'
        })
      } else {
        this.setState({
          validatePass: true,
          errorMessage: ''
        })
        //有id的则为修改
        if (editMode) {
          //通过editMode区分提交和修改
          onFormSubmit({ id: item.id, title, price, date }, editMode)
        } else {
          //无id的为创建
          onFormSubmit({ title, price, date }, editMode)
        }
      }
    } else {
      this.setState({
        validatePass: false,
        errorMessage: '请输入所有必选项'
      })
    }
    event.preventDefault()
  }
  render () {
    const { title, price, date } = this.props.item

    return (
      <React.Fragment>
        <form onSubmit={(event) => { this.sumbitForm(event) }}>
          <div className="form-group">
            <label for="title">标题 *</label>
            <input
              type="text"
              id="title" placeholder="请输入金额"
              defaultValue={title}
              className="form-control"
              ref={(input) => { this.titleInput = input }}
            ></input>
          </div>
          <div className="form-group">
            <label for="money">金额 *</label>
            <input
              type="number"
              id="money" placeholder="请输入标题"
              defaultValue={price}
              className="form-control"
              ref={(input) => { this.priceInput = input }
              }></input>

          </div>
          <div className="form-group">
            <label for="date">日期 *</label>
            <input
              type="date"
              id="date" placeholder="请输入价格"
              className="form-control"
              defaultValue={date}
              ref={(input) => { this.dateInput = input }}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary mt-2 mr-3">提交</button>
          <button className="btn btn-secondary mt-2" onClick={this.props.onCancelSubmit}>取消</button>
          {!this.state.validatePass &&
            <div className="alert alert-danger mt-5" role="alert">
              {this.state.errorMessage}
            </div>
          }
        </form>
      </React.Fragment >
    )
  }


}
PriceForm.protypes = {
  item: Proptypes.object,
  onFormSubmit: Proptypes.func.isRequired,
  onCancelSubmit: Proptypes.func.isRequired
}
PriceForm.defaultProps = {
  item: {}
}



export default PriceForm






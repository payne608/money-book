import React from 'react'
import PropTypes from 'prop-types'
const TotalPrice = ({ income, outcome }) => (
  <div className="col">
    <div className="row mb-3">
      <h5 className="sm income">收入：<span>{income}元</span></h5>
    </div>
    <div className="row">
      <h5 className="sm outcome">支出：<span>{outcome}元</span></h5>
    </div>
  </div>
)

TotalPrice.propTypes = {
  income: PropTypes.number.isRequired,
  outcome: PropTypes.number.isRequired,
}
export default TotalPrice
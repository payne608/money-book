import React, { Component } from 'react'
import Proptypes from 'prop-types'

class PriceForm extends Component {




}
PriceForm.protypes = {
  item: Proptypes.object.isRequired,
  onFormSubmit: Proptypes.func.isRequired,
  onCancelSubmit: Proptypes.func.isRequired
}

export default PriceForm






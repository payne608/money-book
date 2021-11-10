import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'
import { Colors } from '../utility'

const CreateBtn = ({ onClick }) => (
  <button
    className="btn btn-block d-flex justify-content-center align-items-center"
    onClick={(e) => { onClick() }}
    style={{ backgroundColor: Colors.blue }}
  >
    <Ionicon
      className="rounded-circle"
      fontSize="30px"
      color='#fff'
      icon='ios-add-circle'
    />
    <div className="sm">创建一条新的记账记录</div>
  </button>
)

CreateBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
}
export default CreateBtn
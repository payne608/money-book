import React, { Component } from 'react'
import { Colors } from '../utility'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

class CategorySelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategory: this.props.selectedCategory
    }
  }

  render () {
    const { categories, selectedCategory, onSelectCategory } = this.props
    return (
      <div>
        <div className="row">
          {categories.map(category => {
            return (
              <div className="col-3">
                <Ionicon
                  className="rounded-circle"
                  fontSize="30px"
                  style={{ backgroundColor: Colors.green, padding: '5px' }}
                  color={'#fff'}
                  icon={category.iconNamec}
                />
              </div>
            )

          })}


        </div>

      </div>

    )
  }

}
CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,

}
export default CategorySelect
// {
//   props.categories.map(category => {
//     return (
//       <Ionicon
//         className="rounded-circle"
//         style={{ backgroundColor: bac }}
//       >

//       </Ionicon>
//     )
//   })
// }
import React, { Component } from 'react'
import { Colors } from '../utility'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

class CategorySelect extends Component {
  render () {
    const { categories, selectedCategory, onSelectCategory } = this.props
    const selectedCategoryId = selectedCategory && selectedCategory.id
    console.log(selectedCategory);
    return (
      <div className="category-select-component">
        <div className="row">
          {categories.map(category => {
            const iconColor = (category.id === selectedCategoryId) ? Colors.white : Colors.gray
            const backColor = (category.id === selectedCategoryId) ? Colors.blue : Colors.lightGray
            return (
              <div className="col-3" style={{ textAlign: 'center' }} onClick={(event) => { this.props.onSelectCategory(category) }}>
                <Ionicon
                  className="rounded-circle"
                  fontSize="50px"
                  style={{ backgroundColor: backColor, padding: '5px' }}
                  color={iconColor}
                  icon={category.iconName}
                />
                <p>{category.name}</p>
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
  selectedCategory: PropTypes.object.isRequired,
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
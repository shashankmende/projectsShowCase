import './index.css'

const Select = props => {
  const {categoryList} = props
  const {id, displayText} = categoryList

  return <option value={id}>{displayText}</option>
}

export default Select

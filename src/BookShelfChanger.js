import React from 'react'
import PropTypes from 'prop-types'

function BookShelfChanger({ handleUpdate, currentShelf }) {

	const handleChange = (event) => {
    handleUpdate(event.target.value)
	};

	return (
    <div className="book-shelf-changer">
	      <select
	      	onChange={handleChange}
	      	value={currentShelf || "none"}>
	        <option value="move" disabled>Move to...</option>
	        <option value="currentlyReading">Currently Reading</option>
	        <option value="wantToRead">Want to Read</option>
	        <option value="read">Read</option>
	        <option value="none">None</option>
	      </select>
	    </div>
	)
}

BookShelfChanger.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  currentShelf: PropTypes.string
}


export default BookShelfChanger;

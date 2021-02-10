import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
    handleUpdate: PropTypes.func.isRequired,
    currentShelf: PropTypes.string
  }

	handleChange = (event) => {
    this.props.handleUpdate(event.target.value)
	};

	render() {
		const { currentShelf } = this.props

		return (
	    <div className="book-shelf-changer">
		      <select
		      	onChange={this.handleChange}
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
}

export default BookShelfChanger;

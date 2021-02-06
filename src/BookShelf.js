import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
	displayableShelfName(shelfName) {
		if (shelfName === "currentlyReading") {
			return "Currently Reading" 
		} else if (shelfName === "wantToRead") {
			return "Want to Read"
		} else {
			return "Read"
		}
	}

	render() {
		const {shelfName, books} = this.props;

		return (
	    <div className="bookshelf">
	      <h2 className="bookshelf-title">{this.displayableShelfName(shelfName)}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	        { books.map((book) => (
	        	<Book book={book} />
	        ))}
	        </ol>
	      </div>
	    </div>
		)
	}
}

export default BookShelf;
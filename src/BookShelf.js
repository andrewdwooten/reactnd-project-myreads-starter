import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
	displayableShelfName(shelfName) {
		if (shelfName === "currentlyReading") {
			return "Currently Reading" 
		} else if (shelfName === "wantToRead") {
			return "Want to Read"
		} else if (shelfName === "read") {
			return "Read"
		} else {
			return "Search Results"
		}
	}

	render() {
		const {shelfName, books, handleBookUpdate} = this.props;

		return (
	    <div className="bookshelf">
	      <h2 className="bookshelf-title">{this.displayableShelfName(shelfName)}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
	        { books.map((book) => (
	        	<Book book={book} key={book.id} handleBookUpdate={handleBookUpdate} />
	        ))}
	        </ol>
	      </div>
	    </div>
		)
	}
}

export default BookShelf;
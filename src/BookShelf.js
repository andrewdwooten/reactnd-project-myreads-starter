import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

function BookShelf({ shelfName, books, handleBookUpdate }) {

	const displayableShelfName = (shelfName) => {
		if (shelfName === "currentlyReading") {
			return "Currently Reading";
		} else if (shelfName === "wantToRead") {
			return "Want to Read";
		} else if (shelfName === "read") {
			return "Read";
		} else {
			return "Search Results";
		}
	}

	return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{displayableShelfName(shelfName)}</h2>
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

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleBookUpdate: PropTypes.func.isRequired
}

export default BookShelf;

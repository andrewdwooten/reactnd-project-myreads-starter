import React from 'react'
import BookShelfChanger from './BookShelfChanger'
import PropTypes from 'prop-types'


function Book({ book, handleBookUpdate }) {

	const	moveBookToShelf = (shelfName) => {
		handleBookUpdate(book, shelfName);
	}

	return (
 		<li>
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLink})` }}></div>
					<BookShelfChanger handleUpdate={moveBookToShelf} currentShelf={book.shelf} />
			  </div>
			  <div className="book-title">{book.title}</div>
			  { book.authors.map((authorName) => (
					  <div key={authorName} className="book-authors">{authorName}</div>
		  	))}
			</div>
		</li>
	)
}

Book.propTypes = {
    book: PropTypes.shape({
    	id: PropTypes.string.isRequired,
    	shelf: PropTypes.string,
    	authors: PropTypes.array.isRequired,
    	title: PropTypes.string.isRequired,
    	imageLink: PropTypes.string.isRequired
    }).isRequired,
    handleBookUpdate: PropTypes.func.isRequired
}

export default Book;

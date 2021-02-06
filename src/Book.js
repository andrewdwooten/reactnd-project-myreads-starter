import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {

	moveBookToShelf = (shelfName) => {
		this.props.handleBookUpdate(this.props.book, shelfName)
	}

	render() {
		const { book } = this.props

		return (
	 		<li>
				<div className="book">
				  <div className="book-top">
				    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLink})` }}></div>
						<BookShelfChanger handleUpdate={this.moveBookToShelf} currentShelf={book.shelf} />
				  </div>
				  <div className="book-title">{book.title}</div>
				  { book.authors.map((authorName) => (
						  <div key={authorName} className="book-authors">{authorName}</div>
			  	))}
				</div>
			</li>
		)
	}
}

export default Book;
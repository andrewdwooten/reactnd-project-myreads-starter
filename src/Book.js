import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
	state = {
		bookData: { authors: [],
								title: '',
								imageLink: '',
								id: '',
								shelf: ''}
	}

	moveBookToShelf = (shelfName) => {
		this.props.handleBookUpdate({id: this.props.book.id}, shelfName);
		this.setState(prevState => {
			prevState.bookData.shelf = shelfName
		});
	}

	filterBookData(book) {
		return {
			authors: book.authors || [],
			title: book.title,
			imageLink: 'imageLinks' in book ? book.imageLinks.thumbnail : '',
			id: book.id,
			shelf: book.shelf
		}
	}

	componentDidMount() {
		 BooksAPI.get(this.props.book.id).then((book) => {
			this.setState(() => ({
				bookData: this.filterBookData(book)
			}))
		});
	}

	render() {
		const { book } = this.props
		const { bookData } = this.state

		return (
	 		<li>
				<div className="book">
				  <div className="book-top">
				    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookData.imageLink})` }}></div>
						<BookShelfChanger handleUpdate={this.moveBookToShelf} currentShelf={bookData.shelf} />
				  </div>
				  <div className="book-title">{bookData.title}</div>
				  { bookData.authors.map((authorName) => (
						  <div key={authorName} className="book-authors">{authorName}</div>
			  	))}
				</div>
			</li>
		)
	}
}

export default Book;
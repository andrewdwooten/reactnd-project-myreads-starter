import React from 'react'
import BookShelfChanger from './BookShelfChanger'
function Book( { book } ) {
	return (
 		<li>
			<div className="book">
			  <div className="book-top">
			    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLink})` }}></div>
					<BookShelfChanger />
			  </div>
			  <div className="book-title">{book.title}</div>
			  { book.authors.map((authorName) => (
					  <div key={authorName} className="book-authors">{authorName}</div>
		  	))}
			</div>
		</li>
	)
}

export default Book;
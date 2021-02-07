import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchForm from './SearchForm'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: this.filterBookResponse(books)
      }))
    })
  }

  filterBookResponse(books) {
   return books.map((book) => (
            { shelf: book.shelf,
              authors: book.authors || [],
              title:  book.title,
              imageLink: book.imageLinks.thumbnail,
              id: book.id }
          ))
  }

  booksForShelf(shelfName) {
    return this.state.books.filter( book => book.shelf === shelfName)
  }

  findBookById(id) {
    return this.state.books.filter(book => book.id === id)[0]
  }

  updateBookStatePosition(book, shelfName) {
   let index = this.state.books.indexOf(this.findBookById(book.id))
   let updatedBook = Object.assign(book, {shelf: shelfName})

    this.setState(prevState => {
      const books = [...prevState.books];
      books[index] = updatedBook
      return { books };
    });
  }

  updateBooksShelf = (book, shelfName) => {
    BooksAPI.update(book, shelfName)
      .then(() => {
        this.updateBookStatePosition(book, shelfName)
      })
  }

  render() {
    const shelves = ["currentlyReading", "wantToRead", "read"]

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchForm filterResults={this.filterBookResponse}/>
        )} />

        <Route exact path='/' render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { shelves.map((shelf) => (
                  <BookShelf key={shelf} shelfName={shelf} books={this.booksForShelf(shelf)} handleBookUpdate={this.updateBooksShelf} />
                ))}
              </div>
            </div>
            <Link
              className="open-search"
              to="/search">
            </Link>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp

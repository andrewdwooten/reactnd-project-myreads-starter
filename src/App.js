import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchForm from './SearchForm'
import './App.css'

class BooksApp extends React.Component {
  state = {
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
              id: book.id }
          ))
  }

  booksForShelf(shelfName) {
    return this.state.books.filter( book => book.shelf === shelfName)
  }

  updateBookStatePosition(book, shelfName) {
    let index = this.state.books.findIndex(e => e.id === book.id)
    let bookForState = Object.assign(book, {shelf: shelfName})

    if (index >= 0) {

      this.setState(prevState => {
        const books = [...prevState.books];
        books[index] = bookForState
        return { books };
      });
    } else {
      this.setState((prevState) => ({
        books: [...prevState.books].concat(bookForState)
      }));
    }
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
          <SearchForm filterResults={this.filterBookResponse} handleBookUpdate={this.updateBooksShelf} />
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

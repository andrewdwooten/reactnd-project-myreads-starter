import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchForm from './SearchForm'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: this.filterBookResponse(books)
      }));
    });
  }

  filterBookResponse(books) {
   return books.map((book) => (
            { shelf: book.shelf,
              id: book.id,
              authors: book.authors || [],
              title: book.title,
              imageLink: 'imageLinks' in book ? book.imageLinks.thumbnail : '',
            }
          ));
  }

  buildBook(book) {
    return  { shelf: book.shelf,
              id: book.id,
              authors: book.authors || [],
              title: book.title,
              imageLink: 'imageLinks' in book ? book.imageLinks.thumbnail : '',
            }
  }

  fetchBook(bookId) {
    return BooksAPI.get(bookId);
  }

  booksForShelf(shelfName) {
    return this.state.books.filter( book => book.shelf === shelfName);
  }

  updateBookStatePosition(book, shelfName) {
    let index = this.state.books.findIndex(e => e.id === book.id);

    this.fetchBook(book.id)
      .then((book) => {
        let bookForState = this.buildBook(book)

        if (index >= 0) {
          this.setState(prevState => {
            const books = [...prevState.books];
            books[index] = this.buildBook(book)
            return { books };
          });
        } else {
          this.setState((prevState) => ({
            books: [...prevState.books].concat(bookForState)
          }));
        }
      })
  }

  updateBooksShelf = (book, shelfName) => {
    BooksAPI.update(book, shelfName)
      .then(() => {
        this.updateBookStatePosition(book, shelfName)
      });
  };

  searchForBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState(() => ({
        searchResults: this.filterBookResponse(books)
      }));
    });
  };

  render() {
    const shelves = ["currentlyReading", "wantToRead", "read"]
    const { searchResults } = this.state

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchForm searchResults={searchResults} handleBookUpdate={this.updateBooksShelf} searchForBooks={this.searchForBooks} />
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

import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchForm extends Component {
  state = {
    results: [],
    query: ''
  }

  handleQuery = (query) => {
    this.setState({query: query});
    this.searchForBooks(query);
  }

  searchForBooks = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        this.handleSearchResults(books)
      })
  }

  handleSearchResults = (books) => {
    if (!books || books.error) {
      this.setState(() => ({
        results: []
      }))
    } else {
      this.setState(() => ({
        results: this.props.filterResults(books)
      }))
    } 
  }

  render() {
    const { query, results } = this.state
    const { handleBookUpdate } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="button close-search"
            to='/'>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <BookShelf key="Search Results" shelfName="Search Results" books={results} handleBookUpdate={handleBookUpdate} />
        { results.length === 0 && (
          <div className="no-results">
          No books found for search term "{query}"
          </div>)}
        </div>
      </div> 
    )
  }
}

export default SearchForm;
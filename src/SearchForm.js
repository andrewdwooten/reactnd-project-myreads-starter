import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchForm extends Component {
  static propTypes = {
    handleBookUpdate: PropTypes.func.isRequired,
    searchForBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  handleQuery = (query) => {
    this.props.searchForBooks(query);
  };

  render() {
    const { query } = this.state
    const { handleBookUpdate, searchResults } = this.props

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
        <BookShelf key="Search Results" shelfName="Search Results" books={searchResults} handleBookUpdate={handleBookUpdate} />
        { this.props.searchResults.length === 0 && (
          <div className="no-results">
          No books found for search term "{query}"
          </div>)}
        </div>
      </div>
    )
  }
}

export default SearchForm;

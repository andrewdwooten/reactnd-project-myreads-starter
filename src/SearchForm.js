import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [],
                   query: ''
                 }

    this.handleResultShelfChange = this.handleResultShelfChange.bind(this);
  }

  static propTypes = {
    filterResults: PropTypes.func.isRequired,
    handleBookUpdate: PropTypes.func.isRequired,
    searchForBooks: PropTypes.func.isRequired
  }

  handleQuery = (query) => {
    this.setState({query: query});
    this.props.searchForBooks(query).then((books) => {
      this.handleSearchResults(books)
    });
  };

  handleSearchResults = (books) => {
    if (!books || books.error) {
      this.setState(() => ({
        results: []
      }));
    } else {
      this.setState(() => ({
        results: this.props.filterResults(books)
      }));
    }
  };

  handleResultShelfChange = (book, shelfName) => {
    this.props.handleBookUpdate(book, shelfName);
    this.setState(prevState => {
      const results = [...prevState.results]
      let index = results.findIndex(e => e.id === book.id);
      book.shelf = shelfName
      results[index] = book
      return { results }
    })
  }

  render() {
    const { query, results } = this.state

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
        <BookShelf key="Search Results" shelfName="Search Results" books={results} handleBookUpdate={this.handleResultShelfChange} />
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

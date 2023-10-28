import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SearchBar extends Component {
  state = {
    searchValue: '',
  };

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchValue } = this.state;
    if (searchValue.toLocaleLowerCase().trim() === '') {
      toast.info('oops...need to choose a category');
      return;
    }
    this.props.addedNewSearchValue(searchValue);
    this.reset();
  };

  reset = () => {
    this.setState({ searchValue: '' });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span>
              <AiOutlineSearch size={20} />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name={searchValue}
            value={searchValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  addedNewSearchValue: PropTypes.func.isRequired,
};

export default SearchBar;

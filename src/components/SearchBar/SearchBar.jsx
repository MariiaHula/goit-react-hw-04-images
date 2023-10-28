import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = ({ addedNewSearchValue }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchValue.toLocaleLowerCase().trim() === '') {
      toast.info('oops...need to choose a category');
      return;
    }
    addedNewSearchValue(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  addedNewSearchValue: PropTypes.func.isRequired,
};

export default SearchBar;

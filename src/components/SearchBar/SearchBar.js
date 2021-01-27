import React from 'react';
import './SearchBar.css';
import SearchForm from '../SearchForm/SearchForm';

const SearchBar = ({ onSubmit }) => (
  <div className="search-bar">
    <h1 className="search-bar__text search-bar__text_type_heading">
      Что творится в мире?</h1>
    <p className="search-bar__text">
      Находите самые свежие статьи на любую тему и сохраняйте в своем личном кабинете</p>
    <SearchForm contextClassName="search-bar__form" onSubmit={onSubmit} />
  </div>
);

export default SearchBar;

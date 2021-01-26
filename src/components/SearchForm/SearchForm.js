import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ contextClassName = '', onSubmit }) {
  const [keyword, setKeyword] = useState(() => '');

  return (
    <form className={`${contextClassName} search-form`.trim()} onSubmit={(evt) => {
      evt.preventDefault();
      onSubmit(keyword);
    }}
    >
      <input
        type="text"
        className="search-form__item search-form__item_type_input"
        placeholder="Политика"
        value={keyword}
        onChange={(evt) => {
          setKeyword(() => evt.target.value);
        }}
        required
      />
      <button
        type="submit"
        className="search-form__item search-form__item_type_button"
      >
        Искать
      </button>
    </form>
  )
}

export default SearchForm;

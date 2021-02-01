import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm({ contextClassName = '', onSubmit }) {
  const [keyword, setKeyword] = useState(() => '');
  const [isVisibleFormError, setIsVisibleFormError] = useState(() => false);

  // Define form error class name
  const formErrorClasses = [
    'search-form__item',
    'search-form__item_type_error',
    'search-form__item_visible'
  ];
  const formErrorClassName = isVisibleFormError
    ? formErrorClasses.join(' ')
    : formErrorClasses.slice(0, 2).join(' ');

  return (
    <form
      className={`${contextClassName} search-form`.trim()}
      noValidate
      onSubmit={(evt) => {
        evt.preventDefault();
        setIsVisibleFormError(() => !keyword);
        if (keyword) {
          onSubmit(keyword);
        }
      }}
    >
      <span className={formErrorClassName}>Необходимо ввести ключевое слово</span>
      <input
        type="text"
        className="search-form__item search-form__item_type_input"
        placeholder="Политика"
        value={keyword}
        onChange={(evt) => {
          setKeyword(() => evt.target.value);
        }}
      />
      <button type="submit" className="search-form__item search-form__item_type_button">
        Искать
      </button>
    </form>
  )
}

export default SearchForm;

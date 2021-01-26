import React from 'react';
import './Library.css';

function Library(props) {
  const {
    component: Component,
    items,
    itemProps,
    pageID,
    onButton
  } = props;

  // [Functions]
  const getLibraryContent = () => {
    if (!items.length) {
      return (
        <>
          <div className="library__icon" />
          <h2 className="library__heading">Ничего не найдено</h2>
          <span className="library__msg">
            К сожалению, по вашему запросу ничего не найдено.</span>
        </>
      );
    }
    // Base state
    return (
      <>
        <h2 className={`library__heading library__heading_page_${pageID}`}>
          Результаты поиска</h2>
        <ul className="library__items">
          {items.map((item, index) => (
            <li key={index}>
              <Component item={item} {...itemProps} />
            </li>
          ))}
        </ul>
        {onButton && (
          <button type="button" className="library__button" onClick={onButton}>
            Показать еще</button>
        )}
      </>
    );
  }

  return (
    <section className={`library library_page_${pageID}`}>{getLibraryContent()}</section>
  );
}

export default Library;

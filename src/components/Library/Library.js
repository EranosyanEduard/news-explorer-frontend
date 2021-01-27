import React from 'react';
import './Library.css';

function Library(props) {
  const {
    component: Component,
    headingText,
    items,
    itemProps,
    onButton
  } = props;

  return (
    <section className="library">
      <ul className="library__items">
        {items.map((item, index) => (
          <li key={index}>
            <Component item={item} {...itemProps} />
          </li>
        ))}
      </ul>
      {headingText && <h2 className="library__heading">{headingText}</h2>}
      {onButton && (
        <button type="button" className="library__button" onClick={onButton}>
          Показать еще</button>
      )}
    </section>
  );
}

export default Library;

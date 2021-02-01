import React, { useState } from 'react';
import './Card.css';

function Card(props) {
  const {
    buttonType,
    isDisplayedKeyword,
    item,
    loggedIn,
    tip,
    onAddCard,
    onOpenPopup,
    onRemoveCard
  } = props;

  const {
    date,
    _id: cardID,
    image,
    isActive,
    keyword,
    link,
    order,
    source,
    text,
    title
  } = item;

  // [Variables]
  const [isOpenTip, setIsOpenTip] = useState(() => false);

  // [Props]
  // Define card button props
  const [buttonActiveClassName, onButton] = {
    mark: ['card__button_active_mark', loggedIn
      ? () => {
        if (isActive) {
          onRemoveCard(cardID);
        } else {
          onAddCard({ date, image, keyword, link, source, text, title }, order);
        }
      }
      : onOpenPopup
    ],
    remove: ['', () => onRemoveCard(cardID)]
  }[buttonType];

  const buttonClassName = [
    'card__button',
    `card__button_type_${buttonType}`,
    isActive ? buttonActiveClassName : ''
  ].join(' ').trim();

  // Define creation item date
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const dateObj = new Date(date);
  const humanDate = [
    dateObj.getDate(), `${months[dateObj.getMonth()]},`, dateObj.getFullYear()
  ].join(' ');

  // [Functions]
  const toggleTipState = () => setIsOpenTip((prevState) => !prevState);

  return (
    <div className="card" onClick={() => window.location.assign(link)}>
      <img src={image} alt="Изображение" className="card__image" />
      <div className="card__box card__box_with_info">
        <span className="card__info card__info_type_date">{humanDate}</span>
        <h3 className="card__text card__text_type_heading">{title}</h3>
        <p className="card__text">{text}</p>
        <span className="card__info card__info_type_source">{source}</span>
      </div>
      <div className="card__box card__box_with_bar">
        <button
          type="button"
          className={buttonClassName}
          onClick={(evt) => {
            evt.stopPropagation();
            onButton();
          }}
          onMouseOver={toggleTipState}
          onMouseOut={toggleTipState}
        />
        {/* Define need to render a button and a tip */}
        {isDisplayedKeyword && (
          <span className="card__tip card__tip_type_keyword">{keyword}</span>
        )}
        {tip && (() => {
          const tipClasses = [
            'card__tip', 'card__tip_type_tooltip', 'card__tip_open'
          ];
          const tipClassName = isOpenTip
            ? tipClasses.join(' ')
            : tipClasses.slice(0, 2).join(' ');
          return (<span className={tipClassName}>{tip}</span>);
        })()}
      </div>
    </div>
  );
}

export default Card;

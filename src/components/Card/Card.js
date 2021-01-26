import React, { useState } from 'react';
import './Card.css';

function Card(props) {
  const {
    buttonType,
    isDisplayedKeyword,
    item,
    tip,
    onButton
  } = props;

  const {
    description,
    keyword,
    publishedAt,
    source,
    title,
    url,
    urlToImage
  } = item;

  // [Variables]
  const [isActiveMarkButton, setIsActiveMarkButton] = useState(() => false);
  const [isOpenTip, setIsOpenTip] = useState(() => false);

  // [Props]
  // Define card button props
  const [cardButtonActiveClassName, onCardButton] = {
    mark: [
      isActiveMarkButton ? 'card__button_active_mark' : '',
      () => {
        setIsActiveMarkButton((prevState) => !prevState);
        onButton(item);
      }
    ],
    remove: ['', () => onButton()]
  }[buttonType];
  const cardButtonClassName = [
    'card__button',
    `card__button_type_${buttonType}`,
    cardButtonActiveClassName
  ].join(' ').trim();

  // Define creation item date
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const date = new Date(publishedAt);
  const humanDate = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;

  // [Functions]
  const toggleTipState = () => setIsOpenTip((prevState) => !prevState);

  return (
    <a className="card" href={url}>
      <img
        src={urlToImage}
        alt="Изображение"
        className="card__image"
      />
      <div className="card__box card__box_with_info">
        <span className="card__info card__info_type_date">{humanDate}</span>
        <h3 className="card__text card__text_type_heading">{title}</h3>
        <p className="card__text">{description}</p>
        <span className="card__info card__info_type_source">{source.name}</span>
      </div>
      <div className="card__box card__box_with_bar">
        {isDisplayedKeyword && (
          <span className="card__tip card__tip_type_keyword">{keyword}</span>
        )}
        {tip && (
          <span className={
            `card__tip card__tip_type_tooltip ${isOpenTip ? 'card__tip_open' : ''}`.trim()
          }>{tip}</span>
        )}
        <button
          type="button"
          className={cardButtonClassName}
          onClick={(evt) => {
            evt.preventDefault();
            onCardButton();
          }}
          onMouseOver={toggleTipState}
          onMouseOut={toggleTipState}
        />
      </div>
    </a>
  );
}

export default Card;

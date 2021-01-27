import React from 'react';
import BoxWithTip from '../BoxWithTip/BoxWithTip';

function SearchTip({ tipType }) {
  const [headingText, iconType, tipText] = {
    error: [
      'Ошибка',
      'error',
      'К сожалению, во время запроса произошла ошибка. ' +
      'Пожалуйста, попробуйте еще раз позже.'
    ],
    notFound: [
      'Ничего не найдено',
      'search',
      'К сожалению, по вашему запросу ничего не найдено.'
    ]
  }[tipType];

  return (
    <BoxWithTip headingText={headingText} iconType={iconType} tipText={tipText} />
  );
}

export default SearchTip;

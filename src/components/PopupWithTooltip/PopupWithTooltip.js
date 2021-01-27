import React from 'react';
import PopupWithBox from '../PopupWithBox/PopupWithBox';

function PopupWithTooltip({ tooltipID, ...others }) {
  const [headingContent, redirectButtonContent] = {
    'sign-up': ['Пользователь успешно зарегистрирован!', 'Войти']
  }[tooltipID];

  return (
    <PopupWithBox
      content={<span className="popup__heading">{headingContent}</span>}
      contentID="tooltip"
      isDisplayedCloseButtonOnMobile={true}
      redirectButtonContent={redirectButtonContent}
      theme="light"
      {...others}
    />
  );
}

export default PopupWithTooltip;

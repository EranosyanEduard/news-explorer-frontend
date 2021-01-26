import React from 'react';
import './PopupWithBox.css';

function PopupWithBox(props) {
  const {
    content,
    contentID,
    hasAnimation,
    isDisplayedCloseButtonOnMobile,
    isOpen,
    redirectButtonContent,
    theme,
    onClose,
    onRedirectButton
  } = props;

  // Define class names
  // 0. Popup and popup box
  const popupClasses = [
    'popup',
    `popup_with_${contentID}`,
    'popup_open'
  ];
  const popupBoxClasses = [
    'popup__box',
    `popup__box_theme_${theme}`,
    `popup__box_with_${contentID}`,
    hasAnimation ? `popup__box_animation-to_${contentID}` : ''
  ];
  const [popupClassName, popupBoxClassName] = isOpen
    ? [
      popupClasses.join(' '),
      popupBoxClasses.join(' ').trim()
    ]
    : [
      popupClasses.slice(0, 2).join(' '),
      popupBoxClasses.slice(0, 3).join(' ')
    ];
  // 1. Popup close button
  const closeButtonClassName = [
    'popup__close-btn',
    isDisplayedCloseButtonOnMobile ? '' : 'popup__close-btn_display-toggle'
  ].join(' ').trim();

  return (
    <div className={popupClassName} tabIndex="-1" onClick={onClose} onKeyDown={(evt) => {
      if (evt.key === 'Escape') onClose();
    }}
    >
      <div className={popupBoxClassName} onClick={(evt) => evt.stopPropagation()}>
        {content}
        <button type="button" className={closeButtonClassName} onClick={onClose} />
        {redirectButtonContent && (
          <button
            type="button"
            className={`popup__redirect-btn popup__redirect-btn_context_${contentID}`}
            onClick={onRedirectButton}
          >
            {redirectButtonContent}
          </button>
        )}
      </div>
    </div>
  );
}

export default PopupWithBox;

import React from 'react';
import './AccountInfo.css';

function AccountInfo({ headingText, keywordContent }) {
  return (
    <div className="account">
      <span className="account__text account__text_type_subheading">
        Сохраненные статьи
      </span>
      <h1 className="account__text account__text_type_heading">{headingText}</h1>
      <p className="account__text">{keywordContent}</p>
    </div>
  );
}

export default AccountInfo;

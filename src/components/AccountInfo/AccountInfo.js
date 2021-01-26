import React from 'react';
import './AccountInfo.css';

function AccountInfo(props) {
  return (
    <div className="account">
      <span className="account__text account__text_type_subheading">
        Сохраненные статьи
      </span>
      <h1 className="account__text account__text_type_heading">
        Грета, у вас 5 сохраненных статей
      </h1>
      <p className="account__text">
        По ключевым словам: Природа, Тайга и 2 другим
      </p>
    </div>
  );
}

export default AccountInfo;

import React from 'react';
import './BoxWithTip.css';

const BoxWithTip = ({ headingText, iconType, tipText }) => (
  <div className="tip">
    <div className={`tip__icon tip__icon_type_${iconType}`} />
    <h2 className="tip__text tip__text_type_heading">{headingText}</h2>
    <p className="tip__text tip__text_type_tip">{tipText}</p>
  </div>
);

export default BoxWithTip;

import React from 'react';
import PopupWithBox from '../PopupWithBox/PopupWithBox';
import BarWithNav from '../BarWithNav/BarWithNav';

const PopupWithBar = ({ barWithNavProps, ...others }) => (
  <PopupWithBox
    {...others}
    content={<BarWithNav {...barWithNavProps} />}
    contentID="navbar"
    theme="dark"
  />
);

export default PopupWithBar;

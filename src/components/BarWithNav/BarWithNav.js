import React from 'react';
import './BarWithNav.css';
import NavBar from '../NavBar/NavBar';

const BarWithNav = ({ buttonType, navbarProps, theme, onButton }) => (
  <div className={`bar bar_theme_${theme}`}>
    <span className="bar__logo">NewsExplorer</span>
    <button
      type="button"
      className={`bar__button bar__button_type_${buttonType}-${theme}`}
      onClick={onButton}
    />
    <NavBar contextClassName="bar__nav" {...navbarProps} />
  </div>
);

export default BarWithNav;

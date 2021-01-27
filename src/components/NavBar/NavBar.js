import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
  const {
    buttonContent,
    contextClassName = '',
    isDisplayedOnMobile,
    links,
    onButton
  } = props;

  const navbarClassName = [
    contextClassName,
    'navbar',
    isDisplayedOnMobile ? '' : 'navbar_display-toggle'
  ].join(' ').trim();

  return (
    <div className={navbarClassName}>
      <nav className="navbar__nav">
        <ul className="navbar__items">
          {links.map(({ text, to, onClick }, index) => (
            <li key={index}>
              <NavLink
                exact to={to}
                className="navbar__link"
                activeClassName="navbar__link_active"
                onClick={onClick}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button type="button" className="navbar__button" onClick={onButton}>
        {buttonContent}
      </button>
    </div>
  );
}

export default NavBar;

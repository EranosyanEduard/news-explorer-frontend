import React from 'react';
import './Header.css';
import BarWithNav from '../BarWithNav/BarWithNav';

const Header = ({ barWithNavProps, lastElementChild, pageID }) => (
  <header className={`page__area page__area_id_header header header_page_${pageID}`}>
    <BarWithNav {...barWithNavProps} />
    {lastElementChild}
  </header>
);

export default Header;

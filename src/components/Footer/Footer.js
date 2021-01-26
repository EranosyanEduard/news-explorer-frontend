import React from 'react';
import './Footer.css';
import ListWithLinks from '../ListWithLinks/ListWithLinks';

function Footer() {
  const getFormattedLinks = (links, type) => (
    links.map(({ className = '', ...otherProps }) => ({
      ...otherProps,
      className: `footer__link footer__link_type_${type} ${className}`.trim()
    }))
  );

  const navbarLinks = [
    { text: 'Главная', to: '/', target: '_self' },
    { text: 'Яндекс.Практикум', to: 'https://praktikum.yandex.ru/' }
  ];
  const iconBarLinks = [
    { className: 'footer__link_icon_gh', to: 'https://github.com/' },
    { className: 'footer__link_icon_fb', to: 'https://www.facebook.com/' }
  ];

  return (
    <footer className={`page__area page__area_id_footer footer`}>
      <ListWithLinks
        listClassName="footer__links footer__links_bar_nav"
        links={getFormattedLinks(navbarLinks, 'text')}
      />
      <ListWithLinks
        listClassName="footer__links footer__links_bar_icon"
        links={getFormattedLinks(iconBarLinks, 'icon')}
      />
      <span className="footer__info">&copy; 2021 NE, Powered by NewsAPI</span>
    </footer>
  );
}

export default Footer;

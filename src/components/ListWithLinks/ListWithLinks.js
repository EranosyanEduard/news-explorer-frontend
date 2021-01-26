import React from 'react';

const ListWithLinks = ({ listClassName = '', links = [] }) => (
  <ul className={listClassName}>
    {links.map((link, index) => {
      const {
        className = '',
        target = '_blank',
        text = '',
        to = '/'
      } = link;

      return <li key={index}>
        <a
          className={className}
          href={to}
          rel="noreferrer"
          target={target}
        >
          {text}
        </a>
      </li>
    })}
  </ul>
);

export default ListWithLinks;

import React from 'react';
import './Content.css';
import Library from '../Library/Library';

const Content = ({ libraryProps, pageID }) => (
  <main className={`page__area page__area_id_content content content_page_${pageID}`}>
    <Library {...libraryProps} />
  </main>
);

export default Content;

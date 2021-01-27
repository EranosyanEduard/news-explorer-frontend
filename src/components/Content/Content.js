import React from 'react';
import './Content.css';
import Library from '../Library/Library';
import Preloader from '../Preloader/Preloader';
import SearchTip from '../SearchTip/SearchTip';

const Content = ({ isFoundError, isOpenPreloader, libraryProps, pageID }) => (
  <main className={`page__area page__area_id_content content content_page_${pageID}`}>
    {(() => {
      if (isOpenPreloader) {
        return <Preloader />;
      }
      if (isFoundError) {
        return <SearchTip tipType="error" />;
      }
      if (!libraryProps.items.length) {
        return <SearchTip tipType="notFound" />
      }
      return <Library {...libraryProps} />;
    })()}
  </main>
);

export default Content;

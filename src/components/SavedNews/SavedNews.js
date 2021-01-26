import React from 'react';
import Page from '../Page/Page';
import AccountInfo from '../AccountInfo/AccountInfo';

const SavedNews = ({ news, ...pageProps }) => (
  <Page
    {...pageProps}
    lastElementChildToHeader={<AccountInfo />}
    libraryProps={{ items: news }}
    pageID="news"
    pageTheme="light"
  />
);

export default SavedNews;

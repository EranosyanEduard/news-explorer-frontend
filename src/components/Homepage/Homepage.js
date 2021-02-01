import React, { useEffect, useState } from 'react';
import Page from '../Page/Page';
import SearchBar from '../SearchBar/SearchBar';
import PopupWithSignForm from '../PopupWithSignForm/PopupWithSignForm';
import PopupWithTooltip from '../PopupWithTooltip/PopupWithTooltip';

function Homepage(props) {
  const {
    // Values
    isOpenPopupWithLoginForm,
    isOpenPopupWithRegisterForm,
    isOpenPopupWithTooltip,
    isSearchStateToggle,
    loggedIn,
    news,
    // Handlers
    closeAllPopups,
    onLogin,
    onRegister,
    openPopupWithLoginForm,
    openPopupWithRegisterForm,
    searchNews,
    // Others
    ...pageProps
  } = props;

  // [Variables]
  const baseNewsLimit = 3;
  const [currentNewsLimit, setCurrentNewsLimit] = useState(() => 0);

  useEffect(() => setCurrentNewsLimit(() => baseNewsLimit), [isSearchStateToggle]);

  // [Functions]
  const getLibraryProps = () => {
    if (!Array.isArray(news)) {
      return { items: null };
    }
    return {
      headingText: 'Результаты поиска',
      items: news.slice(0, currentNewsLimit),
      onAddMoreCards: news.length > currentNewsLimit
        ? () => setCurrentNewsLimit((prevState) => prevState + baseNewsLimit)
        : null
    }
  };
  const getRedirectButtonHandler = (onRedirectButton) => () => {
    closeAllPopups();
    onRedirectButton();
  };

  return (
    <Page
      {...pageProps}
      lastElementChildToHeader={<SearchBar onSubmit={searchNews} />}
      lastElementChildToPage={(
        <>
          <PopupWithSignForm
            formID="sign-in"
            isOpen={isOpenPopupWithLoginForm}
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithRegisterForm)}
            onSubmit={onLogin}
          />
          <PopupWithSignForm
            formID="sign-up"
            isOpen={isOpenPopupWithRegisterForm}
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithLoginForm)}
            onSubmit={onRegister}
          />
          <PopupWithTooltip
            isOpen={isOpenPopupWithTooltip}
            tooltipID="sign-up"
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithLoginForm)}
          />
        </>
      )}
      libraryProps={getLibraryProps()}
      loggedIn={loggedIn}
      pageID="home"
      pageTheme="dark"
      closeAllPopups={closeAllPopups}
      openPopupWithLoginForm={openPopupWithLoginForm}
    />
  );
}

export default Homepage;

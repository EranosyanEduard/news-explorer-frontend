import React, { useEffect, useState } from 'react';
import Page from '../Page/Page';
import SearchBar from '../SearchBar/SearchBar';
import PopupWithSignForm from '../PopupWithSignForm/PopupWithSignForm';
import PopupWithTooltip from '../PopupWithTooltip/PopupWithTooltip';

function Homepage(props) {
  const {
    // Values
    isOpenPopupWithSignInForm,
    isOpenPopupWithSignUpForm,
    isOpenPopupWithTooltip,
    loggedIn,
    news,
    // Handlers
    openPopupWithSignInForm,
    openPopupWithSignUpForm,
    registerUser,
    searchNews,
    closeAllPopups,
    ...pageProps
  } = props;

  // [Variables]
  const baseNewsLimit = 3;
  const [currentNewsLimit, setCurrentNewsLimit] = useState(() => 0);

  useEffect(() => {
    if (Array.isArray(news) && news.length) {
      setCurrentNewsLimit(() => baseNewsLimit);
    }
  }, [news]);

  // [Functions]
  const getLibraryProps = () => {
    if (!Array.isArray(news)) {
      return { items: null };
    }
    return {
      headingText: 'Результаты поиска',
      items: news.slice(0, currentNewsLimit),
      itemProps: {
        buttonType: 'markButton',
        tip: !loggedIn ? 'Войдите, чтобы сохранять статьи' : 'Добавить в сохраненные'
      },
      onButton: news.length > currentNewsLimit
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
            isOpen={isOpenPopupWithSignInForm}
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithSignUpForm)}
          />
          <PopupWithSignForm
            formID="sign-up"
            isOpen={isOpenPopupWithSignUpForm}
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithSignInForm)}
            onSubmit={registerUser}
          />
          <PopupWithTooltip
            isOpen={isOpenPopupWithTooltip}
            tooltipID="sign-up"
            onClose={closeAllPopups}
            onRedirectButton={getRedirectButtonHandler(openPopupWithSignInForm)}
          />
        </>
      )}
      libraryProps={getLibraryProps()}
      loggedIn={loggedIn}
      pageID="home"
      pageTheme="dark"
      closeAllPopups={closeAllPopups}
    />
  );
}

export default Homepage;

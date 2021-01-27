import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import SavedNews from '../SavedNews/SavedNews';
import newsApi from '../../utils/newsApi';
import mainApi from '../../utils/mainApi';

function App() {
  // [Variables]
  const history = useHistory();
  const [foundNews, setFoundNews] = useState(() => null);
  const [isFoundSearchError, setIsFoundSearchError] = useState(() => false);
  const [isOpenPreloader, setIsOpenPreloader] = useState(() => false);
  const [loggedIn, setLoggedIn] = useState(() => true);
  const [savedNews, setSavedNews] = useState(() => null);
  const [userEmail, setUserEmail] = useState(() => '');
  // Popups state
  const [isOpenPopupWithBar, setIsOpenPopupWithBar] = useState(() => false);
  const [isOpenPopupWithSignInForm, setIsOpenPopupWithSignInForm] = useState(() => false);
  const [isOpenPopupWithSignUpForm, setIsOpenPopupWithSignUpForm] = useState(() => false);
  const [isOpenPopupWithTooltip, setIsOpenPopupWithTooltip] = useState(() => false);

  useEffect(() => {
    if (Array.isArray(foundNews)) {
      localStorage.setItem(
        'foundNews', JSON.stringify(foundNews.length ? foundNews : null)
      );
    } else {
      setFoundNews(() => JSON.parse(localStorage.getItem('foundNews')));
    }
  }, [foundNews]);

  // [Functions]
  const closeAllPopups = () => {
    setIsOpenPopupWithBar(() => false);
    setIsOpenPopupWithSignInForm(() => false);
    setIsOpenPopupWithSignUpForm(() => false);
    setIsOpenPopupWithTooltip(() => false);
  };
  const addNews = (item) => {
    setSavedNews((prevState) => Array.isArray(prevState) ? [item, ...prevState] : [item]);
  };
  const handleUserLogout = () => {
    closeAllPopups();
    history.push('/');
    setLoggedIn((prevState) => !prevState);
  };
  const openPopupWithBar = () => {
    setIsOpenPopupWithBar((prevState) => !prevState);
  };
  const openPopupWithSignInForm = () => {
    setIsOpenPopupWithSignInForm(() => true);
  };
  const openPopupWithSignUpForm = () => {
    setIsOpenPopupWithSignUpForm(() => true);
  };
  const registerUser = (userInfo, setIsVisibleError) => {
    mainApi
      .registerUser(userInfo, ({ email }) => {
        setUserEmail(() => email);
        closeAllPopups();
        setIsOpenPopupWithTooltip(() => true);
      })
      .catch(() => {
        setIsVisibleError(() => true);
      });
  };
  const searchNews = (keyword) => {
    setIsOpenPreloader(() => true);
    newsApi
      .searchArticles(keyword, ({ articles }) => {
        setIsOpenPreloader(() => false);
        setFoundNews(() => articles.map((article) => ({
          keyword: keyword[0].toUpperCase().concat(keyword.slice(1)),
          ...article
        })));
      })
      .catch(() => {
        setIsOpenPreloader(() => false);
        setIsFoundSearchError(() => true);
      });
  };

  // [Props]
  const pageProps = {
    // Values
    isOpenOnePopup: isOpenPopupWithBar
      || isOpenPopupWithSignInForm
      || isOpenPopupWithSignUpForm
      || isOpenPopupWithTooltip,
    isFoundSearchError,
    isOpenPopupWithBar,
    isOpenPreloader,
    loggedIn,
    // Handlers
    closeAllPopups,
    handleAuthButton: loggedIn ? handleUserLogout : () => {
      closeAllPopups();
      openPopupWithSignInForm();
    },
    openPopupWithBar
  };

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Homepage
            {...pageProps}
            handleCardButton={addNews}
            news={foundNews}
            isOpenPopupWithSignInForm={isOpenPopupWithSignInForm}
            isOpenPopupWithSignUpForm={isOpenPopupWithSignUpForm}
            isOpenPopupWithTooltip={isOpenPopupWithTooltip}
            openPopupWithSignInForm={openPopupWithSignInForm}
            openPopupWithSignUpForm={openPopupWithSignUpForm}
            registerUser={registerUser}
            searchNews={searchNews}
          />
        </Route>
        <Route exact path="/saved-news">
          <SavedNews
            {...pageProps}
            news={savedNews}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;

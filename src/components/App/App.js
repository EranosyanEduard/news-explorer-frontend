import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import SavedNews from '../SavedNews/SavedNews';
import newsApi from '../../utils/newsApi';
import mainApi from '../../utils/mainApi';

function App() {
  // [Variables]
  const history = useHistory();
  const [foundNews, setFoundNews] = useState(() => null);
  const [loggedIn, setLoggedIn] = useState(() => true);
  const [savedNews, setSavedNews] = useState(() => null);
  const [userEmail, setUserEmail] = useState(() => '');
  // Popups state
  const [isOpenPopupWithBar, setIsOpenPopupWithBar] = useState(() => false);
  const [isOpenPopupWithSignInForm, setIsOpenPopupWithSignInForm] = useState(() => false);
  const [isOpenPopupWithSignUpForm, setIsOpenPopupWithSignUpForm] = useState(() => false);
  const [isOpenPopupWithTooltip, setIsOpenPopupWithTooltip] = useState(() => false);

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
    newsApi
      .searchArticles(keyword, ({ articles }) => {
        setFoundNews(() => articles.map((article) => ({
          keyword: keyword[0].toUpperCase().concat(keyword.slice(1)),
          ...article
        })));
      })
      .catch(console.log);
  };

  // [Props]
  const pageProps = {
    // Values
    isOpenOnePopup: isOpenPopupWithBar
      || isOpenPopupWithSignInForm
      || isOpenPopupWithSignUpForm
      || isOpenPopupWithTooltip,
    isOpenPopupWithBar,
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

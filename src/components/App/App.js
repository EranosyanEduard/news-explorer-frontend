import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import isURL from 'validator/es/lib/isURL';
import CurrentUser from '../../contexts/currentUser';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Homepage from '../Homepage/Homepage';
import SavedNews from '../SavedNews/SavedNews';
import newsApi from '../../utils/newsApi';
import mainApi from '../../utils/mainApi';
import { ERRORS } from '../../utils/utils';

function App() {
  // [Variables]
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(() => ({}));
  const [foundNews, setFoundNews] = useState(() => null);
  const [savedNews, setSavedNews] = useState(() => null);
  const [isFoundSearchError, setIsFoundSearchError] = useState(() => false);
  const [isOpenPreloader, setIsOpenPreloader] = useState(() => false);
  const [isSearchStateToggle, setIsSearchStateToggle] = useState(() => false)
  const [loggedIn, setLoggedIn] = useState(() => false);
  // Popups state
  const [isOpenPopupWithBar, setIsOpenPopupWithBar] = useState(() => false);
  const [isOpenPopupWithLoginForm, setIsOpenPopupWithLoginForm] = useState(() => false);
  const [isOpenPopupWithRegisterForm, setIsOpenPopupWithRegisterForm] = useState(() => false);
  const [isOpenPopupWithTooltip, setIsOpenPopupWithTooltip] = useState(() => false);

  // Effects
  useEffect(() => {
    mainApi.setJWT();
    Promise.all([
      mainApi
        .getCredential(({ email, name }) => setCurrentUser(() => ({ email, name }))),
      mainApi
        .getNews((articles) => setSavedNews(() => articles.length ? articles : null))
    ])
      .then(() => setLoggedIn(() => true))
      .catch((err) => console.error(ERRORS.unauthorized, err));
  }, []);
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
  // Popup handlers
  const closeAllPopups = () => {
    setIsOpenPopupWithBar(() => false);
    setIsOpenPopupWithLoginForm(() => false);
    setIsOpenPopupWithRegisterForm(() => false);
    setIsOpenPopupWithTooltip(() => false);
  };
  const openPopupWithBar = () => setIsOpenPopupWithBar((prevState) => !prevState);
  const openPopupWithLoginForm = () => setIsOpenPopupWithLoginForm(() => true);
  const openPopupWithRegisterForm = () => setIsOpenPopupWithRegisterForm(() => true);
  // Api handlers
  const onLogin = (userInfo, setIsVisibleError) => {
    mainApi
      .authorizeUser(userInfo, ({ token }) => {
        closeAllPopups();
        localStorage.setItem('jwt', token);
        mainApi.setJWT();
        mainApi
          .getCredential(({ email, name }) => (
            setCurrentUser(() => ({ email, name }))
          ))
          .catch((err) => console.error(ERRORS.getCredential, err));
        setLoggedIn(() => true);
      })
      .catch(() => setIsVisibleError(() => true));
  };
  const onRegister = (userInfo, setIsVisibleError) => {
    mainApi
      .registerUser(userInfo, () => {
        closeAllPopups();
        setIsOpenPopupWithTooltip(() => true);
      })
      .catch(() => setIsVisibleError(() => true));
  };
  const addNews = (article, articleOrder) => {
    mainApi
      .addNews(article, (newArticle) => {
        setSavedNews((prevState) => Array.isArray(prevState)
          ? [newArticle, ...prevState]
          : [newArticle]
        );
        setFoundNews((prevState) => prevState.map((news) => (
          news.order === articleOrder
            ? { ...newArticle, isActive: true }
            : news
        )));
      })
      .catch((err) => console.error(ERRORS.addNews, err));
  };
  const removeNews = (articleID) => {
    mainApi
      .removeNews(articleID, ({ message }) => {
        setSavedNews((prevState) => {
          const news = prevState.filter((article) => article._id !== articleID);
          return news.length ? news : null;
        });
        setFoundNews((prevState) => prevState.map((article) => (
          article._id === articleID
            ? { ...article, _id: null, isActive: false }
            : article
        )));
        console.log(message);
      })
      .catch((err) => console.error(ERRORS.removeNews, err));
  };
  const searchNews = (keyword) => {
    setIsOpenPreloader(() => true);
    newsApi
      .searchArticles(keyword, ({ articles }) => {
        setIsOpenPreloader(() => false);
        setFoundNews(() => articles.map((article, index) => {
          const {
            description, publishedAt, source, title, url, urlToImage
          } = article;

          return {
            date: publishedAt,
            _id: null,
            image: isURL(urlToImage || '')
              ? urlToImage
              : 'http://emptyLinkToImage.ru',
            isActive: false,
            keyword: keyword[0].toUpperCase().concat(keyword.slice(1)),
            link: url,
            order: index,
            source: source.name,
            text: description,
            title
          };
        }));
        setIsSearchStateToggle((prevState) => !prevState);
      })
      .catch(() => {
        setIsOpenPreloader(() => false);
        setIsFoundSearchError(() => true);
      });
  };
  // Other handlers
  const onSignOut = () => {
    closeAllPopups();
    history.push('/');
    setLoggedIn(() => false);
  };

  // [Props]
  const pageProps = {
    // Values
    isFoundSearchError,
    isOpenOnePopup: isOpenPopupWithBar
      || isOpenPopupWithLoginForm
      || isOpenPopupWithRegisterForm
      || isOpenPopupWithTooltip,
    isOpenPopupWithBar,
    isOpenPreloader,
    loggedIn,
    // Handlers
    closeAllPopups,
    onAuthButton: loggedIn ? onSignOut : () => {
      closeAllPopups();
      openPopupWithLoginForm();
    },
    onAddCard: addNews,
    onRemoveCard: removeNews,
    openPopupWithBar,
    openPopupWithLoginForm
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Homepage
            {...pageProps}
            news={foundNews}
            isOpenPopupWithLoginForm={isOpenPopupWithLoginForm}
            isOpenPopupWithRegisterForm={isOpenPopupWithRegisterForm}
            isOpenPopupWithTooltip={isOpenPopupWithTooltip}
            isSearchStateToggle={isSearchStateToggle}
            openPopupWithRegisterForm={openPopupWithRegisterForm}
            onLogin={onLogin}
            onRegister={onRegister}
            searchNews={searchNews}
          />
        </Route>
        <ProtectedRoute
          {...pageProps}
          component={SavedNews}
          news={savedNews}
          path="/saved-news"
        />
      </Switch>
    </CurrentUser.Provider>
  );
}

export default App;

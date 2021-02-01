import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import isURL from 'validator/es/lib/isURL';
import CurrentUser from '../../contexts/currentUser';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Homepage from '../Homepage/Homepage';
import SavedNews from '../SavedNews/SavedNews';
import newsApi from '../../utils/newsApi';
import mainApi from '../../utils/mainApi';
import { errors } from '../../utils/utils';

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
  const [isOpenPopupWithSignInForm, setIsOpenPopupWithSignInForm] = useState(() => false);
  const [isOpenPopupWithSignUpForm, setIsOpenPopupWithSignUpForm] = useState(() => false);
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
      .catch((err) => console.error(errors.unauthorized, err));
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
    setIsOpenPopupWithSignInForm(() => false);
    setIsOpenPopupWithSignUpForm(() => false);
    setIsOpenPopupWithTooltip(() => false);
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
  // Api handlers
  const authorizeUser = (userInfo, setIsVisibleError) => {
    mainApi
      .authorizeUser(userInfo, ({ token }) => {
        closeAllPopups();
        localStorage.setItem('jwt', token);
        mainApi.setJWT();
        mainApi
          .getCredential(({ email, name }) => (
            setCurrentUser(() => ({ email, name }))
          ))
          .catch((err) => console.error(errors.getCredential, err));
        setLoggedIn(() => true);
      })
      .catch(() => setIsVisibleError(() => true));
  };
  const registerUser = (userInfo, setIsVisibleError) => {
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
      .catch((err) => console.error(errors.addNews, err));
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
      .catch((err) => console.error(errors.removeNews, err));
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
  const handleUserLogout = () => {
    closeAllPopups();
    history.push('/');
    setLoggedIn(() => false);
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
    handleMarkCard: addNews,
    handleRemoveCard: removeNews,
    openPopupWithBar
  };

  return (
    <CurrentUser.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <Homepage
            {...pageProps}
            news={foundNews}
            isOpenPopupWithSignInForm={isOpenPopupWithSignInForm}
            isOpenPopupWithSignUpForm={isOpenPopupWithSignUpForm}
            isOpenPopupWithTooltip={isOpenPopupWithTooltip}
            isSearchStateToggle={isSearchStateToggle}
            openPopupWithSignInForm={openPopupWithSignInForm}
            openPopupWithSignUpForm={openPopupWithSignUpForm}
            authorizeUser={authorizeUser}
            registerUser={registerUser}
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

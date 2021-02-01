import React, { useContext } from 'react';
import CurrentUser from '../../contexts/currentUser';
import './Page.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Card from '../Card/Card';
import Author from '../Author/Author';
import Footer from '../Footer/Footer';
import PopupWithBar from '../PopupWithBar/PopupWithBar';

function Page(props) {
  const {
    // Values
    isFoundSearchError,
    isOpenOnePopup,
    isOpenPopupWithBar,
    isOpenPreloader,
    lastElementChildToHeader,
    lastElementChildToPage,
    libraryProps,
    loggedIn,
    pageID,
    pageTheme,
    // Handlers
    closeAllPopups,
    onAuthButton,
    onAddCard,
    onRemoveCard,
    openPopupWithBar,
    openPopupWithLoginForm
  } = props;

  // [Variables]
  const { name } = useContext(CurrentUser);

  // [Functions]
  const getBarWithNavProps = (isPopupItem, theme = pageTheme) => {
    // Define menu button props
    const [menuButtonType, onMenuButton] = isOpenOnePopup
      ? ['close', closeAllPopups]
      : ['open', openPopupWithBar];

    // Define navbar props
    const baseLinks = [
      { text: 'Главная', to: '/' },
      { text: 'Сохраненные статьи', to: '/saved-news' }
    ];
    const [activeLinks, authButtonContent] = loggedIn
      ? [
        baseLinks,
        <>{name}<span className={`navbar__logout navbar__logout_theme_${theme}`} /></>
      ]
      : [[baseLinks[0]], 'Авторизоваться'];

    return {
      buttonType: menuButtonType,
      navbarProps: {
        buttonContent: authButtonContent,
        isDisplayedOnMobile: isPopupItem,
        links: activeLinks.map((link) => ({ ...link, onClick: closeAllPopups })),
        onButton: onAuthButton
      },
      theme,
      onButton: onMenuButton
    }
  };
  const getLibraryProps = () => {
    // Define card button props
    const [buttonType, isDisplayedKeyword, tip] = {
      home: ['mark', false, !loggedIn ? 'Войдите, чтобы сохранять статьи' : null],
      news: ['remove', true, 'Убрать из сохраненных']
    }[pageID];

    return {
      ...libraryProps,
      component: Card,
      itemProps: {
        buttonType,
        isDisplayedKeyword,
        loggedIn,
        tip,
        onAddCard,
        onOpenPopup: openPopupWithLoginForm,
        onRemoveCard
      }
    }
  };

  return (
    <div className={`page ${isOpenOnePopup ? 'page_scroll_off' : ''}`.trim()}>
      <Header
        barWithNavProps={getBarWithNavProps(false)}
        lastElementChild={lastElementChildToHeader}
        pageID={pageID}
      />
      {Array.isArray(libraryProps.items) && (
        <Content
          isFoundError={isFoundSearchError}
          isOpenPreloader={isOpenPreloader}
          libraryProps={getLibraryProps()}
          pageID={pageID}
        />
      )}
      <Author />
      <Footer />
      <PopupWithBar
        isOpen={isOpenPopupWithBar}
        barWithNavProps={getBarWithNavProps(true, 'dark')}
        onClose={closeAllPopups}
      />
      {lastElementChildToPage}
    </div>
  );
}

export default Page;

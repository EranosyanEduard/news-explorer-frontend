const ERRORS = {
  addNews: 'AddNewsError: при сохранении статьи произошла ошибка!',
  getNews: 'GetNewsError: при получении статей произошла ошибка!',
  removeNews: 'RemoveNewsError: при удалении статьи произошла ошибка!',
  getCredential: 'CredentialError: при получении учетных данных произошла ошибка!',
  unauthorized: 'Unauthorized: необходимо авторизоваться в приложении!'
};

const MAIN_API_DATA = {
  headers: {
    'content-type': 'application/json'
  },
  url: 'https://api.news-explorer.ml'
};

const NEWS_API_DATA = {
  apiKey: '58d4de35065741718269dcb3d204c8d0',
  language: 'ru',
  limitMs: 7 * 24 * 3600000, // Calculate ms per week
  pageSize: 100,
  sortBy: 'publishedAt',
  url: 'https://nomoreparties.co/news/v2/everything'
};

export { ERRORS, MAIN_API_DATA, NEWS_API_DATA };

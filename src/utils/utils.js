const mainApiData = {
  headers: {
    'content-type': 'application/json'
  },
  url: 'https://api.news-explorer.ml'
};

const newsApiData = {
  apiKey: '58d4de35065741718269dcb3d204c8d0',
  language: 'ru',
  limitMs: 7 * 24 * 3600000, // Calculate ms per week
  pageSize: 100,
  sortBy: 'publishedAt',
  url: 'http://newsapi.org/v2/everything'
};

export { mainApiData, newsApiData };

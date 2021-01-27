import api from './api';
import { newsApiData } from './utils';

class newsApi extends api {
  constructor({ apiKey, url }) {
    super(url);
    this.key = apiKey;
  }

  _sendSearchRequest(keyword) {
    return fetch(`${this.url}?q=${keyword}&apiKey=${this.key}`);
  }

  searchArticles(keyword, handler) {
    return this._handleResponse(
      this._sendSearchRequest(keyword),
      handler
    );
  }
}

export default new newsApi(newsApiData);

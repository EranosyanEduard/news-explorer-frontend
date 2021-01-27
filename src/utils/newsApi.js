import api from './api';
import { newsApiData } from './utils';

class newsApi extends api {
  constructor({ apiKey, language, limitMs, pageSize, sortBy, url }) {
    super(url);
    this.apiKey = apiKey;
    this.language = language;
    this.limitMs = limitMs;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
  }

  _sendSearchRequest(keyword) {
    const currentDateMs = Date.now();
    const reqParams = [
      `q=${keyword}`,
      `from=${new Date(currentDateMs - this.limitMs).toISOString()}`,
      `to=${new Date(currentDateMs).toISOString()}`,
      `language=${this.language}`,
      `sortBy=${this.sortBy}`,
      `pageSize=${this.pageSize}`,
      `apiKey=${this.apiKey}`
    ];
    return fetch(`${this.url}?${reqParams.join('&')}`);
  }

  searchArticles(keyword, handler) {
    return this._handleResponse(
      this._sendSearchRequest(keyword),
      handler
    );
  }
}

export default new newsApi(newsApiData);

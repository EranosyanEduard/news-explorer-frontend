import Api from './api';
import { MAIN_API_DATA } from './utils';

class MainApi extends Api {
  constructor({ headers, url }) {
    super(url);
    this.headers = headers;
  }

  _sendAuthorizeRequest(userInfo) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userInfo)
    });
  }

  _sendCredentialRequest() {
    return fetch(`${this.url}/users/me`, { headers: this.headers });
  }

  _sendRegisterRequest(userInfo) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userInfo)
    });
  }

  _sendAddingNewsRequest(article) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(article)
    });
  }

  _sendNewsRequest() {
    return fetch(`${this.url}/articles`, { headers: this.headers });
  }

  _sendRemovingNewsRequest(articleID) {
    return fetch(`${this.url}/articles/${articleID}`, {
      method: 'DELETE',
      headers: this.headers
    });
  }

  authorizeUser(userInfo, handler) {
    return this._handleResponse(
      this._sendAuthorizeRequest(userInfo),
      handler
    );
  }

  getCredential(handler) {
    return this._handleResponse(
      this._sendCredentialRequest(),
      handler
    );
  }

  registerUser(userInfo, handler) {
    return this._handleResponse(
      this._sendRegisterRequest(userInfo),
      handler
    );
  }

  addNews(article, handler) {
    return this._handleResponse(
      this._sendAddingNewsRequest(article),
      handler
    );
  }

  getNews(handler) {
    return this._handleResponse(
      this._sendNewsRequest(),
      handler
    );
  }

  removeNews(articleID, handler) {
    return this._handleResponse(
      this._sendRemovingNewsRequest(articleID),
      handler
    );
  }

  setJWT() {
    this.headers = {
      ...this.headers,
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    };
  }
}

export default new MainApi(MAIN_API_DATA);

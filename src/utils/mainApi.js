import api from './api';
import { mainApiData } from './utils';

class mainApi extends api {
  constructor({ headers, url }) {
    super(url);
    this.headers = headers;
  }

  _sendRegisterRequest(userInfo) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(userInfo)
    })
  }

  registerUser(userInfo, handler) {
    return this._handleResponse(
      this._sendRegisterRequest(userInfo),
      handler
    );
  }
}

export default new mainApi(mainApiData);

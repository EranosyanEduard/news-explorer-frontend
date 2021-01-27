class api {
  constructor(url) {
    this.url = url;
  }

  _handleResponse(response, responseHandler) {
    return response
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(responseHandler);
  }
}

export default api;

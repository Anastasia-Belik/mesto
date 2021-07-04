export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then(res => this._getResponseData(res))
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(res => this._getResponseData(res))
  }

  updateUserInfo(inputValues) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(inputValues)
    })
      .then(res => this._getResponseData(res))
  }

  updateAvatar(avatarLink) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(avatarLink)
    })
      .then(res => this._getResponseData(res))
  }

  postNewCard(inputValues) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(inputValues)
    })
      .then(res => this._getResponseData(res))
  }

  deletCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._getResponseData(res))
  }

  putLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
      .then(res => this._getResponseData(res))
  }

  deleteLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(res => this._getResponseData(res))
  }
}

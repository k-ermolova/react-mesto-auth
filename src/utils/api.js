class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _onError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._onError);
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._onError);
  }

  updateAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._onError);
  }

  updateUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._onError);
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._onError);
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._onError);
  }

  putLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._onError);
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(this._onError);
  }
}

export default new Api({
  baseUrl: "https://api.mesto-ermolova.nomoredomains.monster/",
});
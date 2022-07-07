class Api {
  constructor(token) {
    this._baseUrl = "https://api.back-mesto.students.nomoredomains.monster/";
    this._headers = {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  usersMe(JWT) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editDataUser(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editAvatarUser(url) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  changeLike(cardId, isLike) {
    if (isLike) {
      return this.removeLike(cardId);
    } else {
      return this.setLike(cardId);
    }
  }

  setLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  signUp(password, email) {
    return fetch(`${this._baseUrl}signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then(this._checkResponse);
  }

  signIn(password, email) {
    return fetch(`${this._baseUrl}signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        "password": password,
        "email": email
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }).then((data) => {
      this._token = data.token
      return data
    })
  }
}

const token = localStorage.getItem('token');

const api = new Api(token);

export { api, Api };

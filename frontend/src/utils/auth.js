class Auth {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(newUserData) {
    console.log(this._baseUrl);
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: newUserData.email,
        password: newUserData.password,
      }),
    }).then(this._getResponseData);
  }

  login(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    }).then(this._getResponseData);
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}

const auth = new Auth({
  baseUrl: 'http://api.myplace.nomoredomains.rocks',
});

export default auth;
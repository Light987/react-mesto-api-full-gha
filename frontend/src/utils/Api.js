import {configApi} from './constants.js';

class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Что-то пошло не так: ${res.status}`)
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            mode: 'no-cors',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    patchUserInfo({name, about}) {
        return fetch(`${this._url}/users/me`, {
            mode: 'no-cors',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            mode: 'no-cors',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
            .then(this._checkResponse)
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            mode: 'no-cors',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    postCard({name, link}) {
        return fetch(`${this._url}/cards`, {
            mode: 'no-cors',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            mode: 'no-cors',
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    putLike(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            mode: 'no-cors',
            method: `${isLiked ? "PUT" : "DELETE"}`,
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

}

const api = new Api(configApi)

export default api
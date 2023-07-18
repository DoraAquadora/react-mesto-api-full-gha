class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  //получаем id и после отображаем
  proceedFromServer() {
    return Promise.all([this.getInitialCards(), this.getUserObj()])
  }


  getUserObj() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkRes)
  }

 
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._checkRes)
  }

  // редактирование
  changeUserObj(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkRes)
  }


  createCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkRes)
  }


  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkRes)
  }



  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
      }).then(this._checkRes)
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      }).then(this._checkRes)
    }
  }

  changeAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this._checkRes)
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: "cb509dca-886f-481d-bcb8-759a1762ab1b",
    'Content-Type': 'application/json',
  },
})

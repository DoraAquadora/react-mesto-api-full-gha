export const BASE_URL = 'https://api.mesto-saperov.nomoredomains.monster'

class Auth {
  constructor({ url }) {
    this._url = url
  }

  checkRes(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  signUp = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this.checkRes(res)
    })
  }

  signIn = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return this.checkRes(res)
    })
  }

  checkToken = (data) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data}`,
      },
    }).then((res) => {
      return this.checkRes(res)
    })
  }
}

export const auth = new Auth({ BASE_URL })

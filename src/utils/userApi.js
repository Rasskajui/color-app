export const BASE_URL = 'https://api.color-app.ru';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (body) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: body.password,
          email: body.email,
          username: body.username,
        })
    })
    .then(checkResponse)
};

export const login = (body) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: body.password,
          email: body.email
        })
        }
    )
    .then(checkResponse)
    .then((data) => {
      localStorage.setItem('token', data.token);
      return data;
    })
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      }
  )
  .then(checkResponse)
}

export const updateUserInfo = (newUserInfo) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(newUserInfo)
  })
  .then(checkResponse);
}

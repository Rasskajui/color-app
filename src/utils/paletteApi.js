export const BASE_URL = 'https://api.color-app.ru';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getUserPalettes = () => {
    return fetch(`${BASE_URL}/palettes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(checkResponse);
}

export const savePalette = (palette) => {
    return fetch(`${BASE_URL}/palettes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(palette)
    })
    .then(checkResponse);
}

export const updatePalette = (paletteId, palette) => {
    return fetch(`${BASE_URL}/palettes/${paletteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(palette)
    })
    .then(checkResponse);
}

export const deletePalette = (paletteId) => {
    return fetch(`${BASE_URL}/palettes/${paletteId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(checkResponse);
}
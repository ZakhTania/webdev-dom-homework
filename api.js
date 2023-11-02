import { sanitizeHtml } from './helper.js';
import { token } from './renderLoginPage.js';
const commentsURL = 'https://wedev-api.sky.pro/api/v2/tanya-zakharova/comments';
const userURL = 'https://wedev-api.sky.pro/api/user';

export function getComments() {
    return fetch(commentsURL, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`Кажется, что-то пошло не так, попробуйте позже`);
        }
    });
}

export function postComment({ text }) {
    return fetch(commentsURL, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: sanitizeHtml(text),
        }),
    }).then((response) => {
        if (response.status === 500) {
            throw new Error(`Ошибка сервера`);
        } else if (response.status === 400) {
            throw new Error(`
            Имя и комментарий должны быть
                 не короче 3х символов`);
        } else {
            return response.json();
        }
    });
}

export function login({ login, password }) {
    return fetch(`${userURL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный логин или пароль');
            }
            return response.json();
        })
        .catch((error) => {
            console.warn(error);
            return error;
        });
}

export function regisration({ login, name, password }) {
    return fetch(userURL, {
        method: 'POST',
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Пользователь с таким логином уже сущетсвует');
            }
            return response.json();
        })
        .catch((error) => {
            console.warn(error);
            return error;
        });
}

export function deleteComment({ id }) {
    return fetch(`${commentsURL}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json();
    });
}

export function likeComment({ id }) {
    return fetch(`${commentsURL}/${id}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        return response.json();
    });
}

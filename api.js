import { sanitizeHtml } from "./helper.js";


const commentsURL = "https://wedev-api.sky.pro/api/v2/tanya-zakharova/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getComments() {
    return fetch(commentsURL, {
        method: "GET"
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Кажется, что-то пошло не так, попробуйте позже`);
            }
        })
}

export function postComment({ text, name }) {
    return fetch(commentsURL, {
        method: "POST",
        body: JSON.stringify({
            text: sanitizeHtml(text),
            name: sanitizeHtml(name),
            forceError: true,
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error(`Ошибка сервера`);
            } else if (response.status === 400) {
                throw new Error(`Имя и комментарий должны быть не короче 3х символов`);
            } else {
                return response.json();
            }
        })
}

export function login({ login, password }) {
    return fetch(userURL, {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          throw new Error("Неверный логин или пароль");
        }
        return response.json();
      })
      .catch((error) => {
        console.warn(error);
        alert(error.message);
        return error;
      })
  }
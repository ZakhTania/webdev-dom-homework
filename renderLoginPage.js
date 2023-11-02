import { renderMainPage } from './renderMainPage.js';
import { login, regisration } from './api.js';
import { fetchAndRenderComments } from './main.js';
import { sanitizeHtml } from './helper.js';

export let token = window.localStorage.getItem('token');
export let userName = window.localStorage.getItem('userName');
export let isLog = window.localStorage.getItem('isLog');

let reg = false;

export function renderLogin() {
    const appElement = document.getElementById('app');
    const loginHtml = `<div class="container">
                        <div class="authorization-form">
                            <h3 class="authorization-form_title">Форма ${
                                reg ? `регистрации` : `входа`
                            }</h3>
                            ${
                                reg
                                    ? `<input type="text" id="name-input" class="auhtorization-form_input" placeholder="Введите имя" />`
                                    : ``
                            }
                            <input type="text" id="login-input" class="auhtorization-form_input" placeholder="Введите логин" />
                            <input type="password" id="password-input" class="auhtorization-form_input" placeholder="Введите пароль" />
                            <button class="authorization-form_button" id="login-button">${
                                reg ? `Зарегистрироваться` : `Войти`
                            }</button>
                            <a href="#" class="authorization-form_link" id="switch-link">${
                                reg ? `Войти` : `Зарегистрироваться`
                            }</a>
                        </div>
                     </div>`;

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById('login-button');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');
    const linkElement = document.getElementById('switch-link');
    console.log(linkElement);

    linkElement.addEventListener('click', () => {
        reg = !reg;
        renderLogin();
    });

    buttonElement.addEventListener('click', () => {
        function fetchFnc() {
            if (!reg) {
                return login({
                    login: loginInputElement.value,
                    password: passwordInputElement.value,
                }).then((response) => {
                    if (response.message === 'Неверный логин или пароль') {
                        throw new Error(`Неверный логин или пароль. 
                            Повторите попытку.`);
                    }
                    return response;
                });
            }

            if (reg) {
                const nameInputElement = document.getElementById('name-input');
                return regisration({
                    login: sanitizeHtml(loginInputElement.value),
                    name: sanitizeHtml(nameInputElement.value),
                    password: passwordInputElement.value,
                }).then((response) => {
                    if (
                        response.message ===
                        'Пользователь с таким логином уже сущетсвует'
                    ) {
                        throw new Error(`
                        Пользователь с таким логином уже сущетсвует.`);
                    }
                    return response;
                });
            }
        }

        fetchFnc()
            .then((responseData) => {
                window.localStorage.setItem('token', responseData.user.token);
                window.localStorage.setItem('userName', responseData.user.name);
                window.localStorage.setItem('isLog', true);
            })
            .then(() => {
                isLog = window.localStorage.getItem('isLog');
                userName = window.localStorage.getItem('userName');
                token = window.localStorage.getItem('token');
                renderMainPage({ fetchAndRenderComments });
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

import { renderMainPage } from "./renderMainPage.js";
import { regisration, setToken, setUsername } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { renderLogin } from "./renderLoginPage.js";
import { sanitizeHtml } from "./helper.js";

export const renderReg = () => {
    const appElement = document.getElementById("app");

    const loginHtml = `<div class="container">
                        <div class="reg-form">
                            <h3 class="reg-form_title">Форма регистрации</h3>
                            <input type="text" id="name-input" class="reg-form_input" placeholder="Введите имя" />
                            <input type="text" id="login-input" class="reg-form_input" placeholder="Введите логин" />
                            <input type="password" id="password-input" class="reg-form_input" placeholder="Введите пароль" />
                            <button class="reg-form_button" id="reg-button">Зарегистрироваться</button>
                            <a href="#" class="reg-form_link" id="login-page_link">Войти</a>
                        </div>
                     </div>`;

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("reg-button");
    const nameInputElement = document.getElementById("name-input");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const linkElement = document.getElementById("login-page_link")

    buttonElement.addEventListener("click", () => {
        regisration({
            login: sanitizeHtml(loginInputElement.value),
            name: sanitizeHtml(nameInputElement.value),
            password: passwordInputElement.value,
        })
            .then((response) => {
                if (response.message === "Пользователь с таким логином уже сущетсвует") {
                    throw new Error('Пользователь с таким логином уже сущетсвует.');
                }
                return response;
            })
            .then((responseData) => {
                setToken(responseData.user.token);
                setUsername(responseData.user.name);
            })
            .then(() => {

                renderMainPage({ fetchAndRenderComments });
            })
            .catch((error) => {
                alert(error.message);
            })
    })

    linkElement.addEventListener("click", renderLogin);

}
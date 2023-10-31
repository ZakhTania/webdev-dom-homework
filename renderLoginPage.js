import { renderMainPage } from "./renderMainPage.js";
import { login, setToken, setUsername } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { renderReg } from "./renderRegPage.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app");
    const loginHtml = `
    <div class="container">
    <div class="authorization-form">
      <h3 class="authorization-form_title">Форма входа</h3>
        <input type="text" id="login-input" class="auhtorization-form_input" placeholder="Введите логин" />
        <input
          type="password"
          id="password-input"
          class="auhtorization-form_input"
          placeholder="Введите пароль"
        />
      <button class="authorization-form_button" id="login-button">Войти</button>
      <a href="#" class="authorization-form_link" id="register-page_link">Зарегистрироваться</a>
    </div>
    </div>
    `;
    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const linkElement = document.getElementById("register-page_link")

    buttonElement.addEventListener("click", () => {
        login({
            login:loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then((response) => {
                if (response.message === "Неверный логин или пароль") {
                    throw new Error('Неверный логин или пароль. Повторите попытку');
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
    
    linkElement.addEventListener("click", renderReg)

}
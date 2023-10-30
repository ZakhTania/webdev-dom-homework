import { postComment } from "./api.js";
import { renderLogin } from "./renderLoginPage.js";
import { token, userName } from "./api.js";


export const renderMainPage = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");

    const mainPageHtml = `<div class="container">
<div class="loading-comment" id="loading-comments">Загрузка комментариев...</div>
<div id="wrapper_authorization-link"></div>
<ul class="comments">
</ul>
<div id="wrapper-authorization-link">
<p>Чтобы добавить комментарий, <a href="#" id="authorization-link">авторизируйтесь</a></p>
</div>
<div class="loading-comment" id="comment-loading">Комментарий добавляется...</div>
<div class="add-form">
<input type="text" class="add-form-name" placeholder="${userName}" readonly />
<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
<div class="add-form-row">
  <button class="add-form-button">Написать</button>
</div>
</div>`;

    appElement.innerHTML = mainPageHtml;

    const textInputElement = document.querySelector(".add-form-text");
    const btnAddCommentElement = document.querySelector(".add-form-button");
    const addFormElement = document.querySelector(".add-form");
    const authorizationLinkWrapperElement = document.getElementById("wrapper-authorization-link");

    const loadingCommentElement = document.getElementById("comment-loading");
    loadingCommentElement.classList.add("hidden");



    if (token) {
        authorizationLinkWrapperElement.classList.add('hidden');
        addFormElement.classList.remove('hidden');
    } else {
        authorizationLinkWrapperElement.classList.remove('hidden');
        addFormElement.classList.add('hidden');
    }

    fetchAndRenderComments();

    const authorizationLinkElement = document.getElementById("authorization-link");
    authorizationLinkElement.addEventListener("click", () => {
        renderLogin();
    });




    function addComment() {

        addFormElement.classList.add("hidden");
        loadingCommentElement.classList.remove("hidden");

        postComment({ text: textInputElement.value })
            .then(() => {

                fetchAndRenderComments();

            })
            .then(() => {
                textInputElement.value = '';

                btnAddCommentElement.disabled = true;
                addFormElement.classList.remove("hidden");
                loadingCommentElement.classList.add("hidden");

            })
            .catch((error) => {
                addFormElement.classList.remove("hidden");
                loadingCommentElement.classList.add("hidden");

                console.warn(error);

                if (error.message === "Ошибка сервера") {

                    addComment();

                } else if (error.message === "Имя и комментарий должны быть не короче 3х символов") {

                    alert(error.message);

                } else {

                    alert(`Кажется что-то пошло не так, попробуй позже`);

                }
            })

    }


    document.addEventListener("keyup", (event) => {

        if (
            event.code === 'Enter' &&
            textInputElement.value.trim() !== '') {

            addComment();
        }
    })

    document.addEventListener("input", () => {

        if (textInputElement.value.trim() !== '') {

            btnAddCommentElement.disabled = false;

        } else {

            btnAddCommentElement.disabled = true;
        }
    })

    btnAddCommentElement.addEventListener("click", addComment);

    fetchAndRenderComments();
}

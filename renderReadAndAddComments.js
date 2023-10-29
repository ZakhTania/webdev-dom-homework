import { postComment } from "./api.js";

let userName;
export const setUsername = (newUsername) => {
    userName = newUsername;
}

export const renderReadandAddComments = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");

    const renderCommentsReadonlyHtml = `
<div class="container">
<div class="loading-comment" id="loading-comments">Загрузка комментариев...</div>
<div id="wrapper_authorization-link"></div>
<ul class="comments">
</ul>
<div class="loading-comment" id="comment-loading">Комментарий добавляется...</div>
<div class="add-form">
<input type="text" class="add-form-name" placeholder="${userName}" readonly />
<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
<div class="add-form-row">
  <button class="add-form-button">Написать</button>
</div>
</div>
`;
    appElement.innerHTML = renderCommentsReadonlyHtml;


    // const nameInputElement = document.querySelector(".add-form-name");
    const textInputElement = document.querySelector(".add-form-text");
    const btnAddCommentElement = document.querySelector(".add-form-button");
    // const btnDelCommentElement = document.querySelector(".delete-form-button");
    const addFormElement = document.querySelector(".add-form");
    const loadingCommentElement = document.getElementById("comment-loading");
    loadingCommentElement.classList.add("hidden");

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

    // btnDelCommentElement.addEventListener("click", () => {

    //     comments.pop();

    //     renderComments(comments);

    // })

    fetchAndRenderComments();
}
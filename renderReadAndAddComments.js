
let userName;
export const setUsername = (newUsername) => {
    userName = newUsername;
}

export const renderReadandAddComments = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");

    const renderCommentsReadonlyHtml = `
<div class="container">
<ul class="comments">
</ul>
<div class="loading-comment">Комментарий добавляется...</div>
<div class="add-form">
<input type="text" class="add-form-name" placeholder="Введите ваше имя" />
<textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
<div class="add-form-row">
  <button class="add-form-button">Написать</button>
</div>
</div>
<button class="delete-form-button">Удалить последний комментарий</button>
</div>
</div>
`;
    appElement.innerHTML = renderCommentsReadonlyHtml;


    const nameInputElement = document.querySelector(".add-form-name");
    const textInputElement = document.querySelector(".add-form-text");
    const btnAddCommentElement = document.querySelector(".add-form-button");
    const btnDelCommentElement = document.querySelector(".delete-form-button");
    // const addFormElement = document.querySelector(".add-form");
    // const loadingCommentElement = document.querySelector(".loading-comment");


    function addComment() {
        // addFormElement.classList.add("displayHidden");
        // loadingCommentElement.classList.remove("displayHidden");

        postComment({ text: textInputElement.value, name: nameInputElement.value })
            .then(() => {

                fetchAndRenderComments();

            })
            .then(() => {
                nameInputElement.value = '';
                textInputElement.value = '';

                btnAddCommentElement.disabled = true;
            })
            .catch((error) => {
                // addFormElement.classList.remove("displayHidden");
                // loadingCommentElement.classList.add("displayHidden");

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
            nameInputElement.value.trim() !== '' &&
            textInputElement.value.trim() !== '') {

            addComment();
        }
    })

    document.addEventListener("input", () => {

        if (
            nameInputElement.value.trim() !== '' &&
            textInputElement.value.trim() !== ''
        ) {

            btnAddCommentElement.disabled = false;

        } else {

            btnAddCommentElement.disabled = true;
        }
    })

    btnAddCommentElement.addEventListener("click", addComment);

    btnDelCommentElement.addEventListener("click", () => {

        comments.pop();

        renderComments(comments);

    })
    fetchAndRenderComments();
}
import { renderComments } from "./renderComments.js";
import { sanitizeHtml, delay } from "./helper.js";
import { likeComment, token } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { modElement, loaderCommentFeedElement } from "./renderMainPage.js";

export function initAddLikes(comments) {
    const likesButtonElements = document.querySelectorAll(".like-button");

    for (const likesButtonElement of likesButtonElements) {

        if (token) {
            likesButtonElement.disabled = false;
        } else {
            likesButtonElement.disabled = true;
        }

        likesButtonElement.addEventListener('click', event => {
            event.stopPropagation();
            const id = likesButtonElement.dataset.id;
            const index = likesButtonElement.dataset.index;

            comments[index].isLikeLoading = true;
            renderComments(comments);
            delay(2000).then(() => {

                likeComment({ id }).then((result) => {

                    comments[index].isLiked = result.result.isLiked;
                    comments[index].isLikeLoading = false;
                    console.log(comments[index]);

                    fetchAndRenderComments({ loader: loaderCommentFeedElement, waitingElement: modElement });
                })
            });
        })
    }
}

export function initEdit(comments) {
    const editButtonElements = document.querySelectorAll(".edit-button");

    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", event => {

            const index = editButtonElement.dataset.index;
            const textEditElement = document.querySelector(".edit-form-text");

            if (!comments[index].isEdited) {
                comments[index].isEdited = true;
            } else {
                comments[index].isEdited = false;
                comments[index].text = sanitizeHtml(textEditElement.value);
            }

            event.stopPropagation();
            renderComments(comments);
        })
    }
}

export function initQuotingComment(comments) {
    const commentElements = document.querySelectorAll(".comment");
    const textInputElement = document.querySelector(".add-form-text");


    for (const commentElement of commentElements) {

        commentElement.addEventListener('click', () => {

            const index = commentElement.dataset.index;

            const text = `QUOTE_BEGIN${comments[index].name}:
      ${comments[index].text}QUOTE_END`;

            textInputElement.value = text;
        })
    }
}

export function stopEmptyInput() {
    const textareaElements = document.querySelectorAll(".edit-form-text");

    for (const textareaElement of textareaElements) {

        textareaElement.addEventListener('input', () => {

            const btnEditElements = document.querySelectorAll(".edit-button")
            const index = textareaElement.dataset.index;

            if (textareaElement.value.trim() === "") {

                return btnEditElements[index].disabled = true;

            } else {

                return btnEditElements[index].disabled = false;
            }
        })
    }
}

export function stopPropagationForEditInput() {
    const inputEditElements = document.querySelectorAll(".edit-form-text");

    for (const inputEditElement of inputEditElements) {

        inputEditElement.addEventListener("click", event => {

            event.stopPropagation();
        })
        inputEditElement.addEventListener("input", event => {

            event.stopPropagation();
        })
    }
}
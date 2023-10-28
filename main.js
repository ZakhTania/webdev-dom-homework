import { getComments} from "./api.js";
import { renderComments } from "./render.js";
import { dateFormat } from "./helper.js";
import { renderCommentsReadonly } from "./rendeReadonlyComments.js";



// const nameInputElement = document.querySelector(".add-form-name");
// const textInputElement = document.querySelector(".add-form-text");
// const btnAddCommentElement = document.querySelector(".add-form-button");
// const btnDelCommentElement = document.querySelector(".delete-form-button");
// const addFormElement = document.querySelector(".add-form");
// const loadingCommentElement = document.querySelector(".loading-comment");

let comments = [];

export function fetchAndRenderComments() {

    // loadingCommentElement.textContent = "Загрузка комментариев"

    getComments()
        .then((responseDate) => {
            const appComments = responseDate.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    date: dateFormat(comment.date),
                    likesCounter: comment.likes,
                    isLiked: false,
                    isLikeLoading: false,
                    isEdited: false,
                };
            });

            comments = appComments;

            // addFormElement.classList.remove("displayHidden");
            // loadingCommentElement.classList.add("displayHidden");

            renderComments(comments);

        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        })
}

renderCommentsReadonly({fetchAndRenderComments});




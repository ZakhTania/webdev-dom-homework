import { getComments } from "./api.js";
import { dateFormat } from "./helper.js";
import { renderMainPage } from "./renderMainPage.js";
import { renderComments } from "./renderComments.js";

let comments = [];

export function fetchAndRenderComments() {

    getComments()
        .then((responseDate) => {
            const appComments = responseDate.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    text: comment.text,
                    date: dateFormat(comment.date),
                    likesCounter: comment.likes,
                    isLiked: false,
                    isLikeLoading: false,
                    isEdited: false,
                    author: comment.author.name,
                };
            });

            comments = appComments;

            renderComments(comments);

        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        })
}

renderMainPage({ fetchAndRenderComments });




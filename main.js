import { getComments } from "./api.js";
import { renderComments } from "./render.js";
import { dateFormat } from "./helper.js";
import { renderCommentsReadonly } from "./renderReadonlyComments.js";
import { loader } from "./renderReadonlyComments.js";



export let isLoading = true;
let comments = [];

export function fetchAndRenderComments() {


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

            renderComments(comments);
            isLoading = false;
            loader({ isLoading });
            isLoading = true;

        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        })
}

renderCommentsReadonly({ fetchAndRenderComments });




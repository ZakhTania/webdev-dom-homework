import { getComments } from './api.js';
import { format } from 'date-fns';
import { renderMainPage } from './renderMainPage.js';
import { renderComments } from './renderComments.js';

let comments = [];

export function fetchAndRenderComments({ loader, waitingElement }) {
    loader.classList.remove('hidden');
    waitingElement.classList.add('hidden');

    getComments()
        .then((responseDate) => {
            const appComments = responseDate.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    text: comment.text,
                    date: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
                    likesCounter: comment.likes,
                    isLiked: comment.isLiked,
                    isLikeLoading: false,
                    isEdited: false,
                    author: comment.author.name,
                };
            });

            comments = appComments;

            loader.classList.add('hidden');
            waitingElement.classList.remove('hidden');

            renderComments(comments);
        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        });
}

renderMainPage({ fetchAndRenderComments });

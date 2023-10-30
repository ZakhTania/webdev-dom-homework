import { initAddLikes, initEdit, initQuotingComment, stopEmptyInput, stopPropagationForEditInput } from "./events.js";
import { deleteComment, userName} from "./api.js";
import { fetchAndRenderComments } from "./main.js";


export function renderComments(comments) {
  const listElement = document.querySelector(".comments");
  const commentsHtml = comments.map((comment, index) => {

    return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          ${comment.isEdited ?
        `<textarea type="textarea" class="edit-form-text" data-index="${index}" value="">${comment.text}</textarea>` :
        `<div class="comment-text">
                ${comment.text.replaceAll("QUOTE_BEGIN", "<div class='quote'>")
          .replaceAll("QUOTE_END", "</div>")}
                </div>`}
        </div>
        <div class="comment-footer">
          <div class="edit-del-wrapper">${comment.author === userName ?
        `   <button class="edit-button" data-index="${index}">${comment.isEdited ? `Coхранить` : `Редактировать`}</button>
            <button class="delete-button" data-id="${comment.id}">Удалить</button>` :
        ``}
          </div>
          <div class="likes">
            <p class="likes-counter">${comment.likesCounter}</p>
            <button class="like-button ${comment.isLiked ? `-active-like` : ``} ${comment.isLikeLoading ? `-loading-like` : ``}" data-index="${index}"></button>
         </div>
      </div>
      </li>`

  }).join('');

  listElement.innerHTML = commentsHtml;

  initAddLikes(comments);
  initEdit(comments);
  initQuotingComment(comments);
  stopPropagationForEditInput();
  stopEmptyInput();
  
  const deleteButtonsElement = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtonsElement) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log(deleteButton);
      const id = deleteButton.dataset.id;
      console.log(id);

      deleteComment({ id }).then(() => {
        fetchAndRenderComments();
      });
    });
  }

}
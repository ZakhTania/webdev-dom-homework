import { renderLogin } from "./renderLoginPage.js";
import { isLoading } from "./main.js";

export const renderCommentsReadonly = ({ fetchAndRenderComments }) => {

    const appElement = document.getElementById("app");

    const renderCommentsReadonlyHtml = `
<div class="container">
<div class="loading-comment" id="loading-comments">Загрузка комментариев...</div>
<ul class="comments">
</ul>
<div id="wrapper_authorization-link">
<p>Чтобы добавить комментарий, <a href="#" id="authorization-link">авторизируйтесь</a></p>
</div>
`;
    appElement.innerHTML = renderCommentsReadonlyHtml;

    loader({ isLoading });


    fetchAndRenderComments();

    const authorizationLinkElement = document.getElementById("authorization-link");

    authorizationLinkElement.addEventListener("click", () => {
        renderLogin();
    });
}

export const loader = ({ isLoading }) => {
    if (isLoading) {

        document.getElementById("loading-comments").classList.remove('hidden');
        document.getElementById("wrapper_authorization-link").classList.add('hidden');

    } else {

        document.getElementById("loading-comments").classList.add('hidden');
        document.getElementById("wrapper_authorization-link").classList.remove('hidden');

    }

}
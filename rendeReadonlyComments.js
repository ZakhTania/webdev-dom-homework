
export const renderCommentsReadonly = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");

    const renderCommentsReadonlyHtml = `
<div class="container">
<ul class="comments">
</ul>
<div class="wrapper_authorization-link">
<p>Чтобы добавить комментарий, <a href="#" id="authorization-link">авторизируйтесь</a></p>
</div>
`;
    appElement.innerHTML = renderCommentsReadonlyHtml;

    fetchAndRenderComments();


    const authorizationLinkElement = document.getElementById("authorization-link");
    console.log(authorizationLinkElement);

    authorizationLinkElement.addEventListener("click", () => {

    })
 
}
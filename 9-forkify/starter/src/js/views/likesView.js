import { elements } from './base';

export const toggleLikeBtn = isLiked => {
  // icon-heart-outlined đối với recipe không được like
  // icon-heart đối với recipe được like
  const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
  document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = numLikes => {
  elements.likeMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
}

export const renderLike = like => {
  const markup = `
  <li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${like.title}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
  </li>
  `;

  elements.likeList.insertAdjacentHTML('beforeend', markup);
}

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href="#${id}"]`);
  if (el) el.parentElement.removeChild(el);
}

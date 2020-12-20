import Recipe from '../models/Recipe';
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
}

export const clearResults = () => {
  elements.searchResultList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
}

export const highlightSelected = id => {
  const resultArr = Array.from(document.querySelectorAll('.results__link'));
  resultArr.forEach(el => el.classList.remove('results__link--active'));
  document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);

    // return the new title
    return `${newTitle.join(' ')} ...`;
  }
  return title;
}

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
}

// type: 'prev' or 'next'
const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${type == 'prev' ? page - 1 : page + 1}>
      <span>Page ${type == 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
      </svg>
  </button>
`

// đây là private function vì chúng ta sẽ chỉ gọi đến nó trong moduke này mà thôi, mà cụ thể là trong renderResults function
const renderButton = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let button;

  if (page === 1 && pages > 1) {
    // button to go next page
    button = createButton(page, 'next');
  } else if (page < pages) {
    // 2 buttons
    button = `
      ${createButton(page, 'next')}
      ${createButton(page, 'prev')}
    `;
  } else if (page === pages && pages > 1) {
    // button to go to previous page
    button = createButton(page, 'prev');
  }

  // insert button(s) to DOM
  elements.searchResPages.insertAdjacentHTML('afterbegin', button); // container của button for pagination thêm ở base.js
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of current page
  const start = (page - 1) * resPerPage;
  const end = start + resPerPage;
  recipes.slice(start, end).forEach(el => renderRecipe(el));

  // render pagination buttons
  renderButton(page, recipes.length, resPerPage);
}

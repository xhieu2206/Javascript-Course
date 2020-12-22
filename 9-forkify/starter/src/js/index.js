import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';

import { elements, renderLoader, clearLoader } from './views/base';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

/** Global sate of app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {} // init một empty object

// Just for testing
state.likes = new Likes();

const controlSearch = async () => { // do chúng ta sẽ dùng một await promise, ở đây là promise getResults, do đó chúng ta sẽ "nói trước" đây là một async function

  // 1. get the query from the view
  const query = searchView.getInput(); // TODO, tạm thời hardcode

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput(); // clear input
    searchView.clearResults(); // xóa các kết quả cũ trước khi thêm vào các recipes mới.
    renderLoader(elements.searchRes);

    try {
      // 4. Search for recipes
      await state.search.getResults(); // return về một promise do đây là async function (method của Search instance)

      // 5. render the results to UI
      clearLoader(); // remove the loader spinner trước khi hiển thị dữ liệu
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something went wrong when searching :(');
      clearLoader();
    }
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault(); // ngăn trang web load lại
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => { // element container của button, sử dụng với event delegation
  const btn = e.target.closest('.btn-inline'); // sử dụng closest để tìm element mong muốn
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10); // cách để tận dụng data-goto mà chúng ta đã gán cho element, chúng ta sẽ lấy được target page muốn nhảy tới
    searchView.clearResults(); // xóa kết quả cũ và button cũ trên DOM
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
  // get the id from URL
  const id = window.location.hash.replace('#', '');

  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    if (state.search) {
      // highlight the selected recipe
      searchView.highlightSelected(id);
    }

    // create a new Recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader()
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id)); // render nút like button nếu như recipe đã được like
    } catch (err) {
      alert('Something went wrong when processing on recipe :(');
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * List controller
 */
const controlList = () => {
  // create a new List if there is none yet
  if (!state.list) state.list = new List();

  // add each ingridient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
  //
}

/**
 * Like controller
 */
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;

  // user has not liked current recipe
  if (!state.likes.isLiked(currentId)) {
    // add like item to the state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    )

    // toggle like button
    likesView.toggleLikeBtn(true);

    // add like to the UI list
    likesView.renderLike(newLike)

  // user has liked current recipe
  } else {
    // remove like from the state
    state.likes.deleteLike(currentId);

    // toggle the like button
    likesView.toggleLikeBtn(false);

    // remove like to the UI list
    likesView.deleteLike(currentId);
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from the state
    state.list.deleteItem(id);

    // delete from the UI
    listView.deleteItem(id);

    // handle the count update
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

// handing recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-descrease, .btn-descrease *')) { // * có nghĩa là không chỉ element có class như vậy, mà bất cứ element nào là child của những element đó, tương tự với CSS selector
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // add ingredients to the shopping list
    listView.deleteIngredients();
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
  }
  console.log(state.recipe);
});

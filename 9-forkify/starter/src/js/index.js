import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/** Global sate of app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {} // init một empty object

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
      recipeView.renderRecipe(state.recipe);
    } catch (err) {
      alert('Something went wrong when processing on recipe :(');
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
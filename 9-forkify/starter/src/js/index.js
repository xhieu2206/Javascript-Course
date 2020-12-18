import Search from './models/Search';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

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

    // 4. Search for recipes
    await state.search.getResults(); // return về một promise do đây là async function (method của Search instance)

    // 5. render the results to UI
    clearLoader(); // remove the loader spinner trước khi hiển thị dữ liệu
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault(); // ngăn trang web load lại
  controlSearch();
});

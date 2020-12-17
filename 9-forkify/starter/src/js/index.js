import Search from './models/Search';

/** Global sate of app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {} // init một empty object

const controlSearch = async () => { // do chúng ta sẽ dùng một await promise, ở đây là promise getResults, do đó chúng ta sẽ "nói trước" đây là một async function

  // 1. get the query from the view
  const query = 'Pizza'; // TODO, tạm thời hardcode

  if (query) {
    // 2. new search object and add to state
    state.search = new Search(query);

    // 3. prepare UI for results

    // 4. Search for recipes
    await state.search.getResults(); // return về một promise do đây là async function (method của Search instance)

    // 5. render the results to UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault(); // ngăn trang web load lại
  controlSearch();
});

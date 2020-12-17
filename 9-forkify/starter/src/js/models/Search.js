// https://forkify-api.herokuapp.com/api/search?q=pizza

import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() { // async function sẽ hoạt động tương tự với method bình thường của class.
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch (err) {
      alert(err);
    }
  }
}

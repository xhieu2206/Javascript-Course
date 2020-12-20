// https://forkify-api.herokuapp.com/api/get?rId=46943
import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (err) {
      console.log(error)
      alert('Something went wrong :(');
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() { // method để xử lý ingredients
    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map(el => {
      // uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, units[index]);
      });

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng;
      if (unitIndex > -1) {
        // there is an unit
        // Ex. 4 1/2 cups, arrCount = [4, 1/2]
        // Ex. 4 cups, arrCount = [4]
        const arrCount = arrIng.slice(0, unitIndex);
        let count;

        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'));
        } else { // đây là lúc dùng eval, hàm này sẽ evaluate js String như là một JS code, như ở trường hợp này sẽ thực hiện phép tính mà chúng ta muốn
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }

      } else if (parseInt(arrIng[0], 10)) { // example "1 bread", no unit but first element is a number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' ')
        }
      } else if (unitIndex === -1) { // there is NO uni and NO number
        objIng = {
          count: 1,
          unit: '',
          ingredient
        }
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}

import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = []; // khởi tạo một empty array các list item mỗi khi tạo mới một instance của List
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(), // auto generate một unique id cho mỗi ingredient
      count, // nhờ có ES6 nên chúng ta không cần 'count: count'
      unit,
      ingredient
    }
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    this.items.splice(this.items.findIndex(el => el.id === id), 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    // persist data from local storage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    this.likes.splice(this.likes.findIndex(el => el.id === id), 1);

    // persist data from local storage
    this.persistData();
  }

  isLiked(id) { // kiểm tra xem một recipe có được liked hay không.
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() { // tính tổng số recipe được likes
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));

    // restore our like items
    if (storage) this.likes = storage;
  }
}

export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    this.likes.splice(this.likes.findIndex(el => el.id === id), 1);
  }

  isLike(id) { // kiểm tra xem một recipe có được liked hay không.
    return this.likes.findIndex(el => el.id === id) !== -1;
  }

  getNumLikes() { // tính tổng số recipe được likes
    return this.likes.length;
  }
}

Array.prototype.customMap = function(fn) {
  console.log('this:', this); // this: [ 1, 2, 3, 4, 5 ]
  const newArr = [];
  for (let i = 0; i < this.length; i++) {
    newArr.push(fn(this[i]));
  }
  return newArr;
}

function double(x) {
  return x * 2;
}

console.log([1, 2, 3, 4, 5].customMap(double)); // [ 2, 4, 6, 8, 10 ]

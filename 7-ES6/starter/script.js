// Lecture: Let & Const

// ES5
/*
var nameE = 'Hieu Nguyen';
var age5 = 26;
nameE = 'Hieu Xuan';
console.log(nameE);
*/

// ES6
/*
const name6 = 'Hieu Nguyen';
let age6 = 26;
name6 = 'Hieu Xuan';
console.log(name6);
*/

// ES5
/*
function driversLicense(passedTesst) {
  if (passedTesst) {
    var firstName = 'Hieu';
    var yob = 1994;

    console.log(firstName + ' sinh vào năm ' + yob + ' đã được phép lái xe');
  }
}

driversLicense(true);
*/

// ES6
/*
function driversLicense6(passedTesst) {
  let firstName;
  const yob = 1994;

  if (passedTesst) {
    firstName = 'Hieu';
  }

  console.log(firstName + ' sinh vào năm ' + yob + ' đã được phép lái xe');
}

driversLicense6(true);
*/

// Lecture: Blocks and IIEFS
/*
{
  const a = 1;
  let b = 2;
  var c = a + b
}

console.log(c);
*/

// Lecture: Strings

// Arrow Function: Basics
/*
const years = [1994, 2000, 2003, 1996];

// ES5
var ages5 = years.map(function(year) {
  return 2020 - year;
})

// ES6
let ages6 = years.map(year => 2020 - year);

ages6 = years.map((year, index) => `Age element ${index++}: ${2020 -year}`);

ages6 = years.map((year, index) => {
  const now = new Date().getFullYear();
  const age = now - year;
  return `Age element ${index++}: ${age}`;
});
*/

// Arrow Function: Lexical 'this' keyword

// ES5
/*
var box5 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    var _self = this;
    document.querySelector('.green').addEventListener('click', function() {
      var str = 'đây là hộp thứ ' + _self.position + ' có màu ' + _self.color;
      alert(str);
    });
  }
}

box5.clickMe();
*/

// ES6
/*
const box6 = {
  color: 'green',
  position: 1,
  clickMe: function() {
    document.querySelector('.green').addEventListener('click', () => {
      var str = 'đây là hộp thứ ' + this.position + ' có màu ' + this.color;
      alert(str);
    });
  }
}

box6.clickMe(); // đây là hộp thứ 1 có màu green
*/

/*
const box66 = {
  color: 'green',
  position: 1,
  clickMe: () => {
    document.querySelector('.green').addEventListener('click', () => {
      var str = 'đây là hộp thứ ' + this.position + ' có màu ' + this.color;
      alert(str);
    });
  }
}

box66.clickMe(); // đây là hộp thứ undefined có màu undefined
*/

/*
function Person(name) {
  this.name = name;
}
*/

/*
Person.prototype.myFriends5 = function(friends) {
  var arr = friends.map(function(name) {
    return this.name + ' là bạn của ' + name;
  }.bind(this)); // ở đây chúng ta sẽ bind function(name) { ... } với object là object tương ứng với THIS keyword, THIS keyword ở đây được xác định là object được tạo bởi function constructor Person.

  console.log(arr);
}

var friends = ['Bob', 'Mary', 'John'];
var hieu = new Person('Hieu');
hieu.myFriends5(friends);  // ["Hieu là bạn của Bob", "Hieu là bạn của Mary", "Hieu là bạn của John"]
*/

// Person.prototype.myFriends6 = function(friends) {
//   var arr = friends.map((name) => {
//     return this.name + ' là bạn của ' + name;
//   });

//   console.log(arr);
// }

// var friends = ['Bob', 'Mary', 'John'];
// var hieu = new Person('Hieu');
// hieu.myFriends6(friends);  // ["Hieu là bạn của Bob", "Hieu là bạn của Mary", "Hieu là bạn của John"]

//////////////////////////////////////////////
// Lecture: Destructoring

// ES5
// var hieu = ['Hieu', 26];

// ES6
/*
const [name6, age6] = hieu;
console.log(`${name6} and ${age6}`); // Hieu and 26

const obj = {
  firstName: 'Nguyen',
  lastName: 'Hieu'
}

const {firstName, lastName} = obj;
console.log(`${firstName} ${lastName}`); // Nguyen Hieu

// Nếu chúng ta muốn tạo biến mới tuy nhiên có tên khác với tên của các properties của object
const {firstName: fName, lastName: lName} = obj;
console.log(`${fName} ${lName}`); // Nguyen Hieu

function calAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 60 - age];
}

const [age, retirement] = calAgeRetirement(1994);
console.log(age); // 26
console.log(retirement); // 34
*/

//////////////////////////////////////////////
// Lecture: Array
/*
const boxes = document.querySelectorAll('.box');
*/

// ES5
/*
var boxesArr5 = Array.prototype.slice.call(boxes); // Mượn method slice từ Array (method borrowing)

boxesArr5.forEach(function(item) {
  item.style.backgroundColor = 'yellow';
});
*/

// ES6
/*
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(item => item.style.backgroundColor = 'dodgerblue'); // đây là methopd để tạo ra một array từ một iterable object (nodeList trong ví dụ này)

for (const item of boxesArr6) {
  if (item.className.includes('blue')) {
    continue;
  }
  item.textContent = 'I changed to blue';
}

var ages = [12, 13, 16, 18, 11];

let fullAgeIndex = ages.findIndex((age) => {
  return age >= 18;
});

console.log(fullAgeIndex); // 3
console.log(ages.find(age => {
  return age >= 18;
})); // 18
*/

//////////////////////////////////////////////
// Lecture: The Spread Operator

// ES5
/*
function sumFn(a, b, c, d) {
  return a + b + c + d;
}

var numbers = [1, 2, 3, 4];
var sum2 = sumFn.apply(null, numbers);
console.log(sum2);

// ES6
const sum3 = sumFn(...numbers); // đây chính là expand array thành các component, ở đây sẽ là từng item của array numbers. Kết quả vẫn đúng.
console.log(sum3); // 10 again.

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

let nodeList = [h, ...boxes];
Array.from(nodeList).forEach(item => {
  item.style.color = 'purple';
});
*/

//////////////////////////////////////////////
// Lecture: Rest Parameters

// ES5
/*
function isFullAge5() {
  console.log(arguments); // là một args mà mọi function đều có thể access được.
  var argsArr = Array.prototype.slice.call(arguments);

  argsArr.forEach(function(age) {
    console.log((2020 - age) >= 18);
  });
}

// isFullAge5(1994, 2000, 2008); // true true false

// ES6
function isFullAge6(...yearsOfBirth) { // yearsOfBirth sẽ được transfer thành một array các tham số, và được sử dụng như một param trong function
  yearsOfBirth.forEach(age => {
    console.log((2020 - age) >= 18);
  })
}

isFullAge6(1994, 2000, 2008, 2009, 1992); // true true false false true
*/

/*
function isFullAge5(limit) {
  console.log(arguments); // là một args mà mọi function đều có thể access được.
  var argsArr = Array.prototype.slice.call(arguments, 1);

  argsArr.forEach(function(age) {
    console.log((2020 - age) >= limit);
  });
}

// isFullAge5(1994, 2000, 2008, 18); // true true false

// ES6
function isFullAge6(limit, ...yearsOfBirth) { // yearsOfBirth sẽ được transfer thành một array các tham số, và được sử dụng như một param trong function
  yearsOfBirth.forEach(age => {
    console.log((2020 - age) >= limit);
  });
}

isFullAge6(1994, 2000, 2008, 18); // true true false
*/
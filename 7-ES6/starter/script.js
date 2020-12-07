// Lecture: Let & Const

// ES5

// var name5 = 'Hieu Nguyen';
// var age5 = 26;
// name5 = 'Hieu Xuan';
// console.log(name5);

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

//////////////////////////////////////////////
// Arrow Function: Lexical 'this' keyword
/*
const years = [1994, 1992, 2000, 1999, 1956];

const ages6 = years.map((cur) => {
  return 2020 - cur;
});

console.log(ages6);
*/

// var box5 = {
//   color: 'green',
//   pos: 1,
//   clickMe: function() {
//     var _self = this;

//     document.querySelector('.green').addEventListener('click', function() {
//       var str = 'This is box number ' + _self.pos + ' and have ' + _self.color + ' as color';
//       alert(str);
//     });
//   }
// }

// box5.clickMe();

// const box6 = {
//   color: 'green',
//   pos: 1,
//   clickMe: function() {
//     document.querySelector('.green').addEventListener('click', () => {
//       console.log(this); // trỏ đến box6 đúng như mong muốn
//       var str = 'This is box number ' + this.pos + ' and have ' + this.color + ' as color';
//       alert(str);
//     });
//   }
// }

// box6.clickMe();

// const box66 = {
//   color: 'green',
//   pos: 1,
//   clickMe: () => {
//     console.log(this);
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = 'This is box number ' + this.pos + ' and have ' + this.color + ' as color';
//       alert(str);
//     });
//   }
// }

// box66.clickMe();

// function Person(name) {
//   this.name = name;
// }

// Person.prototype.myFriends5 = function(friends) {
//   var arr = friends.map(function(cur) {
//     return this.name + ' is friend with ' + cur;
//   }.bind(this));

//   console.log(arr);
// }

// var friends = ['Duc', 'Minh', 'Hoang'];

// // new Person('Hieu').myFriends5(friends);
// Person.prototype.myFriends6 = function(friends) {
//   var arr = friends.map(cur => {
//     return this.name + ' is friend with ' + cur;
//   });

//   console.log(arr);
// }

// new Person('Hieu').myFriends6(friends);
//////////////////////////////////////////////
// Lecture: Destructoring
/*
// ES5
var hieu = ['Hieu', 26];

// ES6

const [name6, age6] = hieu;
console.log(`${name6} and ${age6}`); // Hieu, 26

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

// const boxes = document.querySelectorAll('.box');

// ES5
// var boxesArr5 = Array.prototype.slice.call(boxes); // Mượn method slice từ Array (method borrowing)

// boxesArr5.forEach(function(item) {
//   item.style.backgroundColor = 'brown';
// });


// ES6
/*
const boxesArray6 = Array.from(boxes); // transform node list boxes thành một array

boxesArray6.forEach((cur) => {
  cur.style.backgroundColor = 'blue';
});

for (const cur of boxesArray6) {
  if (cur.className.includes('blue')) {
    continue;
  }

  cur.textContent = 'I changed to blue!!!';
}
*/
// ES5


// var ages = [12, 17, 11, 21, 15, 9];
/*
var fullAges = ages.map(function(cur) {
  if (cur >= 18) {
    return true;
  } else {
    return false;
  }
});

console.log(fullAges.indexOf(true));
*/

// ES6
/*
const fullAgeIndex = ages.findIndex((cur) => {
  if (cur >= 18) {
    return cur;
  }
});

console.log(fullAgeIndex);

const fullAge = ages.find(cur => {
  if (cur >= 18) {
    return cur;
  }
});

console.log(fullAge);
*/

//////////////////////////////////////////////
// Lecture: The Spread Operator
/*
function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

// ES5
var ages = [12, 13, 14, 15];

console.log(addFourAges.apply(null, ages));

// ES6
console.log(addFourAges(...ages));

const familySmith = ['John', 'Jame', 'Max'];
const familyHieu = ['Hieu', 'Hoa', 'Dong', 'Giang'];

const bigFamily = [...familyHieu, 'Lily', ...familySmith];

console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [h, ...boxes];
Array.from(all).forEach(cur => {
  cur.style.color = 'purple';
});
*/

//////////////////////////////////////////////
// Lecture: Rest Parameters
/*
// ES5

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
  // yearsOfBirth đã trở thành 1 array do đó chúng ta có thể loop qua mảng này = forEach
  yearsOfBirth.forEach(age => {
    console.log((2020 - age) >= 18);
  })
}

isFullAge6(1994, 2000, 2008, 2009, 1992); // true true false false true
*/

/*
function isFullAge5(limit) {
  var argsArr = Array.prototype.slice.call(arguments, 1);

  argsArr.forEach(function(age) {
    console.log((2020 - age) >= limit);
  });
}

isFullAge5(18, 1994, 2000, 2008); // true true false

// ES6
function isFullAge6(limit, ...yearsOfBirth) { // yearsOfBirth sẽ được transfer thành một array các tham số, và được sử dụng như một param trong function
  yearsOfBirth.forEach(age => {
    console.log((2020 - age) >= limit);
  });
}

isFullAge6(18, 1994, 2000, 2008); // true true false
*/

//////////////////////////////////////////////
// Lecture: Default Parameters

/*
function SmithPerson(fName, yob, lName = 'Smith', nationality = 'Viet Nam') {
  this.fName = fName;
  this.lName = lName;
  this.yob = yob;
  this.nationality = nationality;
}

var john = new SmithPerson('John', 1990);
*/

//////////////////////////////////////////////
// Lecture: Maps
/*
const question = new Map();
question.set('question', 'Phiên bản mới nhất của JS là gì?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES40');
question.set('correct', 3);
question.set(true, 'Đúng rồi');
question.set(false, 'Trả lời lại đi nhé sai rồi');

// Size của map
console.log(question.size); // 8

// Retrieve value của map:
console.log(question.get('question'));

// delete a key - value pair
question.delete(4);

// kiểm tra xem có key này tồn tại không
console.log(question.has(4)) // false
*/
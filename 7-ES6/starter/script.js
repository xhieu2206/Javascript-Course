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

function Person(name) {
  this.name = name;
}

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

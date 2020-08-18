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

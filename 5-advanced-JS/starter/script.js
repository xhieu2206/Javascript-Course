// Function constructor
/*
var Person = function(name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
}

Person.prototype.calculateAge = function() {
  console.log(2020 - this.yearOfBirth);
}

var hieu = new Person('Xuan Hieu', 1994, 'Developer');

Person.prototype.lastName = 'Nguyen';

hieu.calculateAge();
*/

// Object.create
/*
var personProto = {
  calculateAge: function() {
    console.log(2020 - this.yearOfBirth);
  }
};

var hieu = Object.create(personProto);
hieu.name = 'Hieu';
hieu.yearOfBirth = 1994;
hieu.job = 'Developer';

var jane = Object.create(personProto, {
  name: {
    value: 'Jane'
  },
  yearOfBirth: {
    value: 2000
  },
  job: {
    value: 'Student'
  }
});
*/

// Primitives vs Objects

// Primitives
// var a = 23;
// var b = a;

// a = 46;
// console.log(a)
// console.log(b)

// Objects
// var obj = {
//   name: 'Hieu',
//   age: 26
// }

// var obj2 = obj;
// obj.age = 30;
// console.log(obj.age);
// console.log(obj2.age);

// Function
// var age = 26;
// var hieu = {
//   name: 'Xuan Hieu',
//   city: 'Ha Noi'
// };

// function change(a, b) {
//   a = 30;
//   b.city = 'Nghe An';
// }

// change(age, hieu);
// console.log(age);
// console.log(hieu.city);

// Passing Function as Arguments
/*
var years = [1990, 2008, 1994, 2000, 2005];

function arrayCalc(arr, fn) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

function calcAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - (0.67 * el));
  } else {
    return -1;
  }
}

var ages = arrayCalc(years, calcAge);
var rates = arrayCalc(ages, maxHeartRate);
var fullAges = arrayCalc(ages, isFullAge);
console.log(ages);
console.log(rates);
console.log(fullAges);
*/

// First Class Functions: Functions returning Functions
/*
function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(`${name}, giải thích UX là gì?`);
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log(`${name}, bạn dạy môn gì?`);
    }
  } else {
    return function(name) {
      console.log(`${name}, Hello!!!`);
    }
  }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('John');
interviewQuestion('designer')('Jane');
interviewQuestion()('Hieu');
*/

// IIFE
/*
(function (text) {
  var score = Math.random() * 10;
  if (score >= 5) {
    console.log(text);
  } else {
    console.log("Goodluck next time.")
  }
})('Congratulations');
*/

// function retirement(retirementAge) {
//   var str = ' năm nữa sẽ về hưu';
//   return function(yearOfBirth) {
//     var age = 2020 - yearOfBirth;
//     console.log((retirementAge - age) + str);
//   }
// }

// var retirementVN = retirement(60);
// retirementVN(1994);

/*
function interviewQuestion(job) {
  if (job === 'designer') {
    return function(name) {
      console.log(`${name}, giải thích UX là gì?`);
    }
  } else if (job === 'teacher') {
    return function(name) {
      console.log(`${name}, bạn dạy môn gì?`);
    }
  } else {
    return function(name) {
      console.log(`${name}, Hello!!!`);
    }
  }
}
*/

/*
function interviewQuestion(job) {
  var questionForTeacher = ', bạn dạy môn gì?';
  var questionForDesigner = ', giải thích UX là gì?';
  var hello = 'Hello, ';
  return function(name) {
    if (job === 'teacher') {
      console.log(name + questionForTeacher);
    } else if (job === 'designer') {
      console.log(name + questionForDesigner);
    } else {
      console.log(hello + name);
    }
  }
}

interviewQuestion('teacher')('Xuan Hieu');
interviewQuestion('designer')('John');
*/

// Bind, Call & Apply
/*
var hieu = {
  name: 'Hieu',
  age: 26,
  job: 'developer',
  presentation: function(style, timeOfDay) {
    if (style === 'formal') {
      console.log(`Good ${timeOfDay}, ladies and gentlement! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old`);
    } else if (style === 'friendly') {
      console.log(`Hey! I'm ${this.name}, I'm a ${this.job} and I'm ${this.age} years old, have a nice ${timeOfDay}`);
    } else {
      console.log('Heyyyyy')
    }
  }
}

var emily = {
  name: 'Emily',
  age: 36,
  job: 'designer',
}
*/

// hieu.presentation('formal', 'morning');

// hieu.presentation.call(emily, 'friendly', 'afternoon');
// hieu.presentation.apply(emily, ['friendly', 'evening']);

/*
var emilyFriendly = hieu.presentation.bind(emily, 'friendly');

emilyFriendly('morning');
emilyFriendly('afternoon');
emilyFriendly('evening');

var emilyPresentation = hieu.presentation.bind(emily);

emilyPresentation('friendly', 'night')
*/

/*
var years = [1990, 2008, 1994, 2000, 2005];

function arrayCalc(arr, fn) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(fn(arr[i]));
  }
  return result;
}

function calcAge(el) {
  return 2020 - el;
}

function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calcAge);
var fullAgeVN = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullAgeVN);
*/

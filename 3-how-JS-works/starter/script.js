///////////////////////////////////////
// Lecture: Hoisting


// functions
/*
calcAge(1994);

function calcAge(year) {
    console.log(2020 - year);
}

// console.log(retirement);

var retirement = function(year) {
    console.log(60 - (2020 - year));
}

console.log('-------------------');

// variables
console.log(age); // undefined
var age = 23; // age ở đây được lưu trong global context.

function foo() {
    console.log(age);
    var age = 65; // age ở đây được store bên trong context do function này tạo ra
    console.log(age);
}

foo(); // 65
console.log(age); //23
*/




///////////////////////////////////////
// Lecture: Scoping


// First scoping example
// var a = 'Hello';
// first();

// function first() {
//     var b = ' Xuan Hieu';
//     second();

//     function second() {
//         var c = ' !!!';
//         third(); // throw exception do không access được biến b và c.
//     }
// }

// function third() {
//     var d = ' Heyyyy';
//     console.log(a + b + c + d);
// }
// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword










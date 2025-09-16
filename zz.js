// Excercise
// JSON.stringify  -- convert to json data format with space

const user = { name: "Alex", age: 25 };

console.log(JSON.stringify(user));
console.log(JSON.stringify({name:"Max"},null,8));
console.log("JSON.stringify: ",JSON.stringify(user));

// {"name":"Alex","age":25}
// {
//         "name": "Max"
// }
// Output: JSON.stringify: {"name":"Alex","age":25}


/*
.lean() is a Mongoose query method. It tells Mongoose to skip converting MongoDB
 documents into full Mongoose Documents (which have extra methods
 like .save(), .populate(), etc.) and instead return plain JavaScript objects.
 This improves performance when you only need to read data, not modify or save it. */

 // to.JSON 

// mongoose document
// const user = new User({
//     name: "Alice",
//     email: "alice@example.com",
//     age: 25,
//   });

  // .toJSON() converts the Mongoose document into a plain JavaScript object
  // console.log(user.toJSON());

// 📌 Output of .toJSON()

// {
//   "_id": "6502c715ab4f5b001c3f16d8",
//   "name": "Alice",
//   "email": "alice@example.com",
//   "age": 25,
//   "__v": 0
// }

// jSON.parse
const str = '[52,20,60,"Alice"]';
console.log("jSON.parse: ",JSON.parse(str));  // jSON.parse: [ 52, 20, 60, 'Alice' ]
console.log(("jSON.parse: ",JSON.parse(str))[3]); // jSON.parse: Alice

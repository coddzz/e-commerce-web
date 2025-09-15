// Excercise
// JSON.stringify  -- convert to json data format with space

const user = { name: "Alex", age: 25 };

console.log(JSON.stringify(user));
console.log(JSON.stringify({name:"Max"},null,8));

/*
.lean() is a Mongoose query method. It tells Mongoose to skip converting MongoDB
 documents into full Mongoose Documents (which have extra methods
 like .save(), .populate(), etc.) and instead return plain JavaScript objects.
 This improves performance when you only need to read data, not modify or save it. */
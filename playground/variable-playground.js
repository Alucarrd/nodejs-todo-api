// var person = {
// 	name: 'Peter',
// 	age: 21
// }

// function updatePerson(obj){
// 	//This is changing the reference
// 	// obj = {
// 	// 	name: 'Peter',
// 	// 	age : 24
// 	// }
// 	//the below is changing the value of the object
// 	obj.age = 24;
// }

// updatePerson(person);
// console.log(person);

//array example
//make new array with two values, 15, 27
//1.add new value by calling push
//2 dun update the array

var myArray = [15, 27];

function updateArray(vMyArray ){
	//This one is being passed in by ref
	vMyArray.push(55);

	//this tells node where to stop the program
	//we will be running this by calling node debug filename.js
	//type cont  to continue
	//type repl to inspect the value
	//use control-c to get out
	//type quit to exit
	debugger; 

	//this one is a locally created variable reference to [12, 33, 99]
	vMyArray =[12, 33, 99]

}
//array and objects are passed in by ref
updateArray(myArray);
console.log(myArray);


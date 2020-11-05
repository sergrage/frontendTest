var a = 5;
var b = 6;
console.log(a+b);


var newFile = require('fs');
var text = "Hello world";
newFile.writeFile(__dirname + '/test.txt', text);
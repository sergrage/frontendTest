// console.log('Person');

class Person {
	constructor(name, color){
		this.name = name;
		this.color = color;
	}

	show() {
		alert(this.name + ' love ' + this.color);
	}
}
// module.exports = Person;
export default Person;
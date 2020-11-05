function User(firstName, lastName, email, password) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.password = password;
	this.time = new Date();

	this.newUser = function() {
		console.log("Эта функция выводит данные нового пользоватея в БД");
		console.log("Пользоватея зовут: " + this.firstName + " " + this.lastName);
	}

	this.timeCreate = function() {
		console.log("Эта функция показывает когда пользователь был создан");
		console.log("Пользоватея создан: " + this.time.getFullYear()  + " " + this.time.getMonth()+ " " + this.time.getDate());
	}
}

console.log(123); // код в модуле исполняется, это сработает
module.exports = User;

// но чтобы дать доступ к переменным из этого файла другому файлу, нужно
// использовать module.exports



// let ura = new User ("Юрий", "Иванов", "test@email.com", "123456");

// ura.newUser();
// ura.timeCreate();


// в данном случае мы написали модель Юзера
// Класс это структура данных, в которой можно объеденить несколько функций и переменных. Использовать их совместно
// также можно сказать, что класс это некий шаблон, используя который можно повторно множество раз, меняя входные данне
// плюсом такого подхода является высокая организация кода, снижение количества ошибок.
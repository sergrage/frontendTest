import $ from 'jquery';

class Carusel {
	constructor(){
		this.carusel = $('.carousel');
		this.bootstrapCarusel();
	}

	bootstrapCarusel() {
		this.carusel.carousel({
		  interval: 2000
		});
	}
}

export default Carusel;
import $ from 'jquery';

class MobileMenu {
	constructor(){
		this.menuIcon = $(".header__menuIcon");
		this.menuContent = $(".header__menu");
		this.menuLinks = $(".header__menu li");
		this.menuLinksFirst = $(".header__menu li:first");
		this.mainHeaderLinkSecond = $(".header__menu li:nth-child(2)");
		this.events();
		// когда сайт прогрузится - создастся объект
		// будет исполнен весь код, написанный в конструкторе
		// 1) будет выбран объект DOM menuIcon
		// 2) будет определено событие events()
		// 3) при событии click по эл-ту menuIcon будет исполнена функция toggleMenu
	}

	events() {
		this.menuIcon.click(this.toggleMenu.bind(this));
		// в данном методе this - это объект
	}

	toggleMenu() {
		// alert(123);
		// но в данном методе this - это не объект, а элемент, по которому совершен клик
		this.menuContent.toggleClass("header__menu--visible");
		this.menuIcon.toggleClass("header__menuIcon--close");
		this.menuLinks.each(function() {
		    $(this).toggleClass("header__menu-link-open");
		    // тут также this - это элемент. и мы его выбераем с помощью $
		});
		this.menuLinksFirst.toggleClass("header__menu-link-open-first");
		// console.log(this.menuLinksFirst.text);
	}
}

export default MobileMenu;
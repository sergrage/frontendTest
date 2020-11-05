import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints.min.js';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor(){
		this.lazy = $(".lazyload");

		this.siteNavbar = $(".navbar");
		this.headerHeight = $("header").height();
		this.body = $("body");
		this.heroTitle = $(".hero__title");
		this.headerBurger = $(".header__menuIcon");

		this.createHeaderWaypoint();

		this.pageSections = $(".section__menu");
		this.headerLinks = $(".header__menuLink");
		this.headerMenu = $(".header__menu");
		this.mainHeaderLink = $(".header__menu li:first");
		this.mainHeaderLinkSecond = $(".header__menu li:nth-child(2)");
		this.upHeaderButton = $(".header__upButton");
		this.createPageSectionWaypoints();

		this.addSmoothScroll();

		this.refreshWaypoints();
	}

	refreshWaypoints() {
		this.lazy.on("load", function() {
			Waypoint.refreshAll();
			});	
		}

	addSmoothScroll() {
		this.headerLinks.smoothScroll({
		    offset: -100
		});

		this.upHeaderButton.smoothScroll();
	}

	createHeaderWaypoint() {
		let that = this;
		new Waypoint({
			element: this.heroTitle[0],
			handler: function(direction) {
				if(direction == "down"){
					that.body.prepend('<div id="header" style="height:'+that.headerHeight+'px"></div>');
					that.mainHeaderLink.addClass('d-none');
					that.mainHeaderLinkSecond.addClass('header__menu-link-open-first');
					that.headerMenu.addClass("header__menu--visible-down");
					// that.upHeaderButton.removeClass('d-none');
					that.siteNavbar.addClass("header__navbar--fixed animate__animated animate__fadeIn");
					that.headerBurger.addClass("position-fixed");
					// that.siteNavbar.switchClass( "header__navbar", "header__navbar--fixed", 1000, "easeInOutQuad" );
				} else {

					that.siteNavbar.addClass("animate__fadeOut");
					that.siteNavbar.removeClass("header__navbar--fixed animate__animated animate__fadeIn animate__fadeOut");
					that.mainHeaderLink.removeClass('d-none');
					that.mainHeaderLinkSecond.removeClass('header__menu-link-open-first');
					that.headerMenu.removeClass("header__menu--visible-down");
					// that.upHeaderButton.addClass('d-none');
					that.headerBurger.removeClass("position-fixed");
					that.body.children("div").remove();
					// that.siteNavbar.switchClass( "header__navbar--fixed", "header__navbar", 1000, "easeInOutQuad" );
				}
			}
		});
	}

	createPageSectionWaypoints() {
		let that = this;
		this.pageSections.each(function(){
		let section = this;

		new Waypoint({
			element: section,
			handler: function(direction) {
				if (direction == "down") {
					// console.log(123);
					let headerLink = section.getAttribute("data-link");
					// console.log(that.headerLinks);
					that.headerLinks.removeClass("mainColor");
						$(headerLink).addClass("mainColor");
					}
				},
				offset:"20%"
			});

		new Waypoint({

			element: section,
			handler: function(direction) {
				if (direction == "up") {
					// console.log(456);
					let headerLink = section.getAttribute("data-link");
					// console.log(that.headerLinks);
					that.headerLinks.removeClass("mainColor");
					$(headerLink).addClass("mainColor");
					}
			},
			offset:"-40%"
		});
		});
	}
}

export default StickyHeader;



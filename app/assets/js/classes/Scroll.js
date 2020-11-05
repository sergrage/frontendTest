import $ from 'jquery';
import 'waypoints/lib/noframework.waypoints.min.js';


class Scroll {
	constructor(elements, offset, animation){
		this.items = elements;
		this.offsetPercentage = offset;
		this.animation = animation;
		// переменные обявляем до методов!!!
		this.hideItems();
		this.createWaypoints();

	}

	hideItems() {
		this.items.addClass("opacity-0");
		// это класс helper - в _helper.scss
	} 
//element - элемент за которым следим
//handler - событие которое должно произойти

	createWaypoints(){
		let that = this;
		this.items.each(function(){
			let item = this;
			// нельзя пеердать в новый объект Waypoints this (в данном случае э-ты) ,
			// т.к. в объекте Waypoints будет свой this 
			new Waypoint({
				element: item,
				handler: function() {
					$(item).addClass(that.animation);
				},
				offset: that.offsetPercentage
			});
		});
	}
}

export default Scroll;
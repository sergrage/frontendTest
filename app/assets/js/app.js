// let $ = require('jquery');

// let Person = require('./classes/Person');
// import Person from './classes/Person';


// let User = require('./test');

// let ura = new User ("Юрий", "Иванов", "test@email.com", "123456");

// ura.newUser();
// ura.timeCreate();

// let max = new Person('Max', 'Red');

// max.show();

// console.log(12345345345671234);
import $ from 'jquery';
import 'bootstrap';
import 'lazysizes';

import MobileMenu from "./classes/MobileMenu";
import Scroll from "./classes/Scroll";
import StickyHeader from "./classes/StickyHeader";
import Carusel from "./classes/Carusel";


let mobileMenu = new MobileMenu();

let featuresScroll = new Scroll($(".features__item"), "70%", "opacity-1 animate__animated animate__backInDown");
let timelineLeft = new Scroll($(".timeline__card--left"), "70%", "opacity-1 animate__animated animate__fadeInLeft");
let timelineRight = new Scroll($(".timeline__card--right"), "70%", "opacity-1 animate__animated animate__fadeInRight");

let stickyHeader = new StickyHeader();

let carusel = new Carusel();

// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });


// $('.owl-carousel').owlCarousel();

//  $('.carousel').carousel({
//   interval: 2000
// });

//  $('.carousel-control-prev').click(function() {
//   $('.carousel').carousel('prev');
// });

// $('.carousel-control-next').click(function() {
//   $('.carousel').carousel('next');
// });
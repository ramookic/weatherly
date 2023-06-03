'use strict';

const toggle = document.querySelector('.hamburger');
const menu = document.querySelector('.nav__list');
const menuIcon = document.querySelector('.hamburger .bx-menu-alt-right');
const closeIcon = document.querySelector('.hamburger .bx-x');

const mobileMenu = [menu, menuIcon, closeIcon];

toggle.addEventListener('click', function () {
  mobileMenu.forEach(el => el.classList.toggle('active'));
});

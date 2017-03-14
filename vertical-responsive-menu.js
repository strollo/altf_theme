/*
==========================
Vertical Responsive Menu
==========================
*/

'use strict';


var tid = setInterval( function () {
  if ( document.readyState !== 'complete' ) return;
  clearInterval( tid );


  var querySelector = document.querySelector.bind(document);

  var nav = document.querySelector('.vertical_nav');
  var wrapper = document.querySelector('.wrapper');

  var menu = document.getElementById("js-menu");
  var subnavs = menu.querySelectorAll('.menu--item__has_sub_menu');    

  // Open Sub Menu
  
  for (var i = 0; i < subnavs.length; i++) {
    
    if (subnavs[i].classList.contains('menu--item__has_sub_menu') ) {
      
      subnavs[i].querySelector('.menu--link').addEventListener('click', function (e) {

          for (var j = 0; j < subnavs.length; j++) {

            if(e.target.offsetParent != subnavs[j])
              subnavs[j].classList.remove('menu--subitens__opened');          

          }

          e.target.offsetParent.classList.toggle('menu--subitens__opened');

      }, false);

    }
  }


}, 100 );


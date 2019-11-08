/*
	Gabriel Conceição
	http://www.gabrielconceicao.com
	08-11-2019 | contact: gabriel_7340@hotmail.com

	This library simulates the hover effect on mobile devices, width a cursor ( arrow ). By moving the arrow to the specified element, you can see the effect.
*/

/* -------- Define your options here -------------------------------------------------------------------------------------------------------------------------*/

var hoverMobileOpts = {
	arrowElement: '.pointer',	// Important: is the element with contains the arrow image, defined with a className or Id
	hideAfterTouch: true,		// Hide the arrow image after the user ends pressing the lcd 
	delayToShow: 200,			// Delay to show the arrow image when the user starts pressing the lcd 
	fireHoverEvent: true,		// Fire the hover event, can be catched with javascript or by the listeners you already have in your page
	
	applyHoverCssEffect: true,	
	/* 	Apply the hover class on the element. 
		You need to create the .hover class in your stylesheet file and repeat the contents of the :hover pseudo class to work in mobile

		Example:
			If you have:

				button:hover{
					background-color: red;
				}

			All you have to do is create a new class like this:

				button.hover{
					background-color: red;
				}

	*/ 
	classToHoverEffect: 'hover', // Here you can define the class name to be applied when the pointer is above some element ( hover effect )
}


/* -------  LIBRARY FUNCTIONS - Don't change anything after this unless you know what you are doing ;) ------------------------------------------------------ */

var hoverMobile = {
	
	start: function(){
		if( !hoverMobile.isMobile() ){
			return false;
		}
		hoverMobile.initDom();
		hoverMobile.initTouchStart();
		hoverMobile.initTouchMove();
		hoverMobile.initTouchEnd();
	},

	initDom: function(){
		window.pointerEl = document.querySelector( hoverMobileOpts.arrowElement );
	},

	initTouchStart: function(){
		document.querySelector( 'body' ).addEventListener( 'touchstart', function(e){
			e.preventDefault();
			e.stopPropagation();
		
			setTimeout( function(){
				 var touch = e.touches[0] || e.changedTouches[0];
				window.pointerEl.style.left = touch.pageX - 140;
				window.pointerEl.style.top = touch.pageY - 340;
				window.pointerEl.style.display = "block";
			}, 200 );
		});
	},

	initTouchMove: function(){
		document.querySelector( 'body' ).addEventListener( 'touchmove', function(e){
				e.preventDefault();
				e.stopPropagation();
				var touch = e.touches[0] || e.changedTouches[0];

				window.pointerEl.style.position = "absolute";
				window.pointerEl.style.left = touch.pageX - 20;
				window.pointerEl.style.top = touch.pageY - 80;


				var domEls = document.querySelectorAll( ':not(.pointer)' );

				for (var i=0, max=domEls.length; i < max; i++) {
						
						if( ( touch.pageY - 80 ) >= domEls[i].offsetTop && ( touch.pageY - 80 ) <= ( domEls[i].offsetTop + domEls[i].offsetHeight ) &&
							( touch.pageX - 20 ) >= domEls[i].offsetLeft && ( touch.pageX - 20 ) <= ( domEls[i].offsetLeft + domEls[i].offsetWidth)
						 ){
						
							domEls[i].dispatchEvent(new Event( 'hover' ));
							domEls[i].dispatchEvent(new Event( 'mouseover' ));
							domEls[i].classList.add( 'hover' );
	
						}else
							domEls[i].classList.remove( 'hover' );
				}

		});

	},

	initTouchEnd: function(){
		document.querySelector( 'body' ).addEventListener( 'touchend', function(e){
			window.touchcapable = false;
			window.enableTouch = false;
		//	window.pointerEl.style.display = 'none';
		});

	},

	isMobile: function(){
		if ( window.innerWidth <= 800 ) return true;
		return false;
	},
}

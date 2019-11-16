/*
	Gabriel Conceição
	http://www.gabrielconceicao.com
	08-11-2019 | contact: gabriel_7340@hotmail.com

	https://github.com/gabrielpconceicao/hoverMobile/

	This library simulates the hover effect on mobile devices, width a cursor ( arrow ). By moving the arrow to the specified element, you can see the effect.
*/
var hoverMobile = hM = {
	
	start: function( opts ){
		hM.opts = opts;

		if( !hM.isMobile() ){
			return false;
		}
		hM.initDom();
		hM.initTouchStart();
		hM.initTouchMove();
		hM.initTouchEnd();
		hM.validTouch=false;
	},

	initDom: function(){
		
		hM.pointerEl = gO
			.elCreate( 'img', 'pointer' )
			.atr( "src", "data:image/png;base64,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" )
			.setStl( 'width', '20px' )
			.setStl( 'position', 'absolute' )
			.setStl( 'z-index', '999999999999999' )
			.setStl( 'display', 'none' )
			.show( gO.el( 'body' ) );

			hM.domEls = gO.el( 'body' ).el( hM.opts.animateEls + ':not(.pointer):not(script):not(style)', true );

		setInterval( function(){
			if( !hM.touchEnabled && hM.touchCount != 2 )
								gO
					.el( 'body' )
					.setStl( 'touch-action', 'auto' )
					.setStl( '-moz-user-select', 'initial' )
					.setStl( '-ms-user-select', 'initial' )
					.setStl( '-o-user-select', 'initial' )
					.setStl( '-webkit-user-select', 'initial' )
					.setStl( 'user-select', 'initial' );
			hM.touchCount = 0;
		}, 1000 );

		hM.lastScroll = window.scrollTop;
	},

	initTouchStart: function(){

		window.document.querySelector("body").addEventListener("scroll", function (event) {
			hM.touchCount = 0;
		});
		document.querySelector( 'body' ).addEventListener( 'touchstart', function(e){
			hM.touchCount++;
			hM.lastFiredId = -1;
			

			if( hM.touchCount == 2 )
				gO
					.el( 'body' )
					.setStl( 'touch-action', 'none' )
					.setStl( '-moz-user-select', 'none' )
					.setStl( '-ms-user-select', 'none' )
					.setStl( '-o-user-select', 'none' )
					.setStl( '-webkit-user-select', 'none' )
					.setStl( 'user-select', 'none' );

			if( hM.touchCount > 2 ){
				hM.touchEnabled = true;
				setTimeout( function(){
				var tData = e.touches[0] || e.changedTouches[0];
				hM.updatePointer( tData.pageX, tData.pageY );

				hM.pointerEl.style.display = "block";
			}, hM.opts.delayPointer );

			}
			
		
			
		});
	},

	initTouchMove: function(){
		document.querySelector( 'body' ).addEventListener( 'touchmove', function(e){
				
			if( !hM.touchEnabled ){
				

			} else{
				//gO.el( 'body' ).setStl( 'touch-action', 'none' );

				var tData = e.touches[0] || e.changedTouches[0],
					offsetX = ( hM.opts.showPointer ? hM.opts.pointerOffsetX : 0  ),
					offsetY = ( hM.opts.showPointer ? hM.opts.pointerOffsetY : 0  );



				hM.updatePointer( tData.pageX, tData.pageY );

				for (var i=0, max=hM.domEls.length; i < max; i++) {
					hM.domEls[i].elId = i;
					var elPos = hM.domEls[i].getBoundingClientRect();

					tData = hM.pointerEl.getBoundingClientRect();
					elPos = hM.domEls[i].getBoundingClientRect();
					if( ( tData.top ) >= elPos.top && ( tData.top ) <= ( elPos.top + elPos.height ) && ( tData.left ) >= elPos.left && ( tData.left  ) <= ( elPos.left + elPos.width )	){			
						if( hM.opts.fireHoverEvent && hM.domEls[i].elId != hM.lastFiredId ){
							hM.domEls[i].fire( 'hover' );
							hM.domEls[i].fire( 'mouseover' );
							hM.domEls[i].fire( 'touchenter' );
							hM.lastFiredId = hM.domEls[i].elId;
							hM.lastFiredEl = hM.domEls[i];
						}
						if( hM.opts.applyHoverCssEffect )
							hM.domEls[i].classList.add( hM.opts.hoverClassName );
						
					}else{
						hM.domEls[i].classList.remove( hM.opts.hoverClassName );
						hM.lastFiredId = -1;
						hM.domEls[i].fire( 'leave' );
						hM.domEls[i].fire( 'mouseleave' );
						hM.domEls[i].fire( 'touchleave' );
					}
				}
			}
		}, false);

	},

	initTouchEnd: function(){
		document.querySelector( 'body' ).addEventListener( 'touchend', function(e){

				//	gO.el( 'body' ).setStl( 'touch-action', 'auto' );
		
			hM.lastFiredId = -1;

			if( hM.touchEnabled ){

				hM.touchEnabled = false;


			}
			

			if( hM.opts.hideAfterTouch )
				setTimeout( function(){
					hM.pointerEl.style.display = 'none';

					if( hM.lastFiredEl ){
						hM.lastFiredEl.fire( 'leave' );
						hM.lastFiredEl.fire( 'mouseleave' );
						hM.lastFiredEl.fire( 'touchleave' );

						if( hM.opts.applyHoverCssEffect )
							hM.lastFiredEl.classList.remove( hM.opts.hoverClassName );
					}
				}, hM.opts.delayPointer );

		});	

	},

	updatePointer: function( x, y ){
		//hM.pointerEl.style.display = ( hM.opts.showPointer ? "block" : "none" );
		hM.pointerEl.style.left = x - ( hM.opts.showPointer ? hM.opts.pointerOffsetX : 0  ) + 'px';
		hM.pointerEl.style.top = y - ( hM.opts.showPointer ? hM.opts.pointerOffsetY : 0  ) + 'px';
	},

	isMobile: function(){
		if ( window.innerWidth <= 800 ) return true;
		return false;
	},
}

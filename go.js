/* Gabriel Conceicao - gabriel_7340@hotmail.com - 02-2014 */
var gO = {
	author: 'Gabriel Conceicao <gabriel_7340@hotmail.com>',
	description: 'gO library',
	date: '02-2014',
	version: '0.1',

 /* Functions */

 	ready: function( cb ){
 		var that = this;
 		this.start();

 		this.wd.on( 'goready', function(){
 			cb( that.wd );
 		});
 	},

	start: function( wd ){
		if( this.wd ) return false;
		this.wd = window;

		this._initDom();
		this._initVars();
		
		return true;
	},

	/* Elements functions */

	dom: {

		/* Geral element functions */
		el: function( el, all ){
			if( all ) return this.querySelectorAll ? this.querySelectorAll( el ) : document.querySelectorAll( el );
			return this.querySelector ? this.querySelector( el ) : document.querySelector( el );
		},

		atr: function( atr, val ){
			if( val ){
				this.setAttribute( atr, val );
				return this;
			}
			return this.getAttribute( atr );
		},

		delAtr: function( atr ){
			if( !atr ) return false;
			this.removeAttribute( atr );

			return this;
		},

		val: function( val ){
			if( val || val == '' ){
				this.innerHTML = val;
				return this;
			}
			return this.innerHTML;
		},

		isCls: function( cls ){
			if( !this.className ) return false;
			if( typeof cls == 'undefined' || cls == '' ) return false;

			var list = this.className.split( ' ' );

			for( var i = 0; i< list.length; i++ )
				if( list[ i ] == cls ) return true;

			return false;
		},

		cls: function( cls ){
			if( typeof cls != 'undefined' ){
				if( cls == '' ) return this.className = '';

				if( gO.dom.isCls.call( this, cls ) ) return false;
				return this.className = this.className + ' ' + cls;
			}
			return this.className;
		},

		firstCls: function(){
			var pos = this.className.indexOf( ' ' );

			if( !this.className.length ) return false;

			if( pos == -1 ){
				return this.className;
			} 

			return this.className.substring( 0, pos );
		},

		addCls: function( cls ){
			if( !cls ) return false;
			if( gO.dom.isCls.call( this, cls ) ) return this;

			if( !this.className ) {
				this.className = cls;
				return this;
			}
			
			this.className = this.className + ' ' + cls;
			return this;
		},

		delCls: function( cls ){
			if( !gO.dom.isCls.call( this, cls ) ) return this;
			this.className = this.className.replace( ' ' + cls, '' ).replace( cls, '' );

			return this;
		},

		getStl: function( stl, rem ){
			if( !stl ) return window.getComputedStyle( this );
			
			stlEl = window.getComputedStyle( this );
			
			if( !stlEl ) return '';
			stl = stlEl[ stl ];

			if( !stl ) return '';

			return stl.replace( rem, '' );
		},

		setStl: function( stl, val ){
			if( !stl ) return false;
			if( typeof stl == 'object' ){
				this.style = stl;
				return this;
			}

			this.style[ stl ] = val;
			return this;
		},

		show: function( el, top ){
			if( !el ) return false;
			if( top ) return el.insertBefore( this, el.childNodes[0] );
			return el.appendChild( this );
		},

		flash: function( el ){
			el.parentNode.replaceChild( this, el );
			return el;
		},

		create: function( type, cls ){
			if( !type ) return false;
			var el = document.createElement( type );

			gO.dom.cls.call( this, cls );
			return gO.dom.show( el );
		},

		parent: function( pos ){
			if( !pos ) return this.parentNode || false;

			var el = this;

			for( var i = 0; i <= pos; i++ )
				el = el.parentNode;

			return el;
		},

		parents: function( matchEl ){
			var el = this,
				parents = [];

			while( el.tagName != 'BODY' ){
				el = el.parentNode;
				parents.push( el );

				if( el === matchEl ){
					return {
						parents: parents,
						match: true,
					};
				}
			}

			return parents;
		},

		on: function(){
			var args = arguments;
			if( args.length < 2 ) return false;

			if( args.length == 2 ){
				var evs = args[ 0 ].split( ' ' );

				for( var n = 0; n < evs.length; n++ ){
					this[ '_on' + evs[ n ] ] = function( e ){
						e.el = this;
						args[ 1 ].call( gO, e );
					}
					this.addEventListener( evs[ n ], this[ '_on' + evs[ n ] ], false );
				}
			}

			if( args.length > 2 ){
				if( typeof args[ 2 ] == 'function' ){
					var els = this.el( args[ 0 ], true );
					for( var i = 0; i < els.length; i++ ){
						var evs = args[ 1 ].split( ' ' );

						for( var n = 0; n < evs.length; n++ ){
							this[ '_on' + evs[ n ] ] = function( e ){
								e.el = this;
								args[ 2 ].call( args[ 3 ] || gO, e );
							}
							els[ i ].addEventListener( evs[ n ] , this[ '_on' + evs[ n ] ], false );
						}
					}
				} else {
					var evs = args[ 0 ].split( ' ' );

					for( var n = 0; n < evs.length; n++ ){
						this[ '_on' + evs[ n ] ] = function( e ){ e.el = this; args[ 1 ].call( args[ 2 ], e ); };
						this.addEventListener( evs[ n ], this[ '_on' + evs[ n ] ], false );
					}
				}

			}

			return this;
		},
		off: function( ev ){
			if( !ev ) return false;
			ev = ev.split( ' ' );

			for( var i = 0; i < ev.length; i++ )
				this.removeEventListener( ev[ i ], this[ '_on' + ev[ i ] ], false );

			return this;
		},

		fire: function( evt, data ){
			if( !evt ) return false;
			
			var e = window.document.createEvent( 'CustomEvent' );
			e.initCustomEvent( evt, true, true, data );

			this.dispatchEvent( e, data );
			return this;
		},

		tag: function(){
			return this.tagName;
		},

		del: function(){
			this.parent().removeChild( this );
			return true;
		},

		/* Specific element functions */

		els: {
			Input: {
				val: function( val ){
					if( val || val == '' ){
						this.value = val;
						return this;
					}

					return this.value;
				},
			},
			Select: {
				val: function( val ){
					if( val ) return this.value = val;
					return this.value;
				},

				index: function( val ){
					if( val == '' || !val  ) return this.selectedIndex;

					this.selectedIndex = val;
					return this;
				},
			},
			TextArea: {
				val: function( val ){

					if( val || val == '' ){
						this.value = val;
						return this;
					}
					
					return this.value;
				},
			},
		},
	},

	vars: {
		defString: {
			has: function( val ){
				return this.indexOf( val ) > -1;
			},

			rpl: function( val, nval ){
				return this.replace( new RegExp( val, 'g' ), nval );
			},

			null: function( clear ){
				if( !this.length ) return true;
				return false;
			},
			upper: function( pointer ){
				if( !this.length ) return false;
				if( !pointer ) return this.toUpperCase();

				var nS = '';
				for( var i = 0; i < pointer; i++ )
					nS += this.charAt( i ).toUpperCase();

				nS += this.slice( pointer );

				return nS;
			},
			html: function(){
				if( !this.length ) return '';
				return this.rpl( '\n', '<br>' );
			},
			text: function(){
				if( !this.length ) return true;
				return this.rpl( '<br>', '\n' );
			},
		},

		defArray: {
			order: function( up, down ){
				var upVal = this[ up ];
				this[ up ] = this[ down ];
				this[ down ] = upVal;
			},
		},
	},

	_initDom: function( ){
		for( var cf in this.dom ){
			if( cf == 'els' ){
				for( var el in this.dom[ 'els' ] ){
					for( var fn in this.dom[ 'els' ][ el ] ){
						if( !window['HTML' + el + 'Element'].prototype[ fn ] )
							window['HTML' + el + 'Element'].prototype[ fn ] = this.dom[ 'els' ][ el ][ fn ];
					}
				}
			}else{	
				if( !window.Element.prototype[ cf ] )
					window.Element.prototype[ cf ] = this.dom[ cf ];
			}
		}

		window.on = this.dom.on;
		window.fire = this.dom.fire;
	},

	_initVars: function( ){
		for( var cf in this.vars ){
			for( var fn in this.vars[ cf ] ){
				if( !window[ cf.replace( 'def', '' ) ].prototype[ fn ] )
					window[ cf.replace( 'def', '' ) ].prototype[ fn ] = this.vars[ cf ][ fn ];
			}
		}
	},

/* Elements controllers */

	elCreate: function( type, cls ){
		if( !type ) return false;

		var el = document.createElement( type );

		if( cls )
			el.className = cls;

		return el;
	},

	el: function( el, all ){
		return this.dom.el( el, all );
	},

	breakLine: function(){
		return '<br>';
	},

/* Dom Listener create function */

	dispach: function( el, evt, data ){
		this['_on' + el + evt ]( this, data );
	},

/*
	getUser: function( u, cb ){
		gO.sdata( 'post', 'engine/data/user.php', 'id=1&a=basic', function( user ){
			cb( user );
		});
	},

*/

	elFlash: function( el, type, delay, turn ){
		if( !el || !type ) return false;
		if( !delay ) var delay = 500;

		var that = this,
			times = 0;

		switch( type ){
			case 'error':
				var flash = setInterval(function(){
					if( !el.isCls( 'error' ) ){
						el.addCls( 'error' );
						times++;
					}
					else
						el.delCls( 'error' );

					if( times >= turn ){
						if( !el.isCls( 'error' ) )
							el.addCls( 'error' );
						clearInterval( flash );
					} 

				}, delay );
			break;
		}
	},

/* Window functions */

	width: function(){
		return this.wd.innerWidth;
	},

	heigth: function(){
		return this.wd.innerHeight;
	},
};

document.onreadystatechange = function(){
	if( document.readyState == 'complete' ){
		gO.start();
		gO.wd.fire( 'goready' );
	}
};

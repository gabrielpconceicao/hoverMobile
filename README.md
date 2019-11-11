# hoverMobile : Javascript Library to simulate the hover effect on a mobile device
This javascript library simulates the hover effect on mobile devices, with a pointer or only by moving your finger on the lcd.

Example 1             |  Example 2
:-------------------------:|:-------------------------:
![](http://www.gabrielconceicao.com/hoverMobile/hoverMobile.gif)  |  ![](http://www.gabrielconceicao.com/hoverMobile/hoverMobile2.gif)

See the example on your mobile device at http://www.gabrielconceicao.com/hoverMobile

<h1>How it works?</h1>

When the user presses the lcd three times very quickly, a pointer will show up and he can move his finger to the element with some hover effect and see that effect, like at desktop.
<h5>The only three things necessary to work are:</h5>
<ul>
	<li>Add this library to your website;</li>
	<li>Define a .hover class on every element with a :hover pseudo class and copy the same logic.</li>
	<li>On your hover listeners, define the touchenter and touchleave events. </li>
</ul>

The library will fire the event touchenter when he is hover the element and fire touchleave when it leaves the element.

<h5>The :hover css pseudo class effect: How it works in mobile with this library?</h5>
Create the .hover class in your stylesheet file, to simulate the :hover effect. All you have to do is repeat the content of this pseudo class to the .hover class.
Example:

	button:hover{
		background-color: red;
	}

  All you have to do is create a new class like this:

	button.hover{
		background-color: red;
	}

<b>Javascript:</b> With this library what is necessary to the mouseover event work on mobile devices?

Simple define the touchenter and touchleave events at elements and the library will fire the events.

Example:

	$('button').on('mouseover touchenter', function(e) {
		// make something cool on hover
	});
	
	$('button').on('mouseleave touchleave', function(e) {
		// make something cool on leave
	});


<h5> Options and intialization </h5>

You can start this library, calling the start function with this parameters:


		<script type="text/javascript">
			gO.ready( function(){
				hoverMobile.start({
					pointerEl: '.pointer',	
					animateEls: 'a,button,.more',	
					hideAfterTouch: true,
					showPointer: true,
					pointerOffsetX: 20,
					pointerOffsetY: 70,		
					delayPointer: 200,			
					fireHoverEvent: true,
					applyHoverCssEffect: true,	
					hoverClassName: 'hover',
				});
			});
		</script>
		
The parameter "animateEls" defines what elements of the dom will show up the effect.


See an example of the implementation:
https://github.com/gabrielpconceicao/hoverMobile/blob/master/index.html#L33

This library depends of gO.library. For more information about this, see https://github.com/gabrielpconceicao/go-library

#In development process

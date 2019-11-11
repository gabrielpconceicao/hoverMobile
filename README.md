# hoverMobile : Javascript Library to simulate the hover effect in mobile devices
This javascript library simulates the hover effect on mobile devices, with a pointer or only by moving your finger on the lcd.

![alt text](http://www.gabrielconceicao.com/hoverMobile/hoverMobile.gif)


See the example on your mobile device at http://www.gabrielconceicao.com/hoverMobile

![alt text](http://www.gabrielconceicao.com/hoverMobile/hoverMobile2.gif)

<h4>The Concept</h4>

When the user press the lcd three times very quickly, he can move his finger to the element with some hover effect and see that effect, like at desktop.
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


See an example of the implementation:
https://github.com/gabrielpconceicao/hoverMobile/blob/master/index.html#L33

#In development process

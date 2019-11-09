# hoverMobile : Javascript Library to simulate the hover effect in mobile devices
This javascript library simulates the hover effect on mobile devices, width a cursor ( arrow ). By moving the arrow to the specified element, you can see the effect.


![alt text](http://www.gabrielconceicao.com/hoverMobile/hoverMobile.gif)


See the example on your mobile device at http://www.gabrielconceicao.com/hoverMobile

The :hover css pseudo class effect: How it works in mobile with this library?
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

#In development process

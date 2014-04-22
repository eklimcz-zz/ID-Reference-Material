#Button.js

A General purpose click & touch event handler for mootools and jQuery.

- Prevents click & touch events tripping over eachother
- Provides touchupinside functionality!
- Stops event propagation where appropriate
- Adds event classes as a polyfill for :active etc

Usage:

	new Button(element,{
		click: function(){
			//do something
		},
		mouseover: function(){
			//do something else
		}
	})

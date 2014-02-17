
/**
 * Provides requestAnimationFrame in a cross browser way.
 */

(function( window ) {

  var prefixes = 'webkit moz ms o'.split(' ');
  // get unprefixed rAF and cAF, if present
  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;
  // loop through vendor prefixes and get prefixed rAF and cAF
  var prefix;
  
  for( var i = 0; i < prefixes.length; i++ ) {
    if ( requestAnimationFrame && cancelAnimationFrame ) {
      break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
    cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                              window[ prefix + 'CancelRequestAnimationFrame' ];
  }

  if ( !requestAnimationFrame || !cancelAnimationFrame ) {
	    requestAnimationFrame = function( callback, element ) {
	 	   window.setTimeout( callback, 1000 / 60 );
	    }
	    
	   cancelAnimationFrame = function( id ) {
       	window.clearTimeout( id );
       };             
    }
      // put in global namespace
      window.requestAnimationFrame = requestAnimationFrame;
      window.cancelAnimationFrame = cancelAnimationFrame;


})( window );

	function animate() {
	
	    requestAnimationFrame( animate ); 
	    TWEEN.update();
	
	}

    function detectTransformProperty () {
	var prefixes = 'transform WebkitTransform MozTransform oTransform msTransform'.split(' '),
	    el = document.createElement('div'),
	    index = 0,
			support = false;

	while (index < prefixes.length) {
		var prefix = prefixes[index++];
		if (document.createElement('div').style[prefix] != undefined) {
			return prefix
		};
	}

	return false;
	};
	
	


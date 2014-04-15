(function($) {

	var globalProp = "Hi";
	
    var audioPlayer = {
        
        //variables        
        prop1: "Hello",
        prop2: "World",
        
        init: function() {
	        	
	        	//class prop
	        	console.log(globalProp);
	        	
	        	//object prop
	        	this.internalMethod(this.prop1, this.prop2);
        },
        
        play: function() {

        	console.log('audio playing');
        
        },
        internalMethod : function(p1, p2) {
        	
	        console.log(p1 + ' ' + p2);
	    }
	 };

	 $.audioPlayer = audioPlayer;

}(jQuery));
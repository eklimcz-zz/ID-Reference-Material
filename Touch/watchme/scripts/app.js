$(document).ready(function(){
	
	var pageW = $('.clip').width();
	var pageH = $('.clip').height();
	var screen1 = $('.one');
	var screen2 = $('.two');
	var blurBG = $('.blur-bg');
	var menu = $('.menu');
	
	TweenLite.set(blurBG, {autoAlpha:0});
	TweenLite.set(menu, {autoAlpha:0, y:100});
	TweenLite.set(screen2, {autoAlpha:0});

	$(document).on('pointermove', function(event) {
            event.preventDefault();
        });

	screen1.on('swipestart', function(e){
		   
		 e.preventDefault();

		//swipe up
		 if(e.angle > 70 && e.angle < 120 ){
			TweenLite.to(blurBG, .35, {autoAlpha:1});
			TweenLite.to(menu, .35, {delay:.1667, autoAlpha:1, y:0, ease:"easeOutQuart", onComplete:function(){
				TweenLite.set(screen1, {autoAlpha:0});
			}});			
		}

	});


	menu.on('swipeend', function(e){
		
		e.preventDefault();

		if(e.angle > 245 && e.angle < 305 ){

			TweenLite.to(menu, .35, { autoAlpha:0, y:pageH, ease:"easeInQuart"});					
			TweenLite.to(blurBG, .35, {autoAlpha:0, ease:"easeInQuart"});	
			TweenLite.to(screen1, .35, { delay:.2, autoAlpha:1, ease:"easeOutQuart"});										
		}

	});
	
	menu.on('tap', function(){


		//transition screen out
		TweenLite.to(menu, .35, { scaleX:.95, scaleY: .95, ease:"easeInQuart"});			
		TweenLite.to(blurBG, .35, { scaleX:.95, scaleY: .95, ease:"easeInQuart"});		

		TweenLite.to(menu, .35, {delay:.2, y:-pageH, ease:"easeInQuart"});			
		TweenLite.to(blurBG, .35, {delay:.2, y:-pageH, ease:"easeInQuart"});			

		//transition screen in
		TweenLite.set(screen2, {autoAlpha:1});			
		TweenLite.fromTo(screen2, .35, { y:pageH, scaleX:.95, scaleY:.95 },{delay:.2, scaleX:1, scaleY:1,  y:0, ease:"easeOutQuart"});					
		
	});

	screen2.on('pinchstart', function(e){
		
		e.preventDefault();			
		
		TweenLite.to(screen2, .35, {scaleX:.95, scaleY:.95, autoAlpha:0, ease:"easeInQuart"});
		TweenLite.fromTo(screen1, .35, { scaleX:1.1, scaleY:1.1, autoAlpha:0}, { delay:.3,scaleX:1, scaleY:1, autoAlpha:1, ease:"easeOutQuart", onComplete:function(){

			//reset everything
			TweenLite.set(blurBG, {x:0, y:0, scaleX:1, scaleY:1, autoAlpha:0});
			TweenLite.set(menu, {autoAlpha:0, y:100});
			TweenLite.set(screen2, {scaleX:1, scaleY:1, autoAlpha:0});

		}});

	});

	screen2.on('swipestart', function(e){

		e.preventDefault();		
		//swipe down
		if(e.angle > 245 && e.angle < 305 ){

			TweenLite.to(screen2, .35, { scaleX:.95, scaleY: .95, ease:"easeInQuart"});			
			TweenLite.to(screen2, .35, { delay:.2, y:pageH, ease:"easeInQuart"});			
			TweenLite.to(menu, .35, {delay:.2, y:0, ease:"easeInQuart"});			
			TweenLite.to(blurBG, .35, {delay:.2, y:0, ease:"easeInQuart"});			
			TweenLite.to(menu, .35, {delay:.6, scaleX:1, scaleY:1, ease:"easeOutQuart"});					
			TweenLite.to(blurBG, .35, {delay:.6, scaleX:1, scaleY:1, ease:"easeOutQuart"});			
		}

	});

});

   

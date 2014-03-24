$(document).ready(function(){

	var animateBtn = $('#animateBtn');
	var rect = $('.rect');
	var animated = false;
	var pageW = $(window).width();
	var pageH = $(window).height();

	animateBtn.on('click', function(){
		if(!animated){
			TweenLite.to(rect, .35, {x:(pageW/2)-150, y:(pageH/2)-150, rotation: 90, scaleX:5, scaleY:5,  ease:"easeOutBack", onComplete:function(){
				animateBtn.text('Reset');
				animated = true;
			}});
		}
		else{
		TweenLite.to(rect, .35, {x:0,y:0, rotation: 0, scaleX:1, scaleY:1,  ease:"easeInBack", onComplete: function(){
			animated = false;
			animateBtn.text('Animate me');
		}});
			
		}
	});
});

   

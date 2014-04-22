Button = (function(element,params){
  var self,
      p,
      v,
      element_coords,
      touch_inside,
      touchX,
      touchY,
      touch_moved,
      isTouchInside
      ;
  self = {};
  if ( !element) return self;
  p    = params || {};
  v = function(){};
  self.events = { mouseover: v,  mousedown: v, click: v,  mouseup: v  };
  for (var key in p){self.events[key] = p[key];}
  isTouchInside = function(event){
    if (! event.touches[0] ) return touch_inside;
    touch_inside = false;
		touchX = event.touches[0].pageX;
		touchY = event.touches[0].pageY;
		if(
			touchX > element_coords.left  && 
			touchX < element_coords.right && 
			touchY > element_coords.top   && 
			touchY < element_coords.bottom
		){
      touch_inside = true;
		} else {
      touch_inside = false;
		}
		return touch_inside;
  };  
  element.addEvents({
    mouseover: function(e){
      e.preventDefault();
      e.stopPropagation();
      element.addClass('mouseover');
      self.events.mouseover();
    },
    mousedown: function(e){
      e.preventDefault();
      e.stopPropagation();
      element.addClass('mousedown');      
      element.removeClass('mouseover');      
      self.events.mousedown();
    },
    click: function(e){
      e.preventDefault();
      e.stopPropagation();
      element.removeClass('mouseover');            
      element.removeClass('mousedown');            
      self.events.click();
    },
    mouseup: function(e){
      e.preventDefault();
      e.stopPropagation();
      element.removeClass('mouseover');            
      element.removeClass('mousedown');
      self.events.mouseup();
    },
    mouseleave: function(e){
      e.preventDefault();
      e.stopPropagation();
      element.removeClass('mouseover');            
      element.removeClass('mousedown');
    },    
    touchstart: function(e){
      e.preventDefault();
      e.stopPropagation();
      element_coords = element.getCoordinates();
      element.addClass('mousedown');
      touch_inside = true;
      self.events.mousedown();
    },
    touchmove: function(e){
      e.preventDefault();
      e.stopPropagation();
      touch_inside = isTouchInside(e);
      if ( ! touch_inside ) {
        element.removeClass('mousedown'); 
      } else {
        element.addClass('mousedown');
      }
    },
    touchend: function(e){
      element.removeClass('mousedown');
      e.stopPropagation();
      e.preventDefault();
      if ( touch_inside ) {
        self.events.mouseup();
        self.events.click();
      }
    },
    touchcancel: function(){
      element.removeClass('mousedown');
    }  
  });
	element.setStyle('-webkit-tap-highlight-color','rgba(255,255,255,0)');
  return self;
});
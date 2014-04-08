
// 87 = w
// 68 = d



  //  $(document).ready(function() {

     //   w = $(window).width();
     //   h = $(window).height();

        /*
        $(window).on({
            keydown: function(){


                if (!on) {
                    var processingInstance = Processing.getInstanceById('sketch');
                   // processingInstance.loop();  // call Processing loop() function
                    on = true;
                } else {
                    on = false;
                    var processingInstance = Processing.getInstanceById('sketch');
                   // processingInstance.noLoop(); // stop animation, call noLoop()
                }
            }        
        });
*/
   // });
/*
        $(window).on({
            keydown: function(event) {
                
                if (event.keyCode == 68) {
                    isAnimating = true;
                }
                else if (event.keyCode == 87){
                    toggle = !toggle;
                }

            },
            keyup: function(event) {

                if (event.keyCode == 68) {
                    isAnimating = false;
                }
                else if (event.keyCode == 87){
                    toggle = false;
                }
            }
        });

        $(window).on('resize', resize);

        init();
        animate();


        function init() {

            canvas = document.createElement('canvas');
            console.log(w, h);
            canvas.width = w;
            canvas.height = h;
            context = canvas.getContext('2d');
            document.body.appendChild(canvas);

        }

        function animate() {
          
            requestAnimFrame(animate);
            draw();          
        }

        function draw() {
            if(isAnimating){
                //console.log(KeyboardJS.activeKeys());
                var time = new Date().getTime() * 0.002;
                var x = Math.sin(time) * (w / 2) + (w / 2);
                var y = Math.cos(time * 0.9) * (h / 2) + (h / 2);
                var size = Math.max(10, Math.cos(time) * 100);

                //toggle = !toggle;

                context.fillStyle = toggle ? 'rgb(200,200,20)' : 'rgb(20,20,200)';
                context.beginPath();
                context.arc(x, y, size, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();
            }

        }

        function resize() {

            w = $(window).width();
            h = $(window).height();
        }

    });

    */
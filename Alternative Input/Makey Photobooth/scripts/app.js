var videoTexture, material, video;
var scene, renderer, mesh;
var camera, cameraControls;
var composer;
var shaderParams = {
	shaderTime: 1,
	distortion: 0.01,
	distortion2: 0.01
}
var downKeys = {};
var cover = $('#cover');

$(document).ready(function() {


	//renderer
	renderer = new THREE.WebGLRenderer({
		preserveDrawingBuffer: true
	});
	renderer.setSize(800, 600);
	document.getElementById('container').appendChild(renderer.domElement);

	//scene
	scene = new THREE.Scene();

	//camera
	camera = new THREE.PerspectiveCamera(55, 1080 / 720, 20, 3000);
	camera.position.z = 1000;
	scene.add(camera);

	//lights	
	var light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0.5, 1, 1).normalize();
	scene.add(light);


	var renderModel = new THREE.RenderPass(scene, camera);
	var effectBloom = new THREE.BloomPass(1.3);
	var effectFilm = new THREE.FilmPass(.9, .3, 689, true);
	var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
	var effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
	var vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
	var badTVPass = new THREE.ShaderPass(THREE.BadTVShader);
	badTVPass.uniforms["distortion"].value = shaderParams.distortion;
	badTVPass.uniforms["distortion2"].value = shaderParams.distortion2;

	composer = new THREE.EffectComposer(renderer);

	composer.addPass(renderModel);
	composer.addPass(effectFilm);
	composer.addPass(badTVPass);
	vignettePass.uniforms["darkness"].value = 1.5;
	vignettePass.uniforms["offset"].value = 1;
	composer.addPass(vignettePass);

	var width = window.innerWidth || 2;
	var height = window.innerHeight || 2;
	effectFXAA.uniforms['resolution'].value.set(1 / width, 1 / height);
	composer.addPass(effectFXAA);

	composer.addPass(effectCopy);
	effectCopy.renderToScreen = true;

	$(window).resize(onResize);
	onResize();

	var presser = THREEx.Screenshot.bindKey(renderer, {
			charCode: 32
	});


	//40 = down
	// 32 = space

	$(document).on({
	
		
		keydown: function(e) {
			if (e.keyCode == '32') {
				if (downKeys['32'] == null) {					
					presser.takeScreenShot();

					downKeys['32'] = true;
				}
			}
			if (e.keyCode == '40') {
				if (downKeys['40'] == null) {

					TweenLite.to(material, 2, {opacity: 1});
					TweenLite.to(cover, .5, {scaleX:1.1, scaleY:1.1,opacity:0});
					TweenLite.fromTo(shaderParams, 1.5, {shaderTime:30},{
						shaderTime: .01,
						onUpdate: function() {
							badTVPass.uniforms["distortion"].value = shaderParams.shaderTime;
							badTVPass.uniforms["distortion2"].value = shaderParams.shaderTime;
							badTVPass.uniforms['time'].value = shaderParams.shaderTime;
						}
					});
					downKeys['40'] = true;
				}
			}

		},

		keyup: function(e) {

			if(e.keyCode == '32'){
				downKeys[e.keyCode] = null;
				presser.takeScreenShot();
			}

			if (e.keyCode == '40') {
				downKeys[e.keyCode] = null;
				TweenLite.to(cover, .5, {delay:.75,scaleX:1, scaleY:1,opacity:1});
				TweenLite.to(material, 1.5, {	opacity: 0	});
				TweenLite.fromTo(shaderParams, 2, {
					shaderTime: 1
				}, {
					shaderTime: 30,
					onUpdate: function() {
						badTVPass.uniforms["distortion"].value = shaderParams.shaderTime;
						badTVPass.uniforms["distortion2"].value = shaderParams.shaderTime;
						badTVPass.uniforms['time'].value = shaderParams.shaderTime;
					}
				});

			}
		}
	});



	if (hasGetUserMedia()) {


		var errorCallback = function(e) {
			console.log('Reeeejected!', e);
		};

		navigator.webkitGetUserMedia({
			video: true,
			audio: false
		}, function(localMediaStream) {
			video = document.getElementById('video');
			video.src = window.URL.createObjectURL(localMediaStream);


			video.onloadedmetadata = function(e) {
				// Ready to go. Do some stuff.

				var geometry = new THREE.PlaneGeometry(1080, 720, 1, 1);

				videoTexture = new THREE.Texture(video);
				videoTexture.minFilter = THREE.LinearFilter;
				videoTexture.magFilter = THREE.LinearFilter;


				material = new THREE.MeshLambertMaterial({
					map: videoTexture,
					transparent: true,


				});

				mesh = new THREE.Mesh(geometry, material);
				scene.add(mesh);
				mesh.z = 0;
				mesh.scale.x = mesh.scale.y = 1.45;


				animate();
			};
		}, errorCallback);

	} else {
		alert('getUserMedia() is not supported in your browser');
	}



	function animate() {

		requestAnimFrame(animate);
		draw();

	}

	function draw() {
		

		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			videoTexture.needsUpdate = true;
		}

		renderer.clear();
		composer.render(0.1);

	}



	function onResize() {

		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}


});
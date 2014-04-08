window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

    
function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}



/**
 * @author alteredq / http://alteredqualia.com/
 * Copy Shader
 * Full-screen textured quad shader
 */
THREE.CopyShader={uniforms:{tDiffuse:{type:"t",value:null},opacity:{type:"f",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float opacity;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"};


/**
 *  Effects Composer
 *  @author alteredq / http://alteredqualia.com/
 */

THREE.EffectComposer=function(a,b){this.renderer=a;void 0===b&&(b=new THREE.WebGLRenderTarget(window.innerWidth||1,window.innerHeight||1,{minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat,stencilBuffer:!1}));this.renderTarget1=b;this.renderTarget2=b.clone();this.writeBuffer=this.renderTarget1;this.readBuffer=this.renderTarget2;this.passes=[];void 0===THREE.CopyShader&&console.error("THREE.EffectComposer relies on THREE.CopyShader");this.copyPass=new THREE.ShaderPass(THREE.CopyShader)};
THREE.EffectComposer.prototype={swapBuffers:function(){var a=this.readBuffer;this.readBuffer=this.writeBuffer;this.writeBuffer=a},addPass:function(a){this.passes.push(a)},insertPass:function(a,b){this.passes.splice(b,0,a)},render:function(a){this.writeBuffer=this.renderTarget1;this.readBuffer=this.renderTarget2;var b=!1,c,d,f=this.passes.length;for(d=0;d<f;d++)if(c=this.passes[d],c.enabled){c.render(this.renderer,this.writeBuffer,this.readBuffer,a,b);if(c.needsSwap){if(b){var e=this.renderer.context;
e.stencilFunc(e.NOTEQUAL,1,4294967295);this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,a);e.stencilFunc(e.EQUAL,1,4294967295)}this.swapBuffers()}c instanceof THREE.MaskPass?b=!0:c instanceof THREE.ClearMaskPass&&(b=!1)}},reset:function(a){void 0===a&&(a=this.renderTarget1.clone(),a.width=window.innerWidth,a.height=window.innerHeight);this.renderTarget1=a;this.renderTarget2=a.clone();this.writeBuffer=this.renderTarget1;this.readBuffer=this.renderTarget2},setSize:function(a,b){var c=
this.renderTarget1.clone();c.width=a;c.height=b;this.reset(c)}};THREE.EffectComposer.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);THREE.EffectComposer.quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),null);THREE.EffectComposer.scene=new THREE.Scene;THREE.EffectComposer.scene.add(THREE.EffectComposer.quad);

/**
 *  Render Pass
 *  @author alteredq / http://alteredqualia.com/
 */
THREE.RenderPass=function(a,c,b,d,e){this.scene=a;this.camera=c;this.overrideMaterial=b;this.clearColor=d;this.clearAlpha=void 0!==e?e:1;this.oldClearColor=new THREE.Color;this.oldClearAlpha=1;this.clear=this.enabled=!0;this.needsSwap=!1};
THREE.RenderPass.prototype={render:function(a,c,b,d){this.scene.overrideMaterial=this.overrideMaterial;this.clearColor&&(this.oldClearColor.copy(a.getClearColor()),this.oldClearAlpha=a.getClearAlpha(),a.setClearColor(this.clearColor,this.clearAlpha));a.render(this.scene,this.camera,b,this.clear);this.clearColor&&a.setClearColor(this.oldClearColor,this.oldClearAlpha);this.scene.overrideMaterial=null}};

/**
 *  Shader Pass
 *  @author alteredq / http://alteredqualia.com/
 */

THREE.ShaderPass=function(a,b){this.textureID=void 0!==b?b:"tDiffuse";this.uniforms=THREE.UniformsUtils.clone(a.uniforms);this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader});this.renderToScreen=!1;this.needsSwap=this.enabled=!0;this.clear=!1};
THREE.ShaderPass.prototype={render:function(a,b,c,d){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=c);THREE.EffectComposer.quad.material=this.material;this.renderToScreen?a.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera):a.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,b,this.clear)}};


/**
 *  Mask Pass
 *  @author alteredq / http://alteredqualia.com/
 */

THREE.MaskPass=function(b,c){this.scene=b;this.camera=c;this.clear=this.enabled=!0;this.inverse=this.needsSwap=!1};
THREE.MaskPass.prototype={render:function(b,c,f,a){a=b.context;a.colorMask(!1,!1,!1,!1);a.depthMask(!1);var d,e;this.inverse?(d=0,e=1):(d=1,e=0);a.enable(a.STENCIL_TEST);a.stencilOp(a.REPLACE,a.REPLACE,a.REPLACE);a.stencilFunc(a.ALWAYS,d,4294967295);a.clearStencil(e);b.render(this.scene,this.camera,f,this.clear);b.render(this.scene,this.camera,c,this.clear);a.colorMask(!0,!0,!0,!0);a.depthMask(!0);a.stencilFunc(a.EQUAL,1,4294967295);a.stencilOp(a.KEEP,a.KEEP,a.KEEP)}};
THREE.ClearMaskPass=function(){this.enabled=!0};THREE.ClearMaskPass.prototype={render:function(b,c,f,a){b=b.context;b.disable(b.STENCIL_TEST)}};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader 
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

THREE.FilmShader={uniforms:{tDiffuse:{type:"t",value:null},time:{type:"f",value:0},nIntensity:{type:"f",value:0.5},sIntensity:{type:"f",value:0.05},sCount:{type:"f",value:4096},grayscale:{type:"i",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"};


/**
 * Film Pass
 * @author alteredq / http://alteredqualia.com/
 */


THREE.FilmPass=function(a,b,c,d){void 0===THREE.FilmShader&&console.error("THREE.FilmPass relies on THREE.FilmShader");var e=THREE.FilmShader;this.uniforms=THREE.UniformsUtils.clone(e.uniforms);this.material=new THREE.ShaderMaterial({uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader});void 0!==d&&(this.uniforms.grayscale.value=d);void 0!==a&&(this.uniforms.nIntensity.value=a);void 0!==b&&(this.uniforms.sIntensity.value=b);void 0!==c&&(this.uniforms.sCount.value=c);
this.enabled=!0;this.renderToScreen=!1;this.needsSwap=!0};THREE.FilmPass.prototype={render:function(a,b,c,d){this.uniforms.tDiffuse.value=c;this.uniforms.time.value+=d;THREE.EffectComposer.quad.material=this.material;this.renderToScreen?a.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera):a.render(THREE.EffectComposer.scene,THREE.EffectComposer.camera,b,!1)}};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Convolution shader
 * ported from o3d sample to WebGL / GLSL
 * http://o3d.googlecode.com/svn/trunk/samples/convolution.html
 */

THREE.ConvolutionShader={defines:{KERNEL_SIZE_FLOAT:"25.0",KERNEL_SIZE_INT:"25"},uniforms:{tDiffuse:{type:"t",value:null},uImageIncrement:{type:"v2",value:new THREE.Vector2(0.001953125,0)},cKernel:{type:"fv1",value:[]}},vertexShader:"uniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\nvUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float cKernel[ KERNEL_SIZE_INT ];\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nvarying vec2 vUv;\nvoid main() {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}",
buildKernel:function(f){var a,b,e,g,c=2*Math.ceil(3*f)+1;25<c&&(c=25);g=0.5*(c-1);b=Array(c);for(a=e=0;a<c;++a){var h=b,k=a,d;d=a-g;d=Math.exp(-(d*d)/(2*f*f));h[k]=d;e+=b[a]}for(a=0;a<c;++a)b[a]/=e;return b}};



/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */
THREE.HorizontalTiltShiftShader={uniforms:{tDiffuse:{type:"t",value:null},h:{type:"f",value:1/512},r:{type:"f",value:0.35}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D tDiffuse;\nuniform float h;\nuniform float r;\nvarying vec2 vUv;\nvoid main() {\nvec4 sum = vec4( 0.0 );\nfloat hh = h * abs( r - vUv.y );\nsum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * hh, vUv.y ) ) * 0.051;\nsum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * hh, vUv.y ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * hh, vUv.y ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * hh, vUv.y ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\nsum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * hh, vUv.y ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * hh, vUv.y ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * hh, vUv.y ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * hh, vUv.y ) ) * 0.051;\ngl_FragColor = sum;\n}"};

/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Simple fake tilt-shift effect, modulating two pass Gaussian blur (see above) by vertical position
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 * - "r" parameter control where "focused" horizontal line lies
 */
THREE.VerticalTiltShiftShader={uniforms:{tDiffuse:{type:"t",value:null},v:{type:"f",value:1/512},r:{type:"f",value:0.35}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D tDiffuse;\nuniform float v;\nuniform float r;\nvarying vec2 vUv;\nvoid main() {\nvec4 sum = vec4( 0.0 );\nfloat vv = v * abs( r - vUv.y );\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918;\nsum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051;\ngl_FragColor = sum;\n}"};



/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Bloom shader
 */

THREE.BloomPass=function(a,d,c,b){a=void 0!==a?a:1;d=void 0!==d?d:25;c=void 0!==c?c:4;b=void 0!==b?b:256;var e={minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter,format:THREE.RGBFormat};this.renderTargetX=new THREE.WebGLRenderTarget(b,b,e);this.renderTargetY=new THREE.WebGLRenderTarget(b,b,e);void 0===THREE.CopyShader&&console.error("THREE.BloomPass relies on THREE.CopyShader");b=THREE.CopyShader;this.copyUniforms=THREE.UniformsUtils.clone(b.uniforms);this.copyUniforms.opacity.value=a;this.materialCopy=
new THREE.ShaderMaterial({uniforms:this.copyUniforms,vertexShader:b.vertexShader,fragmentShader:b.fragmentShader,blending:THREE.AdditiveBlending,transparent:!0});void 0===THREE.ConvolutionShader&&console.error("THREE.BloomPass relies on THREE.ConvolutionShader");a=THREE.ConvolutionShader;this.convolutionUniforms=THREE.UniformsUtils.clone(a.uniforms);this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurx;this.convolutionUniforms.cKernel.value=THREE.ConvolutionShader.buildKernel(c);this.materialConvolution=
new THREE.ShaderMaterial({uniforms:this.convolutionUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,defines:{KERNEL_SIZE_FLOAT:d.toFixed(1),KERNEL_SIZE_INT:d.toFixed(0)}});this.enabled=!0;this.clear=this.needsSwap=!1;this.camera=new THREE.OrthographicCamera(-1,1,1,-1,0,1);this.scene=new THREE.Scene;this.quad=new THREE.Mesh(new THREE.PlaneGeometry(2,2),null);this.scene.add(this.quad)};
THREE.BloomPass.prototype={render:function(a,d,c,b,e){e&&a.context.disable(a.context.STENCIL_TEST);this.quad.material=this.materialConvolution;this.convolutionUniforms.tDiffuse.value=c;this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurX;a.render(this.scene,this.camera,this.renderTargetX,!0);this.convolutionUniforms.tDiffuse.value=this.renderTargetX;this.convolutionUniforms.uImageIncrement.value=THREE.BloomPass.blurY;a.render(this.scene,this.camera,this.renderTargetY,!0);this.quad.material=
this.materialCopy;this.copyUniforms.tDiffuse.value=this.renderTargetY;e&&a.context.enable(a.context.STENCIL_TEST);a.render(this.scene,this.camera,c,this.clear)}};THREE.BloomPass.blurX=new THREE.Vector2(0.001953125,0);THREE.BloomPass.blurY=new THREE.Vector2(0,0.001953125);


/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Vignette shader
 * based on PaintEffect postprocess from ro.me
 * http://code.google.com/p/3-dreams-of-black/source/browse/deploy/js/effects/PaintEffect.js
 */

THREE.VignetteShader={uniforms:{tDiffuse:{type:"t",value:null},offset:{type:"f",value:1},darkness:{type:"f",value:1}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform float offset;\nuniform float darkness;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\nvec2 uv = ( vUv - vec2( 0.5 ) ) * vec2( offset );\ngl_FragColor = vec4( mix( texel.rgb, vec3( 1.0 - darkness ), dot( uv, uv ) ), texel.a );\n}"};

/**
 * @author alteredq / http://alteredqualia.com/
 * @author davidedc / http://www.sketchpatch.net/
 *
 * NVIDIA FXAA by Timothy Lottes
 * http://timothylottes.blogspot.com/2011/06/fxaa3-source-released.html
 * - WebGL port by @supereggbert
 * http://www.glge.org/demos/fxaa/
 */
THREE.FXAAShader={uniforms:{tDiffuse:{type:"t",value:null},resolution:{type:"v2",value:new THREE.Vector2(1/1024,1/512)}},vertexShader:"varying vec2 vUv;\nvoid main() {\nvUv = uv;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",fragmentShader:"uniform sampler2D tDiffuse;\nuniform vec2 resolution;\nvarying vec2 vUv;\n#define FXAA_REDUCE_MIN   (1.0/128.0)\n#define FXAA_REDUCE_MUL   (1.0/8.0)\n#define FXAA_SPAN_MAX     8.0\nvoid main() {\nvec3 rgbNW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ).xyz;\nvec3 rgbNE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ).xyz;\nvec3 rgbSW = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ).xyz;\nvec3 rgbSE = texture2D( tDiffuse, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ).xyz;\nvec4 rgbaM  = texture2D( tDiffuse,  gl_FragCoord.xy  * resolution );\nvec3 rgbM  = rgbaM.xyz;\nfloat opacity  = rgbaM.w;\nvec3 luma = vec3( 0.299, 0.587, 0.114 );\nfloat lumaNW = dot( rgbNW, luma );\nfloat lumaNE = dot( rgbNE, luma );\nfloat lumaSW = dot( rgbSW, luma );\nfloat lumaSE = dot( rgbSE, luma );\nfloat lumaM  = dot( rgbM,  luma );\nfloat lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );\nfloat lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );\nvec2 dir;\ndir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\ndir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\nfloat dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );\nfloat rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );\ndir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),\nmax( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\ndir * rcpDirMin)) * resolution;\nvec3 rgbA = texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz;\nrgbA += texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz;\nrgbA *= 0.5;\nvec3 rgbB = texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * -0.5 ).xyz;\nrgbB += texture2D( tDiffuse, gl_FragCoord.xy  * resolution + dir * 0.5 ).xyz;\nrgbB *= 0.25;\nrgbB += rgbA * 0.5;\nfloat lumaB = dot( rgbB, luma );\nif ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {\ngl_FragColor = vec4( rgbA, opacity );\n} else {\ngl_FragColor = vec4( rgbB, opacity );\n}\n}"};




/**
 * @author Felix Turner / www.airtight.cc / @felixturner
 *
 * Bad TV Shader
 * Simulates a bad TV via horizontal distortion and vertical roll
 * Uses Ashima WebGl Noise: https://github.com/ashima/webgl-noise
 *
 * time: steadily increasing float passed in
 * distortion: amount of thick distortion
 * distortion2: amount of fine grain distortion
 * speed: distortion vertical travel speed
 * rollSpeed: vertical roll speed
 * 
 * The MIT License
 * 
 * Copyright (c) 2014 Felix Turner
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */

THREE.BadTVShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"time":     { type: "f", value: 0.0 },
		"distortion":     { type: "f", value: 3.0 },
		"distortion2":     { type: "f", value: 5.0 },
		"speed":     { type: "f", value: 0.2 },
		"rollSpeed":     { type: "f", value: 0.1 },
	},

	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join("\n"),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float time;",
		"uniform float distortion;",
		"uniform float distortion2;",
		"uniform float speed;",
		"uniform float rollSpeed;",
		"varying vec2 vUv;",
		
		// Start Ashima 2D Simplex Noise

		"vec3 mod289(vec3 x) {",
		"  return x - floor(x * (1.0 / 289.0)) * 289.0;",
		"}",

		"vec2 mod289(vec2 x) {",
		"  return x - floor(x * (1.0 / 289.0)) * 289.0;",
		"}",

		"vec3 permute(vec3 x) {",
		"  return mod289(((x*34.0)+1.0)*x);",
		"}",

		"float snoise(vec2 v)",
		"  {",
		"  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0",
		"                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)",
		"                     -0.577350269189626,  // -1.0 + 2.0 * C.x",
		"                      0.024390243902439); // 1.0 / 41.0",
		"  vec2 i  = floor(v + dot(v, C.yy) );",
		"  vec2 x0 = v -   i + dot(i, C.xx);",

		"  vec2 i1;",
		"  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);",
		"  vec4 x12 = x0.xyxy + C.xxzz;",
		" x12.xy -= i1;",

		"  i = mod289(i); // Avoid truncation effects in permutation",
		"  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))",
		"		+ i.x + vec3(0.0, i1.x, 1.0 ));",

		"  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);",
		"  m = m*m ;",
		"  m = m*m ;",

		"  vec3 x = 2.0 * fract(p * C.www) - 1.0;",
		"  vec3 h = abs(x) - 0.5;",
		"  vec3 ox = floor(x + 0.5);",
		"  vec3 a0 = x - ox;",

		"  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );",

		"  vec3 g;",
		"  g.x  = a0.x  * x0.x  + h.x  * x0.y;",
		"  g.yz = a0.yz * x12.xz + h.yz * x12.yw;",
		"  return 130.0 * dot(m, g);",
		"}",

		// End Ashima 2D Simplex Noise

		"void main() {",

			"vec2 p = vUv;",
			"float ty = time*speed;",
			"float yt = p.y - ty;",

			//smooth distortion
			"float offset = snoise(vec2(yt*3.0,0.0))*0.2;",
			// boost distortion
			"offset = pow( offset*distortion,3.0)/distortion;",
			//add fine grain distortion
			"offset += snoise(vec2(yt*50.0,0.0))*distortion2*0.001;",
			//combine distortion on X with roll on Y
			"gl_FragColor = texture2D(tDiffuse,  vec2(fract(p.x + offset),fract(p.y-time*rollSpeed) ));",

		"}"

	].join("\n")

};

/** @namespace */
var THREEx	= THREEx 		|| {};

// TODO http://29a.ch/2011/9/11/uploading-from-html5-canvas-to-imgur-data-uri
// able to upload your screenshot without running servers

// forced closure
(function(){

	/**
	 * Take a screenshot of a renderer
	 * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
	 * - TODO is it possible to check if this variable is set ? if so check it
	 *   and make advice in the console.log
	 *   - maybe with direct access to the gl context...
	 * 
	 * @param {Object} renderer to use
	 * @param {String} mimetype of the output image. default to "image/png"
	 * @param {String} dataUrl of the image
	*/
	var toDataURL	= function(renderer, mimetype)
	{
		mimetype	= mimetype	|| "image/png";
		var dataUrl	= renderer.domElement.toDataURL(mimetype);
		return dataUrl;
	}

	/**
	 * resize an image to another resolution while preserving aspect
	 *
	 * @param {String} srcUrl the url of the image to resize
	 * @param {Number} dstWidth the destination width of the image
	 * @param {Number} dstHeight the destination height of the image
	 * @param {Number} callback the callback to notify once completed with callback(newImageUrl)
	*/
	var _aspectResize	= function(srcUrl, dstW, dstH, callback){
		// to compute the width/height while keeping aspect
		var cpuScaleAspect	= function(maxW, maxH, curW, curH){
			var ratio	= curH / curW;
			if( curW >= maxW && ratio <= 1 ){ 
				curW	= maxW;
				curH	= maxW * ratio;
			}else if(curH >= maxH){
				curH	= maxH;
				curW	= maxH / ratio;
			}
			return { width: curW, height: curH };
		}
		// callback once the image is loaded
		var onLoad	= function(){
			// init the canvas
			var canvas	= document.createElement('canvas');
			canvas.width	= dstW;	canvas.height	= dstH;
			var ctx		= canvas.getContext('2d');

			// TODO is this needed
			ctx.fillStyle	= "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// scale the image while preserving the aspect
			var scaled	= cpuScaleAspect(canvas.width, canvas.height, image.width, image.height);

			// actually draw the image on canvas
			var offsetX	= (canvas.width  - scaled.width )/2;
			var offsetY	= (canvas.height - scaled.height)/2;
			ctx.drawImage(image, offsetX, offsetY, scaled.width, scaled.height);

			// dump the canvas to an URL		
			var mimetype	= "image/png";
			var newDataUrl	= canvas.toDataURL(mimetype);
			// notify the url to the caller
			callback && callback(newDataUrl)
		}.bind(this);

		// Create new Image object
		var image 	= new Image();
		image.onload	= onLoad;
		image.src	= srcUrl;
	}
	

	// Super cooked function: THREEx.Screenshot.bindKey(renderer)
	// and you are done to get screenshot on your demo

	/**
	 * Bind a key to renderer screenshot
	*/
	var bindKey	= function(renderer, opts){
		// handle parameters
		opts		= opts		|| {};
		var charCode	= opts.charCode	|| 'p'.charCodeAt(0);
		var width	= opts.width;
		var height	= opts.height;
		var callback	= opts.callback	|| function(url){
			window.open(url, "name-"+Math.random());
		};

		// callback to handle keypress
		var onKeyPress	= function(event){
			// return now if the KeyPress isnt for the proper charCode
		//	if( event.which !== charCode )	return;
			// get the renderer output
			var dataUrl	= this.toDataURL(renderer);

			if( width === undefined && height === undefined ){
				callback( dataUrl )
			}else{
				// resize it and notify the callback
				// * resize == async so if callback is a window open, it triggers the pop blocker
				_aspectResize(dataUrl, width, height, callback);				
			}
		}.bind(this);

		// listen to keypress
		// NOTE: for firefox it seems mandatory to listen to document directly
		//document.addEventListener('keypress', onKeyPress, false);

		return {
			unbind	: function(){
				document.removeEventListener('keypress', onKeyPress, false);
			},
			takeScreenShot: function () {
				onKeyPress();
			}
		};
	}

	// export it	
	THREEx.Screenshot	= {
		toDataURL	: toDataURL,
		bindKey		: bindKey
	};
})();
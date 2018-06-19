(function(){

	var container, stats;

	var camera, scene, renderer, effect, controls, ambientGlobal, objectGlobal, rotateObjectInterval, rotateObjectIntervalInner, directionalLight;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;



	init();

	function init() {

		container = document.getElementsByClassName('webGlHandler')[0];
		//document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 45;
		
		controls = new THREE.TrackballControls( camera, container.parentNode );
		controls.rotateSpeed = 4.5; 
		controls.zoomSpeed = isMousedown ? 1.2 : 0.3;
		controls.panSpeed = 0.1;

		controls.noZoom = false;
		controls.noPan = false;

		controls.staticMoving = true;
		controls.dynamicDampingFactor = 0.3;

		// scene

		scene = new THREE.Scene();
			
		var ambient = new THREE.AmbientLight( ambientColor, ambientIntensity );
		scene.add( ambient );
		
		
		directionalLight = new THREE.DirectionalLight( directionalColor, directionalIntensity );
		directionalLight.position.set( 0, 0, 1 ).normalize();
		scene.add( directionalLight );
		
		
		// model

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				//var percentComplete = xhr.loaded / xhr.total * 100;
				//console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) { };

		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath( './objects/' );
		mtlLoader.load( model + '.mtl', function( materials ) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( './objects/' );
			objLoader.load( model + '.obj', function ( object ) {

				container.parentNode.style.background = 'none';
				container.parentNode.style.backgroundColor = '#000';

				objectGlobal = object;
			
				//object.children[0].geometry.center();
				
				scene.add( object );

				animate();
				//rotateObject();

				container.addEventListener( edown, onDocumentMouseDown, false );
				container.addEventListener( 'dblclick', resetObject, false );

			}, onProgress, onError );

		});

		//

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		container.appendChild( renderer.domElement );

		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function onDocumentMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;

	}

	function stopObjectRotation () {
		window.cancelAnimationFrame(rotateObjectInterval);
		rotateObjectInterval = null;
		clearTimeout(rotateObjectIntervalInner);
	}

	function onDocumentMouseDown (event) {

		if(rotateObjectInterval){
			stopObjectRotation();
			rotateObjectIntervalInner = setTimeout(rotateObject,3000);
		}

	}

	function resetObject () {

		clearTimeout(rotateObjectIntervalInner);
		rotateObjectIntervalInner = setTimeout(rotateObject,3000);

		TweenLite.to(camera.position,0.5,{'z':controls.position0.z});

	}


	//

	function animate() {

		requestAnimationFrame( animate );
		render();

	}

	function render() {
		
		directionalLight.position.set(camera.position.x,camera.position.y,camera.position.z);
		controls.update();	
		camera.lookAt( scene.position );	
		renderer.render( scene, camera );

	}

	function rotateObject() {

		rotateObjectInterval = requestAnimationFrame(rotateObject);
		objectGlobal.rotation.y += 0.001;
		renderer.render(scene, camera);

	}

	function audioPlayerInit() {

		if(audioPlayer.paused){

			audioPlayer.play();
			rotateObject();
			headerCustomHandle.querySelector('.copyright-handle-custom').classList.add('copyright-handle-active');

			return;

			}

		audioPlayer.pause();
		stopObjectRotation();
		headerCustomHandle.querySelector('.copyright-handle-custom').classList.remove('copyright-handle-active');

	}

	var audioPlayer = document.getElementById('audio-player'),
		headerCustomHandle = document.querySelector('.header-custom-handle');

	$('.header-custom-handle').click(function(e){

		e.preventDefault();

		audioPlayerInit();

	});

	window.addEventListener('keydown', function(e){

		if(e.keyCode == 32){

			e.preventDefault();

			audioPlayerInit();

		}

	});

})();



(function(){

	if(window.innerWidth > 768) return;

	var container, stats;

	var camera, scene, renderer, effect, controls, ambientGlobal, objectGlobal, rotateObjectInterval, rotateObjectIntervalInner, directionalLight;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;


	init();
	animate();

	function init() {

		container = document.getElementsByClassName('webGlHandler')[1];
		//document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 1, 2000 );
		camera.position.z = 45;
		
		// scene

		scene = new THREE.Scene();
			
		var ambient = new THREE.AmbientLight( ambientColor, ambientIntensity );
		scene.add( ambient );
				
		directionalLight = new THREE.DirectionalLight( directionalColor, directionalIntensity );
		directionalLight.position.set( 0, 0, 1 ).normalize();
		scene.add( directionalLight );

		// model

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				//var percentComplete = xhr.loaded / xhr.total * 100;
				//console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) { };

		THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setPath( './objects/' );
		mtlLoader.load( model + '.mtl', function( materials ) {

			materials.preload();

			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials( materials );
			objLoader.setPath( './objects/' );
			objLoader.load( model + '.obj', function ( object ) {

				container.parentNode.style.background = 'none';
				container.parentNode.style.backgroundColor = '#000';

				objectGlobal = object;
			
				//object.children[0].geometry.center();
				
				scene.add( object );

			}, onProgress, onError );

		});

		//

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );

		effect = new THREE.StereoEffect(renderer);
		//effect.setSize( window.innerWidth, window.innerHeight );

		/*
		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.target.set(
			camera.position.x + 0.15,
			camera.position.y,
			camera.position.z
		);
		controls.enablePan = false;
		controls.enableZoom = false;
		*/

		container.appendChild( renderer.domElement );

		//document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				
		window.addEventListener('deviceorientation', setOrientationControls, true);

		//

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		effect.setSize( window.innerWidth, window.innerHeight );
		renderer.setSize( window.innerWidth, window.innerHeight );

	}

	function onDocumentMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / 2;
		mouseY = ( event.clientY - windowHalfY ) / 2;

	}

	function setOrientationControls(e) {
		
		if (!e.alpha) return;

		controls = new THREE.DeviceOrientationControls(camera, true);
		controls.connect();
		controls.update();

		window.removeEventListener('deviceorientation', setOrientationControls, true);

	}

	//

	function animate() {

		requestAnimationFrame( animate );
		render();

	}

	function render() {

		if(controls) controls.update();		
        camera.updateProjectionMatrix();

		/*
		camera.position.x += ( mouseX - camera.position.x ) * .07;
		camera.position.y += ( - mouseY - camera.position.y ) * .07;
		*/

		directionalLight.position.set(camera.position.x,camera.position.y,camera.position.z);
		//camera.lookAt( scene.position );
		effect.render(scene, camera);	
		//renderer.render( scene, camera );

	}

})();
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xbad4ff);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .9, 50 );



var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var flakeCount = 9000;
var flakeGeometry = new THREE.TetrahedronGeometry(.035); //RADIUS
var flakeMaterial = new THREE.MeshPhongMaterial({ color: 0xFFFFFF});
var snow = new THREE.Group();

//SNOW
for ( let i = 0; i < flakeCount; i++ ) {
	var flakeMesh = new THREE.Mesh(flakeGeometry, flakeMaterial);
	flakeMesh.position.set((Math.random() - 0.5) * 40,
	                       (Math.random() - 0.5) * 20,
	                       (Math.random() - 0.5) * 40);
	snow.add(flakeMesh);
}
scene.add(snow);

var flakeArray = snow.children;

//GROUND
var groundGeometry = new THREE.CircleGeometry(20, 50);
var groundMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -1.8;
ground.rotation.x = -Math.PI/2;
scene.add(ground);

//SNOWMAN
// var snowman = new THREE.Group();

// var snowmanBottomGeometry = new THREE.IcosahedronGeometry( 1, 1 ); // radius =100, add vertice = 1 for circle
// var snowmanMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF });
// var snowmanBottom = new THREE.Mesh(snowmanBottomGeometry, snowmanMaterial);
// snowmanBottom.position.y = -.7;
// snowman.add(snowmanBottom);

// var snowmanMiddleGeometry = new THREE.IcosahedronGeometry( .8, 1 );
// var snowmanMiddle = new THREE.Mesh(snowmanMiddleGeometry, snowmanMaterial);
// snowmanMiddle.position.y = .6;
// snowman.add(snowmanMiddle);

// var snowmanTopGeometry = new THREE.IcosahedronGeometry(.5, 1);
// var snowmanTop = new THREE.Mesh(snowmanTopGeometry, snowmanMaterial);
// snowmanTop.position.y = 1.6;
// snowman.add(snowmanTop);

// snowman.position.y = -.3;
// snowman.position.x = 0;
// snowman.position.z = 0
// scene.add(snowman);
//TREE
for (i = 0; i < 50; i++){
	var tree = new THREE.Group();
	var trunkGeometry = new THREE.CylinderGeometry(.2, .2, 1,)
	var trunkMaterial = new THREE.MeshPhongMaterial({color: 0x49311C})
	var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
	tree.add(trunk);

	var leavesGeometry = new THREE.ConeGeometry(1.2, 2);
	var leavesMaterial = new THREE.MeshPhongMaterial({color: 0x3d5e3a})
	var leavesBottom = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leavesBottom.position.y = 1.2;
	tree.add(leavesBottom);

	var leavesMiddle = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leavesMiddle.position.y = 2.2;
	tree.add(leavesMiddle);

	var leavesTop = new THREE.Mesh(leavesGeometry, leavesMaterial);
	leavesTop.position.y = 3.2;
	tree.add(leavesTop);



	tree.position.x = (Math.random() - 0.5) * 25;
	tree.position.z = (Math.random() - 0.5) * 25;
	tree.position.y = -1.3;
	scene.add(tree);
}





var rightLight = new THREE.PointLight(0xFFFFFF, .3, 0);
rightLight.position.set(10, 20, 7);

var leftLight = new THREE.PointLight(0xFFFFFF, .3, 0);
leftLight.position.set(-10, 20, 7);


var ambientLight = new THREE.AmbientLight(0xFFFFFF, .8);
scene.add( rightLight );
scene.add( leftLight );
scene.add(ambientLight);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 20;
camera.position.y = 1;
controls.update();



var animate = function () {
	requestAnimationFrame( animate );

	for (i = 0; i < flakeArray.length/2; i++) {
		flakeArray[i].rotation.y += .01;
		flakeArray[i].rotation.x += .02;
		flakeArray[i].rotation.z += .03;
		flakeArray[i].position.y -= .018;
		if ( flakeArray[i].position.y < -4){
			flakeArray[i].position.y += 10;
		}
	}
	for (i = flakeArray.length/2; i < flakeArray.length; i++) {
		flakeArray[i].rotation.y -= .03;
		flakeArray[i].rotation.x -= .03;
		flakeArray[i].rotation.z -= .02;
		flakeArray[i].position.y -= .016;
		if ( flakeArray[i].position.y < -4){
			flakeArray[i].position.y += 9.5;
		}
	}
	controls.update();

	renderer.render(scene, camera);
};

animate();
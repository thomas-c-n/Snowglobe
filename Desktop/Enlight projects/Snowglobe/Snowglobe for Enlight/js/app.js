var scene = new THREE.Scene();
scene.background = new THREE.Color(0xbad4ff);

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 50 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var tree = new THREE.Group();
var trunkGeometry = new THREE.CylinderGeometry(.2, .2, 1,)
var trunkMaterial = new THREE.MeshPhongMaterial({color: 0x49311C})
var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
tree.add(trunk);

var leavesGeometry = new THREE.ConeGeometry(1.2, 2, 6);
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



tree.position.y = -1.3;
scene.add(tree);

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
var groundGeometry = new THREE.CircleGeometry(10, 50);
var groundMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.position.y = -1.8;
ground.rotation.x = -Math.PI/2;
scene.add(ground);








var rightLight = new THREE.PointLight(0xFFFFFF, .3, 0);
rightLight.position.set(10, 20, 7);

var leftLight = new THREE.PointLight(0xFFFFFF, .3, 0);
leftLight.position.set(-10, 20, 7);


var ambientLight = new THREE.AmbientLight(0xFFFFFF, .8);
scene.add( rightLight );
scene.add( leftLight );
scene.add(ambientLight);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 14;
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

		snow.rotation.y -= .0000002;
	}
	controls.update();

	renderer.render(scene, camera);
};

animate();
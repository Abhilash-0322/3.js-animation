import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	 // Change the color based on rotation
	 const time = Date.now() * 0.001; // Get current time in seconds
	 const colorValue = (Math.sin(time) + 1) / 2; // Adjust the color based on sine function
	 cube.material.color.setRGB(colorValue, 1 - colorValue, 0.5);

	renderer.render( scene, camera );
}

animate();
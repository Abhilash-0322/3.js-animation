import * as THREE from 'three';

// Create Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Circle Geometry and Material
const radius = 2; // Set the radius of the circle
const segments = 32; // Number of segments in the circle
const geometry = new THREE.CircleGeometry(radius, segments);
const material = new THREE.MeshBasicMaterial({ color: 0x9f00ff }); // Red color

// Create Circle Mesh and Add to Scene
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);

// Set Camera Position
camera.position.z = 5;

// Animate the Scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the circle (optional)
    circle.rotation.x += 0.01;
    circle.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

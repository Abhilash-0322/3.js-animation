import * as THREE from 'three';

// Create Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load an Image Texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('Screenshot 2023-06-10 154054.png'); // Replace with the path to your image

// Create Plane Geometry with Image Texture
const width = 4; // Set the width of the plane
const height = 3; // Set the height of the plane
const geometry = new THREE.PlaneGeometry(width, height);
const material = new THREE.MeshBasicMaterial({ map: texture });

// Create Mesh and Add to Scene
const imagePlane = new THREE.Mesh(geometry, material);
scene.add(imagePlane);

// Set Camera Position
camera.position.z = 5;

// Animate the Scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the image (optional)
    imagePlane.rotation.x += 0.01;
    imagePlane.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
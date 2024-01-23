import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cubes with Phong material and add them to the scene
const cubes = [];
const cubeCount = 100;

for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: getRandomColor(), transparent: true, opacity: 0.8 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
    );
    cube.rotation.set(Math.random(), Math.random(), Math.random());
    cubes.push(cube);
    scene.add(cube);
}

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add directional light with shadow
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Enable shadow maps
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Position the camera
camera.position.z = 30;

// Create an animate function
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate all cubes
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    // Render the scene
    renderer.render(scene, camera);
};

// Run the animate function
animate();

// Helper function to get a random color
function getRandomColor() {
    return Math.random() * 0xFFFFFF;
}

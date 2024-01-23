import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create cubes with random colors and add them to the scene
const cubes = [];
const cubeCount = 100;
for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: getRandomColor(), transparent: true, opacity: 0.8 });
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

// Add particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);

const particlesPositions = new Float32Array(cubeCount * 3);

for (let i = 0; i < cubeCount; i++) {
    const phi = Math.acos(-1 + (2 * i) / cubeCount);
    const theta = Math.sqrt(cubeCount * Math.PI) * phi;

    const x = 15 * Math.sin(phi) * Math.cos(theta);
    const y = 15 * Math.sin(phi) * Math.sin(theta);
    const z = 15 * Math.cos(phi);

    particlesPositions[i * 3] = x;
    particlesPositions[i * 3 + 1] = y;
    particlesPositions[i * 3 + 2] = z;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

scene.add(particles);

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

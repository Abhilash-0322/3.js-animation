import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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
    cubes.push(cube);
    scene.add(cube);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

camera.position.z = 30;

const animate = function () {
    requestAnimationFrame(animate);

    // Rotate cubes in a more intense and turbulent motion
    cubes.forEach((cube, index) => {
        const speed = 0.03;
        const turbulence = 0.5;
        const angle = index * speed;
        const radius = 10;
        const height = Math.sin(angle) * radius * turbulence;
        const rotation = angle;

        cube.position.y = height;
        cube.rotation.x = rotation;
        cube.rotation.y += 0.20;
    });

    renderer.render(scene, camera);
};

animate();

function getRandomColor() {
    return Math.random() * 0xFFFFFF;
}

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Torus Knot
const torusKnotGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusKnotMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, shininess: 100 });
const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
scene.add(torusKnot);

// Cubes
const cubes = [];
const cubeCount = 100;
for (let i = 0; i < cubeCount; i++) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: getRandomColor(), metalness: 0.5, roughness: 0.5 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
    );
    cube.rotation.set(Math.random(), Math.random(), Math.random());
    cubes.push(cube);
    scene.add(cube);
}

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

camera.position.z = 30;

const animate = function () {
    requestAnimationFrame(animate);

    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;

    renderer.render(scene, camera);
};

animate();

function getRandomColor() {
    return Math.random() * 0xFFFFFF;
}

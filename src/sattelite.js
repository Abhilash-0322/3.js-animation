import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const objLoader = new OBJLoader();

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Starfield background
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });

const starsVertices = [];
for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Earth Sphere with texture
const earthGeometry = new THREE.SphereGeometry(15, 64, 64);
const earthTexture = new THREE.TextureLoader().load('src/Screenshot 2024-01-24 020631.png');
const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Moon orbiting Earth
const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Satellite material with texture
const satelliteTexture = new THREE.TextureLoader().load('src/Screenshot 2024-01-24 025907.png');
const satelliteMaterial = new THREE.MeshPhongMaterial({
    map: satelliteTexture,
    color: 0xffffff,
    specular: 0x222222,
    shininess: 25,
    emissive: 0x000000,
});

const satelliteGeometry = new THREE.SphereGeometry(0.5, 32, 32);
// Satellites
const satellites = [];
const satelliteCount = 50;

for (let i = 0; i < satelliteCount; i++) {
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    const angle = (i / satelliteCount) * Math.PI * 2;
    const orbitRadius = 20 + Math.random() * 10;

    satellite.position.x = Math.cos(angle) * orbitRadius;
    satellite.position.z = Math.sin(angle) * orbitRadius;

    scene.add(satellite);
    satellites.push(satellite);
}

// Glowing Ring (optional)
const ringGeometry = new THREE.RingGeometry(18, 20, 64);
const ringMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec2 resolution;

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / min(resolution.y, resolution.x);
            float d = length(uv);
            vec3 color = vec3(0.0);
            if (d > 0.3 && d < 0.4) {
                color = vec3(0.0, 1.0, 0.0);
            }
            gl_FragColor = vec4(color, 1.0);
        }
    `,
});
const glowingRing = new THREE.Mesh(ringGeometry, ringMaterial);
glowingRing.rotation.x = Math.PI / 2;
scene.add(glowingRing);

// Particle Cloud (optional)
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
const particles = new THREE.Points(particlesGeometry, particlesMaterial);

const particlesPositions = new Float32Array(2000 * 3);

for (let i = 0; i < 2000; i++) {
    particlesPositions[i * 3] = (Math.random() - 0.5) * 100;
    particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));

scene.add(particles);

// Lights and Camera Controls (unchanged)
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

camera.position.z = 50;

// Animation Loop (unchanged)
const animate = function () {
    requestAnimationFrame(animate);

    glowingRing.material.uniforms.time.value += 0.05;

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    // Rotate Earth
    earth.rotation.y += 0.002;

    // Orbit Moon around Earth
    const moonOrbitRadius = 30;
    const moonOrbitSpeed = 0.03;
    moon.position.x = Math.cos(moonOrbitSpeed * Date.now() * 0.001) * moonOrbitRadius;
    moon.position.z = Math.sin(moonOrbitSpeed * Date.now() * 0.001) * moonOrbitRadius;

    // Orbit Satellites around Earth
    const satelliteOrbitRadius = 25;
    const satelliteOrbitSpeed = 0.01;

    satellites.forEach((satellite, index) => {
        const angle = (index / satelliteCount) * Math.PI * 2;
        satellite.position.x = Math.cos(angle + satelliteOrbitSpeed * Date.now() * 0.001) * satelliteOrbitRadius;
        satellite.position.z = Math.sin(angle + satelliteOrbitSpeed * Date.now() * 0.001) * satelliteOrbitRadius;
    });

    // Update controls
    controls.update();

    // Render scene
    renderer.render(scene, camera);
};

// Post-processing effects
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.threshold = 0.2;
bloomPass.strength = 1.5;
bloomPass.radius = 0.1;

composer.addPass(bloomPass);

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Run the animate function
animate();

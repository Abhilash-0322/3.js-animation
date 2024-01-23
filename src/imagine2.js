import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a surreal landscape with multiple elements

// Pulsating Sphere
const sphereGeometry = new THREE.SphereGeometry(15, 64, 64);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x0044ff, emissive: 0x000033, shininess: 50 });
const pulsatingSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(pulsatingSphere);

// Glowing Ring
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

// Particle Cloud
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

// Add a surreal landscape or any other elements you desire

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

const animate = function () {
    requestAnimationFrame(animate);

    // Update animations or transformations here

    glowingRing.material.uniforms.time.value += 0.05;

    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0005;

    renderer.render(scene, camera);
};

animate();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

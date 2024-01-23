import * as THREE from 'three';

// Create Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create Video Element
const video = document.createElement('video');
video.src = 'Rise of the Tomb Raider v1.0 build 1027.0_64 2023-06-14 12-30-57.mp4'; // Replace with the path to your video
video.autoplay = true;
video.loop = true;

// Create Video Texture
const videoTexture = new THREE.VideoTexture(video);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

// Create Plane Geometry with Video Texture
const width = 4; // Set the width of the plane
const height = 3; // Set the height of the plane
const geometry = new THREE.PlaneGeometry(width, height);
const material = new THREE.MeshPhongMaterial({ map: videoTexture, side: THREE.DoubleSide });

// Create Mesh and Add to Scene
const videoPlane = new THREE.Mesh(geometry, material);
scene.add(videoPlane);

// Set Camera Position
camera.position.z = 5;

// Set up Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Play the video when the user interacts with the page
document.addEventListener('click', () => {
    video.play();
});

// Animate the Scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the video (optional)
    videoPlane.rotation.x += 0.00;
    videoPlane.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

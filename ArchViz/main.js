import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader.js';


const gltfLoader = new GLTFLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

// renderer.outputEncoding = THREE.sRGBEncoding;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .6;
const loader = new RGBELoader();

loader.load('./images/kloofendal_43d_clear_4k.hdr', function(texture) {
  
  texture.mapping = THREE.EquirectangularReflectionMapping;


  scene.background = texture;
  scene.environment = texture;

});




gltfLoader.load('/models/House2.glb', (gltfScene) => {


  scene.add(gltfScene.scene);
  gltfScene.scene.position.y = -1;
  console.log(gltfScene);
});

// gltfLoader.load('/models/Ground.glb', (gltfScene) => {


//   scene.add(gltfScene.scene);
//   gltfScene.scene.position.y = -1;
//   console.log(gltfScene);
// });

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

// add ambientLight to your scene
// scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();

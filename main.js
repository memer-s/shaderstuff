import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css';
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
import text from './images.jpg'
// import renderPass from './render/renderPass'

console.log(fragmentShader);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x212121, 1);
// renderer.setClearColor(0xffffff, 1);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  console.log("bruh");
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})

const scene = new THREE.Scene(window.innerWidth/window.innerHeight);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight);
camera.position.z = 50;
scene.add(camera);

const modelLoader = new GLTFLoader();

let shaderMesh;

modelLoader.load("./models/tree.glb", (gltf) => {
  const model = gltf.scene
  shaderMesh = model.children[0]
  // console.log(model);
  scene.add(shaderMesh)
})

let imageTexture;
const imageLoader = new THREE.TextureLoader();


// const boxGeometry = new THREE.PlaneGeometry(60,60,40,40);
const boxGeometry = new THREE.TorusKnotGeometry(18,5,100,100)
boxGeometry.rotateX(-Math.PI/2)
const shaderMaterial = ( function () {
  return new THREE.ShaderMaterial( {
    uniforms: {
      time: {value: 1.0},
      texture1: { type: 't', value: imageLoader.load(text)}
    },
    wireframe: false,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    // transparent: true,
  });
})();


setInterval(() => {
  shaderMaterial.uniforms.time.value += 0.1;
  cube.rotateY(0.01)
}, 20)

const cube = new THREE.Mesh(boxGeometry, shaderMaterial);
scene.add(cube);
cube.rotation.set(0.4, 0.2, 0);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
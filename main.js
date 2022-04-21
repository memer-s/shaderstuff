import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css';
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'
// import renderPass from './render/renderPass'

console.log(fragmentShader);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x212121, 1);

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

const loader = new GLTFLoader();

let shaderMesh;

loader.load("./models/tree.glb", (gltf) => {
  const model = gltf.scene
  shaderMesh = model.children[0]
  // console.log(model);
  scene.add(shaderMesh)
})

const boxGeometry = new THREE.PlaneGeometry(60,60,40,40);
boxGeometry.rotateX(-Math.PI/2)
const shaderMaterial = ( function () {
  return new THREE.ShaderMaterial( {
    uniforms: {
      time: {value: 1.0}
    },
    wireframe: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
  });
})();

document.body.addEventListener("click", () => {
  camera.position.y += 1
})

setInterval(() => {
  shaderMaterial.uniforms.time.value += 0.1;
}, 20)

const cube = new THREE.Mesh(boxGeometry, shaderMaterial);
scene.add(cube);
cube.rotation.set(0.4, 0.2, 0);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
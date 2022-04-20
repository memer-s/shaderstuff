import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css';

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
  shaderMesh = model
  // console.log(model);
  scene.add(shaderMesh)
})

const boxGeometry = new THREE.PlaneGeometry(60,60,10,10);
boxGeometry.rotateX(-Math.PI/2)
const shaderMaterial = await (async function () {
  const vertex = await (await fetch("./vertex.glsl")).text()
  const fragment = await (await fetch("./fragment.glsl")).text()

  // console.log(vertex, fragment);

  return new THREE.ShaderMaterial( {
    uniforms: {
      time: {value: 1.0}
    },
    wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment
  });
})();

document.body.addEventListener("click", () => {
  shaderMaterial.uniforms.time.value += 0.1;
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
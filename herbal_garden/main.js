import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Text} from 'troika-three-text';

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const myText = new Text()
scene.add(myText)

// Set properties to configure:
myText.text = 'Virtual herbal Garden!'
myText.fontSize = 0.2
myText.position.x = -25
myText.position.y = 20
myText.position.z = -1
myText.color = 0x9966FF
myText.fontSize = 5

// Update the rendering:
myText.sync();

// const light = new THREE.SpotLight(0xFFF000)
// light.position.set( 100, 1000, 100 );
// scene.add(light)

const light = new THREE.SpotLight(0xffffff, Math.PI * 20)
light.position.set(5, 5, 5)
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 0, 0);

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
      case 87: 
          camera.position.y -= -1;
          break;
      case 65: 
          camera.position.x -= 1;
          break;
      case 83: 
          camera.position.z += 1;
          break;
      case 68: 
          camera.position.x += 1;
          break;
  }
});

const loader = new GLTFLoader(); 
loader.load( 
  './public/model-car/scene.gltf', 
  function ( gltf ) { scene.add( gltf.scene ); }, 
  undefined, 
  function ( error ) { console.error( error ); } 
);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  requestAnimationFrame(animate)

  controls.update()

  render()

  stats.update()
}

function render() {
  renderer.render(scene, camera)
}

animate()
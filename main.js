import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// All Three.js projects need a 3 things, a camera, scene and lights.
// If you don't have lights in your scene it will not show the objects you put into the scene correctly i.e colours/shapes.
// You must add all objects to your scene for them to appear.
// The Renderer is where Three.js will be placing all of our objects and lights. 

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.setZ(30)

// Lights
const pointLight = new THREE.PointLight(0xff00ff, 0.1)
pointLight.position.set(-7.7, 6.7 , 3)
pointLight.intensity = 10
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffff, 1)
pointLight2.position.set(10, -10, -5.9)
pointLight2.intensity = 10
scene.add(pointLight2)

// Lights Debug GUI

const light1 = gui.addFolder('Purple Light')

light1.add(pointLight.position, 'x').min(-10).max(10).step(0.1)
light1.add(pointLight.position, 'y').min(-10).max(10).step(0.1)
light1.add(pointLight.position, 'z').min(-10).max(10).step(0.1)
light1.add(pointLight, 'intensity').min(0).max(10).step(0.1)

const light2 = gui.addFolder('Blue Light')

light2.add(pointLight2.position, 'x').min(-10).max(10).step(0.1)
light2.add(pointLight2.position, 'y').min(-10).max(10).step(0.1)
light2.add(pointLight2.position, 'z').min(-10).max(10).step(0.1)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.1)

const light2Colour = {color: 0xff0000}

light2.addColor(light2Colour, 'color').onChange(() => {
  pointLight2.color.set(light2Colour.color)
})

// Point Lights helpers 
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1, "rgb(0, 0, 255)")
// scene.add(pointLightHelper)

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight, 1, "rgb(0, 0, 255)")
// scene.add(pointLightHelper2)


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), 
  antialias: true, 
  alpha: true,
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

// Loading
const textureLoader = new THREE.TextureLoader()

// Resize canvas 
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth /window.innerHeight
  camera.updateProjectionMatrix()
})

// Texture
const noramalTexture = textureLoader.load('/textures/NormalMap.png')

// Geometry
const geomerty = new THREE.SphereGeometry(5, 40, 40)

// Material
const material = new THREE.MeshStandardMaterial({
  metalness: 0.9,
  roughness: 0.001,
  color: 0x292929,
  normalMap: noramalTexture, 
})

// Mesh
const mesh = new THREE.Mesh(geomerty,material)

// Add to scene 
scene.add(mesh)
renderer.render(scene, camera)

// Animate
document.addEventListener('mousemove', documentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function documentMouseMove(event){
  mouseX = (event.clientX - windowHalfX)
  mouseY = (event.clientY - windowHalfY)
}

// window.addEventListener('scroll', updateMesh)

// function updateMesh(event) {
//   mesh.position.y = window.scroll * .0001
// }

// Rotate Object
const clock = new THREE.Clock()
const tick = () =>
{
  targetX = mouseX * .001
  targetY = mouseY * .001

  const elapsedTime = clock.getElapsedTime()

  mesh.rotation.y = .5 * elapsedTime
  mesh.rotation.y +=  targetY //.05 * (targetY - mesh.rotation.y)
  mesh.position.z += - .05 * (targetX - mesh.rotation.x)
  mesh.rotation.z += .05 * (targetX - mesh.rotation.z)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()
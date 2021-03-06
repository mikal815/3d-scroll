import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.9, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.setZ(30);
// camera.position.setX(-3);

renderer.render(scene, camera);

// const geometry = new THREE.TorusGeometry(20, 2, 20, 70)
// const material = new THREE.MeshStandardMaterial({ color: 0x00c100 })
// const torus = new THREE.Mesh(geometry, material)
// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)


// const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const starTexture = new THREE.TextureLoader().load('stone.jpg')


  // const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const geometry = new THREE.BoxGeometry(6, 6, 11)
  const material = new THREE.MeshBasicMaterial({ map: starTexture })
  // const material = new THREE.MeshBasicMaterial({ map: stairsTexture })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(150).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('hall.jpg')
scene.background = spaceTexture;

const stairsTexture = new THREE.TextureLoader().load('stone.jpg')

const stairs = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 11),
  new THREE.MeshBasicMaterial({ map: stairsTexture })
)

scene.add(stairs)

stairs.position.z = 15;
stairs.position.setX(10);


const stoneTexture = new THREE.TextureLoader().load('stone.jpg')

const stone = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 11),
  new THREE.MeshBasicMaterial({ map: stoneTexture })
)

scene.add(stone)

stone.position.z = 1;
stone.position.setY(5)
stone.position.setX(-10);


const stone2Texture = new THREE.TextureLoader().load('stone.jpg')

const stone2 = new THREE.Mesh(
  new THREE.BoxGeometry(6, 6, 11),
  new THREE.MeshBasicMaterial({ map: stone2Texture })
)

scene.add(stone2)

stone2.position.z = 30;
stone2.position.setY(5)
stone2.position.setX(-10);



// const moonTexture = new THREE.TextureLoader().load('moon.jpg')
// const normalTexture = new THREE.TextureLoader().load('normal.jpg')

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(4, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: normalTexture
//   })
// )

// scene.add(moon)

// moon.position.z = 10;
// moon.position.setX(-10);


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;

  // moon.rotation.x += 0.05;
  // moon.rotation.y += 0.05;
  // moon.rotation.z += 0.05;

  stairs.rotation.y += 0.01;
  stairs.rotation.z += 0.01;

  stone.rotation.y += 0.01;
  stone.rotation.z += 0.01;

  stone2.rotation.y += 0.01;
  stone2.rotation.z += 0.01;

  camera.position.z = t * -0.009;
  // camera.position.x = t * -0.0002;
  // camera.rotation.y = t * -0.00002;
  camera.position.x = t * 0;
  camera.rotation.y = t * 0;

}

document.body.onscroll = moveCamera
moveCamera();

function animate() {
  requestAnimationFrame(animate)

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;

  // controls.update()

  renderer.render(scene, camera)
}

animate();
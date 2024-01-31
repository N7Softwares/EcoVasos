//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'glass';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `3d/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    // Función para crear la textura y asignarla al material
    function updateCanvasTexture() {
      canvasTexture = new THREE.CanvasTexture(canvas3d);
      canvasTexture.needsUpdate = true;

      // Desvincular la textura anterior (si existe)
      if (canvasMesh.material.map) {
        canvasMesh.material.map.dispose();
      }

      // Asignar la nueva textura al material
      canvasMesh.material.map = canvasTexture;
    }
    // Crear el lienzo curvo
    const canvas3d = document.getElementById("canvas");
    let canvasTexture = new THREE.CanvasTexture(canvas3d);
    const canvasMaterial = new THREE.MeshBasicMaterial({ map: canvasTexture });

    // Crear una geometría cilíndrica para el lienzo
    const radiusTop = 1.2; // Radio superior del cilindro (ajusta según sea necesario)
    const radiusBottom = 1; // Radio inferior del cilindro (ajusta según sea necesario)
    const height = 3; // Altura del cilindro (ajusta según sea necesario)
    const radialSegments = 50; // Segmentos radiales del cilindro
    const canvasGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

    // Rotar y posicionar el lienzo cilíndrico
    const canvasMesh = new THREE.Mesh(canvasGeometry, canvasMaterial);
    canvasMesh.rotation.x = Math.PI / 180; // Rotar el cilindro para que sea perpendicular al vaso
    canvasMesh.position.set(0, 0, 0); // Ajusta la posición según sea necesario
    canvas.on('after:render', updateCanvasTexture);
    // Agregar el lienzo al objeto del vaso
    object.add(canvasMesh);

    // Agregar el objeto del vaso al escenario
    scene.add(object);
    
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);


//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 5;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xfff, 2000); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "glass" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom / pan it with the mouse
if (objToRender === "glass") {
  controls = new OrbitControls(camera, renderer.domElement);

  // Limitar el movimiento a lo largo del eje horizontal
  controls.maxPolarAngle = Math.PI / 2; // Ángulo de la vista máximo (en radianes)
  controls.minPolarAngle = Math.PI / 2; // Ángulo de la vista mínimo (en radianes)
  controls.enablePan = false; // Deshabilitar el movimiento de panorámica
  controls.enableRotate = true; // Habilitar la rotación
  controls.enableZoom = true; // Habilitar el zoom

  // Ajustar el centro de rotación para que esté alineado con el eje horizontal
  controls.target.set(0, 0, 0);

  // Hacer que el vaso no se incline al intentar desplazar hacia arriba o abajo
  controls.screenSpacePanning = false;
}


//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  if (object && objToRender === "glass") {
    object.rotation.y -= 0.005; 
  }
  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D rendering
animate();
//Import the THREE.js library
// console.log("paso1");
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// console.log("paso22");
//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 100), 0.1, 1000);
// console.log("paso3");
//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;

let controls;
let canvasGeometry;
//Set which object to render
let objToRender = 'glass';
// console.log("paso4");
document.getElementById("vasoBtn").addEventListener("click", function () {
  cambiarObjeto('glass');
});

document.getElementById("copaBtn").addEventListener("click", function () {
  cambiarObjeto('cup_glass');
});





// console.log("paso6");

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });  //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, (window.innerHeight-100));

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = 4;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xfff, 2000); // (color, intensity)
topLight.position.set(500, 500, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, (objToRender === "glass" || objToRender === "cup_glass") ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom / pan it with the mouse
if (objToRender === "glass" || objToRender === "cup_glass") {
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
  if (object && (objToRender === "glass" || objToRender === "cup_glass")) {
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
  camera.aspect = window.innerWidth / (window.innerHeight - 100);
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight - 100);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function getCanvasBackgroundColor(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, 1, 1).data;
  return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3] / 255})`;
}

let originalCanvasWidth, originalCanvasHeight;
let currentPadding = 80; // Ajusta este valor según sea necesario

function addPaddingToCanvas(originalCanvas, padding) {
  const paddedCanvas = document.createElement('canvas');
  const ctx = paddedCanvas.getContext('2d');

  // Almacenar las dimensiones originales si no se han almacenado
  if (!originalCanvasWidth || !originalCanvasHeight) {
    originalCanvasWidth = originalCanvas.width;
    originalCanvasHeight = originalCanvas.height;
  }

  // Ajustar el tamaño del nuevo lienzo para incluir el padding
  paddedCanvas.width = originalCanvasWidth;
  paddedCanvas.height = originalCanvasHeight + padding * 2;

  // Captura el color de fondo del lienzo original
  const backgroundColor = getCanvasBackgroundColor(originalCanvas);

  // Rellena el nuevo lienzo con el color de fondo del lienzo original
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);

  // Dibuja la textura original en el centro del nuevo lienzo
  ctx.drawImage(originalCanvas, 0, padding);

  return paddedCanvas;
}

const updateCanvasTexture = (canvas, canvasMesh) => {
  // Crear el lienzo con padding usando las dimensiones y padding almacenados
  const paddedCanvas = addPaddingToCanvas(canvas, currentPadding);

  // Crear la textura a partir del lienzo con padding
  const canvasTexture = new THREE.CanvasTexture(paddedCanvas);
  canvasTexture.wrapS = THREE.RepeatWrapping;
  canvasTexture.wrapT = THREE.RepeatWrapping;
  canvasTexture.repeat.set(1, 1); 
  canvasTexture.needsUpdate = true;

  // Desvincular la textura anterior (si existe)
  if (canvasMesh.material.map) {
      canvasMesh.material.map.dispose();
  }

  // Asignar la nueva textura al material
  canvasMesh.material.map = canvasTexture;
}

const cambiarObjeto = function(objeto) {
    objToRender = objeto;

    // Limpiar la escena
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
    }

    const loader = new GLTFLoader();
    const canvas3d = document.getElementById("canvas");
    
    //Load the file
    if(objToRender === 'glass'){
      loader.load(`3d/${objToRender}/scene.gltf`, function (gltf) {
        object = gltf.scene;
  
        // Crear la textura y material
        let canvasTexture = new THREE.CanvasTexture(canvas3d);
        const canvasMaterial = new THREE.MeshBasicMaterial({ map: canvasTexture });
  
        // Crear una geometría cilíndrica para el lienzo
        const canvasGeometry = new THREE.CylinderGeometry(1.2, 1, 3, 50);
  
        // Crear la malla con la textura del lienzo
        const canvasMesh = new THREE.Mesh(canvasGeometry, canvasMaterial);
        canvasMesh.position.set(0, 0, 0);
  
        // Actualizar la textura del lienzo
        updateCanvasTexture(canvas3d, canvasMesh);
  
        canvas.on('after:render', () => updateCanvasTexture(canvas3d, canvasMesh));
  
        object.add(canvasMesh);
        scene.add(object);
  
      }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, function (error) {
        console.error(error);
      });
    }else if (objToRender === 'cup_glass') {
      loader.load(`3d/${objToRender}/de_prueba/scene.gltf`, function (gltf) {
          object = gltf.scene;

          // Centrar la copa en el contenedor
          object.position.set(0, -2.3, 0); // Ajustar la posición según sea necesario
          // Crear la textura y asignarla al material
          const canvas3d = document.getElementById("canvas");
          let canvasTexture = new THREE.CanvasTexture(canvas3d);
          const canvasMaterial = new THREE.MeshBasicMaterial({ map: canvasTexture });

          // Crear una geometría cilíndrica para el lienzo
          const radiusTop = 1; // Radio superior del cilindro (ajusta según sea necesario)
          const radiusBottom = 0.825; // Radio inferior del cilindro (ajusta según sea necesario)
          const height = 2.2; // Altura del cilindro (ajusta según sea necesario)
          const radialSegments = 50; // Segmentos radiales del cilindro
          canvasGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);

          // Asignar la textura al material del objeto 3D
          object.traverse((node) => {
              if (node.isMesh) {
                  node.material = canvasMaterial;
              }
          });

          // Añadir el lienzo al objeto de la copa
          const cupCanvasMesh = new THREE.Mesh(canvasGeometry, canvasMaterial);
          cupCanvasMesh.position.set(0, 4, 0); // Ajustar la posición según sea necesario

          canvas.on('after:render', updateCanvasTextureCup);

          function updateCanvasTextureCup() {
            // Crear el lienzo con padding usando las dimensiones y padding almacenados
            const paddedCanvas = addPaddingToCanvas(canvas3d, currentPadding);
          
            // Crear la textura a partir del lienzo con padding
            canvasTexture = new THREE.CanvasTexture(paddedCanvas);
            canvasTexture.needsUpdate = true;
          
            // Desvincular la textura anterior (si existe)
            if (cupCanvasMesh.material.map) {
              cupCanvasMesh.material.map.dispose();
            }
          
            // Asignar la nueva textura al material
            cupCanvasMesh.material.map = canvasTexture;
          }

          object.add(cupCanvasMesh);

          // Añadir el objeto de la copa al escenario
          scene.add(object);
      });
  }
}

//Start the 3D rendering
animate();

cambiarObjeto('glass');
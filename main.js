import * as THREE from 'three';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

document.body.appendChild( renderer.domElement );
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////ILUMINACION/////////////////////////////////////////////////////////
const lightambiente = new THREE.AmbientLight( 0xffffff ); 
scene.add( lightambiente );

const light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add( light );



light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
light.shadow.camera.far = 500; // default


const texture = new THREE.TextureLoader().load('Texturas/JUEGO INTERFAZZ.png');


const geometry2 = new THREE.BoxGeometry(1.32, 0.63, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, map:texture });
const cubeS2 = new THREE.Mesh(geometry2, material);
cubeS2.position.z = -0.9;
camera.add(cubeS2);
scene.add(camera);


let r2Pressed = false;

    function checkGamepad() {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[0];
      if (gp) {
        const r2 = gp.buttons[7]; // R2 es el botón 7
        if (r2.pressed && !r2Pressed) {
          r2Pressed = true;
          console.log("R2 presionado, redirigiendo...");
          window.location.href = "index1.html"; // Teletransporte
        }
        if (!r2.pressed) {
          r2Pressed = false; // Espera a que se suelte para volver a detectar
        }
      }
      requestAnimationFrame(checkGamepad);
    }

    window.addEventListener("gamepadconnected", () => {
      console.log("Control conectado");
      requestAnimationFrame(checkGamepad);
    });

    window.addEventListener("gamepaddisconnected", () => {
      console.log("Control desconectado");
    });


camera.position.x = 10; 
camera.position.y = -2; 
camera.lookAt(0,0,0);

function animate() {
	renderer.render( scene, camera );
}

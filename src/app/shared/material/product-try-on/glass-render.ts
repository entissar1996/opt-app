

import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';

const faceLandmarksDetection = import('@tensorflow-models/face-landmarks-detection');

export function setText( text ) {
  document.getElementById( "status" ).innerText = text;
}

export function drawLine( ctx, x1, y1, x2, y2 ) {
  ctx.beginPath();
  ctx.moveTo( x1, y1 );
  ctx.lineTo( x2, y2 );
  ctx.stroke();
}

export async function setupWebcam() {
  return new Promise( ( resolve, reject ) => {
    const webcamElement = document.getElementById( "webcam" ) as HTMLMediaElement;
      const navigatorAny = navigator;
      navigator.getUserMedia = navigator.getUserMedia;
      if( navigator.getUserMedia ) {
          navigator.getUserMedia( { video: true },
              stream => {
                  webcamElement.srcObject = stream;
                  webcamElement.addEventListener( "loadeddata", resolve, false );
              },
          error => reject());
      }
      else {
          reject();
      }
  });
}

let output = null;
let model = null;
let renderer = null;
let scene = null;
let camera = null;
let glasses = null;

export function loadModel( file ) {
  return new Promise( ( res, rej ) => {
      const loader = new GLTFLoader();
      loader.load( file, function ( gltf ) {
          res( gltf.scene );
      }, undefined, function ( error ) {
          rej( error );
      } );
  });
}

export async function trackFace() {
  const video = document.querySelector( "video" );
  output.drawImage(
      video,
      0, 0, video.width, video.height,
      0, 0, video.width, video.height
  );
  renderer.render( scene, camera );

  const faces = await model.estimateFaces( {
      input: video,
      returnTensors: false,
      flipHorizontal: false,
  });

  faces.forEach( face => {
      // Draw the bounding box
      const x1 = face.boundingBox.topLeft[ 0 ];
      const y1 = face.boundingBox.topLeft[ 1 ];
      const x2 = face.boundingBox.bottomRight[ 0 ];
      const y2 = face.boundingBox.bottomRight[ 1 ];
      const bWidth = x2 - x1;
      const bHeight = y2 - y1;
      drawLine( output, x1, y1, x2, y1 );
      drawLine( output, x2, y1, x2, y2 );
      drawLine( output, x1, y2, x2, y2 );
      drawLine( output, x1, y1, x1, y2 );

      glasses.position.x = face.annotations.midwayBetweenEyes[ 0 ][ 0 ];
      glasses.position.y = -face.annotations.midwayBetweenEyes[ 0 ][ 1 ];
      glasses.position.z = -camera.position.z + face.annotations.midwayBetweenEyes[ 0 ][ 2 ];

      // Calculate an Up-Vector using the eyes position and the bottom of the nose
      glasses.up.x = face.annotations.midwayBetweenEyes[ 0 ][ 0 ] - face.annotations.noseBottom[ 0 ][ 0 ];
      glasses.up.y = -( face.annotations.midwayBetweenEyes[ 0 ][ 1 ] - face.annotations.noseBottom[ 0 ][ 1 ] );
      glasses.up.z = face.annotations.midwayBetweenEyes[ 0 ][ 2 ] - face.annotations.noseBottom[ 0 ][ 2 ];
      const length = Math.sqrt( glasses.up.x ** 2 + glasses.up.y ** 2 + glasses.up.z ** 2 );
      glasses.up.x /= length;
      glasses.up.y /= length;
      glasses.up.z /= length;

      // Scale to the size of the head
      const eyeDist = Math.sqrt(
          ( face.annotations.leftEyeUpper1[ 3 ][ 0 ] - face.annotations.rightEyeUpper1[ 3 ][ 0 ] ) ** 2 +
          ( face.annotations.leftEyeUpper1[ 3 ][ 1 ] - face.annotations.rightEyeUpper1[ 3 ][ 1 ] ) ** 2 +
          ( face.annotations.leftEyeUpper1[ 3 ][ 2 ] - face.annotations.rightEyeUpper1[ 3 ][ 2 ] ) ** 2
      );
      glasses.scale.x = eyeDist / 6;
      glasses.scale.y = eyeDist / 6;
      glasses.scale.z = eyeDist / 6;

      glasses.rotation.y = Math.PI;
      glasses.rotation.z = Math.PI / 2 - Math.acos( glasses.up.x );
  });

  requestAnimationFrame( trackFace );
}

export const setup= async (video,canvas,overlay) => {
  await setupWebcam();
   video.play();
  let videoWidth = video.videoWidth;
  let videoHeight = video.videoHeight;
  video.width = videoWidth;
  video.height = videoHeight;


  canvas.width = video.width;
  canvas.height = video.height;


  overlay.width = video.width;
  overlay.height = video.height;

  output = canvas.getContext( "2d" );
  output.translate( canvas.width, 0 );
  output.scale( -1, 1 ); // Mirror cam
  output.fillStyle = "#fdffb6";
  output.strokeStyle = "#fdffb6";
  output.lineWidth = 2;

  // Load Face Landmarks Detection
  model = await (await faceLandmarksDetection).load(
      (await faceLandmarksDetection).SupportedPackages.mediapipeFacemesh
  );

  renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById( "overlay" ),
      alpha: true
  });

  camera = new THREE.PerspectiveCamera( 45, 1, 0.1, 2000 );
  camera.position.x = videoWidth / 2;
  camera.position.y = -videoHeight / 2;
  camera.position.z = -( videoHeight / 2 ) / Math.tan( 45 / 2 ); // distance to z should be tan( fov / 2 )

  scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0xcccccc, 0.4 ) );
  camera.add( new THREE.PointLight( 0xffffff, 0.8 ) );
  scene.add( camera );

  camera.lookAt( { x: videoWidth / 2, y: -videoHeight / 2, z: 0, isVector3: true } );

  // Glasses from https://sketchfab.com/3d-models/heart-glasses-ef812c7e7dc14f6b8783ccb516b3495c
  glasses = await loadModel( "./assets/heart_glasses.gltf" );
  scene.add( glasses );

  setText( "Loaded!" );

  trackFace();
};

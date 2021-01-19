import React, { useRef, useState, Suspense } from "react";
import './App.scss';
import * as THREE from 'three'
import { Canvas, useFrame, useLoader } from "react-three-fiber";

import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
//import {Box} from "drei";
import { useSpring, a } from "react-spring/three";
//import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import img from './aishiteruedited2x.png';

softShadows();

function Box1({ position, args, color }) {
  const mesh1 = useRef(null);
  useFrame(() => { mesh1.current.rotation.x = mesh1.current.rotation.y += 0.01 });

  const [expand, setExpand] = useState(false);
  const props = useSpring({
    scale: expand ? [1.4, 1.5, 1.4] : [1, 1, 1],
  });

  return (
    <a.mesh onClick={() => setExpand(!expand)} scale={props.scale} castShadow position={position} ref={mesh1}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial attach='material' color={color} speed={4} factor={0.4} />
    </a.mesh>
  )
}

function Image1() {
  const texture1 = useLoader(THREE.TextureLoader, img);
  const mesh2 = useRef(null);
  useFrame(() => { mesh2.current.rotation.x = mesh2.current.rotation.y += 0.005 });

  return (
    <a.mesh position={[-8, 0, 10]} castShadow ref={mesh2}>
      <planeBufferGeometry attach='geometry' args={[10, 10]} />
      <meshPhongMaterial alphaTest={0.5} opacity={1} transparency={true} map={texture1} attach='material' />
    </a.mesh>
  )
}

function App() {

  return (
    <>
      <Canvas shadowMap colorManagement camera={{ position: [5, 2, 20], fov: 70 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[-20, 0, 10]} intensity={0.7} />
        <pointLight position={[20,-4, 50]} intensity={1}/>
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.2}
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-top={10}

        />
        <group>
          <Suspense fallback={null}>
            <Image1 />
          </Suspense>
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' color='lightyellow' />
          </mesh>
          
          

          <Box1 position={[0, 1, 2]} args={[3, 2, 5]} color='lightblue' />
          <Box1 position={[5, 3, 3]} color='pink' />
          <Box1 position={[-6, -4, -5]} color='lightgreen' />

          <OrbitControls></OrbitControls>
        </group>
        




      </Canvas>
    </>
  );
}

export default App;

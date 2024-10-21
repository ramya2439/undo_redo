import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { createAddObjectCommand } from "./commands";
import { createCommandManager } from "./commandManager";
import "./App.css";

const ThreeScene = () => {
  const [commandManager] = useState(() => createCommandManager());
  const sceneRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("grey");
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("threejs-container")
      .appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      document
        .getElementById("threejs-container")
        .removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleAddCube = () => {
    const scene = sceneRef.current;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    const addCubeCommand = createAddObjectCommand(scene, cube);
    commandManager.execute(addCubeCommand);
  };

  const handleAnotherCube = () => {
    const scene = sceneRef.current;

    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x8844aa });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(1, 0, 2);

    const addCubeCommand = createAddObjectCommand(scene, cube);
    commandManager.execute(addCubeCommand);
  };

  const handleUndo = () => {
    commandManager.undo();
  };

  const handleRedo = () => {
    commandManager.redo();
  };

  return (
    <div>
      <button onClick={handleAddCube}>Add Cube</button>
      <button onClick={handleAnotherCube}>Add Cube</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
      <div ref={sceneRef} id="threejs-container" />
    </div>
  );
};

export default ThreeScene;

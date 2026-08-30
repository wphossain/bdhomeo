---
name: threejs-3d-interactive
description: >-
  Comprehensive guide for building 3D interactive web experiences with Three.js.
  Covers scene setup, geometries, materials (PBR), lighting, cameras, loaders,
  post-processing, WebGL optimization, and integration with GSAP and React Three Fiber.
---

# Three.js 3D Interactive Web Skill

This skill enables building immersive, GPU-accelerated 3D experiences directly in the browser using Three.js — from simple hero backgrounds to full interactive product viewers.

---

## 1. Scene Architecture

Every Three.js scene has 5 core components:

```javascript
import * as THREE from "three";

// 1. SCENE — The 3D container for all objects, lights, cameras
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0f19);
scene.fog = new THREE.FogExp2(0x0b0f19, 0.02); // Optional atmospheric fog

// 2. CAMERA — Determines what's visible and from where
const camera = new THREE.PerspectiveCamera(
  75,                                          // FOV (degrees)
  window.innerWidth / window.innerHeight,      // Aspect ratio
  0.1,                                         // Near clipping plane
  1000                                         // Far clipping plane
);
camera.position.set(0, 0, 5); // Pull camera back on Z axis

// 3. RENDERER — Draws the scene using WebGL
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,         // Smooth edges
  alpha: true,             // Transparent background support
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for perf
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
renderer.toneMapping = THREE.ACESFilmicToneMapping; // Cinematic tone
renderer.toneMappingExposure = 1.2;

// 4. GEOMETRY — The 3D shape's vertices
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);

// 5. MATERIAL — The surface appearance
const material = new THREE.MeshStandardMaterial({
  color: 0x6366f1,
  metalness: 0.7,
  roughness: 0.2,
  envMapIntensity: 1.5,
});

// Combine geometry + material into a Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

---

## 2. Lighting (PBR — Physically Based Rendering)

```javascript
// Ambient — Base light from all directions (no shadows)
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// Directional — Parallel light (like the sun) — casts shadows
const sun = new THREE.DirectionalLight(0xffffff, 2);
sun.position.set(5, 10, 7);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048); // Higher = sharper shadows
scene.add(sun);

// Point Light — Omnidirectional bulb
const pointLight = new THREE.PointLight(0x6366f1, 3, 15);
pointLight.position.set(-3, 2, 3);
scene.add(pointLight);

// RectArea Light — Soft, studio light panel
const rectLight = new THREE.RectAreaLight(0xffffff, 5, 4, 4);
rectLight.position.set(0, 5, 5);
rectLight.lookAt(0, 0, 0);
scene.add(rectLight);

// Environment Map — HDR image-based lighting (most realistic)
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
new RGBELoader().load("/hdr/studio.hdr", texture => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture; // Affects all PBR materials
  // scene.background = texture; // Also sets as background
});
```

---

## 3. Materials Cheatsheet

```javascript
// MeshBasicMaterial — No lighting, flat color (fastest)
new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

// MeshStandardMaterial — PBR, metalness/roughness workflow (recommended)
new THREE.MeshStandardMaterial({
  color: 0xffffff,
  map: albedoTexture,           // Diffuse/color texture
  normalMap: normalTexture,     // Surface detail bumps
  roughnessMap: roughTexture,   // How rough (matte vs shiny)
  metalnessMap: metalTexture,   // Which parts are metallic
  metalness: 0.5,
  roughness: 0.5,
})

// MeshPhysicalMaterial — MeshStandard + clearcoat, transmission (glass/car paint)
new THREE.MeshPhysicalMaterial({
  color: 0x88ccff,
  transmission: 1.0,    // Glass-like refraction
  thickness: 0.5,       // Refraction thickness
  roughness: 0,
  ior: 1.5,             // Index of refraction (glass = 1.5)
  clearcoat: 1.0,
  clearcoatRoughness: 0,
})

// ShaderMaterial — Custom vertex + fragment shaders (maximum control)
new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0x6366f1) }
  },
  vertexShader: `
    uniform float uTime;
    void main() {
      vec3 pos = position;
      pos.y += sin(pos.x * 4.0 + uTime * 2.0) * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `
})
```

---

## 4. The Render Loop

```javascript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Update uniforms for shader animations
  material.uniforms.uTime.value = elapsed;

  // Gentle auto-rotation
  mesh.rotation.y = elapsed * 0.3;
  mesh.rotation.x = elapsed * 0.1;

  renderer.render(scene, camera);
}
animate();

// Responsive — handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

---

## 5. OrbitControls & Interactive Camera

```javascript
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;        // Smooth inertia
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// In the render loop, must call update:
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required when damping or autoRotate is enabled
  renderer.render(scene, camera);
}
```

---

## 6. Loading 3D Models (GLB / GLTF)

```javascript
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/"); // Download decoder from Three.js repo

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
  "/models/product.glb",
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, -1, 0);
    scene.add(model);
  },
  (progress) => {
    const percent = (progress.loaded / progress.total * 100).toFixed(0);
    console.log(`Loading: ${percent}%`);
  },
  (error) => console.error("Model load error:", error)
);
```

---

## 7. Post-Processing (Visual FX)

```javascript
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Bloom — Glowing light halos
const bloom = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.8,   // Strength
  0.4,   // Radius
  0.2    // Threshold — only pixels brighter than this bloom
);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// In render loop, use composer instead of renderer:
composer.render();
```

---

## 8. Particle Systems

```javascript
const count = 5000;
const positions = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 20; // x
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.02,
  color: 0x6366f1,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true,
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate in the render loop
particles.rotation.y = elapsed * 0.05;
```

---

## 9. Performance Optimization

| Rule | Why |
| :--- | :-- |
| Cap `pixelRatio` at 2 | `devicePixelRatio > 2` gives diminishing returns at huge cost |
| Use Draco compression for models | Reduces GLB file size by 70–80% |
| Dispose geometry/material on unmount | Prevents GPU memory leaks: `geometry.dispose(); material.dispose();` |
| Share geometries and materials | Don't create new instances for identical meshes — use `InstancedMesh` |
| Use LOD (Level of Detail) | Show simpler geometry at large distances |
| Limit draw calls | Each `mesh.add()` is a draw call. Merge static geometry where possible |
| Profile with `renderer.info` | Check `renderer.info.render.calls` and `triangles` in dev |

---

## 10. React Three Fiber (R3F) — Three.js in React

```jsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";

function RotatingMesh() {
  const meshRef = useRef();

  // Called every frame
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.2} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 7]} intensity={2} castShadow />
      <Environment preset="studio" />
      <RotatingMesh />
      <OrbitControls enableDamping dampingFactor={0.05} />
    </Canvas>
  );
}
```

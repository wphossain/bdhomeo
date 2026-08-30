---
name: webgl-shaders-glsl
description: >-
  Guide for writing custom GLSL shaders (Vertex & Fragment) in WebGL and Three.js.
  Covers noise functions, raymarching, uniforms, textures, ripple effects, and GPU visual filters.
---

# WebGL & GLSL Shaders Skill

GLSL (OpenGL Shading Language) programs run directly on the GPU, allowing millions of pixels or vertices to be processed simultaneously for real-time visual effects.

---

## 1. Shader Anatomy

A shader pipeline consists of two stages:
1. **Vertex Shader**: Positions vertices in 3D space (`gl_Position`).
2. **Fragment (Pixel) Shader**: Determines the color of each pixel (`gl_FragColor`).

```
Vertex Data → [Vertex Shader] → Varyings → [Fragment Shader] → Pixel Output
```

### Data Passings Types:
- **`uniform`**: Values passed from CPU to GPU (constant across all vertices/fragments, e.g. `uTime`, `uResolution`, `uMouse`).
- **`attribute`**: Per-vertex data passed from CPU (e.g. `position`, `normal`, `uv`).
- **`varying`**: Data passed from Vertex Shader to Fragment Shader, interpolated across polygon faces (e.g. `vUv`, `vNormal`).

---

## 2. Vertex Shader Basics (Wave Effect)

```glsl
// Vertex Shader (Three.js Custom ShaderMaterial)
uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Sine wave deformation based on position & time
  float elevation = sin(modelPosition.x * uFrequency + uTime * 2.0) *
                    sin(modelPosition.z * uFrequency + uTime * 1.5) * uAmplitude;
  
  modelPosition.y += elevation;
  vElevation = elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
```

---

## 3. Fragment Shader Basics (Color Gradient & Distortion)

```glsl
// Fragment Shader
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;
varying float vElevation;

void main() {
  // Blend colors based on elevation and UV gradient
  float mixFactor = vElevation * 2.0 + 0.5;
  vec3 color = mix(uColorStart, uColorEnd, mixFactor);

  // Add subtle glowing vignette
  float dist = distance(vUv, vec2(0.5));
  color *= 1.0 - dist * 0.5;

  gl_FragColor = vec4(color, 1.0);
}
```

---

## 4. Useful GLSL Math Helper Functions

### Simplex 2D Noise (Generative Patterns)
```glsl
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
```

---

## 5. Integrating with Three.js

```javascript
import * as THREE from "three";

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShaderCode,
  fragmentShader: fragmentShaderCode,
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: 3.5 },
    uAmplitude: { value: 0.15 },
    uColorStart: { value: new THREE.Color("#6366f1") },
    uColorEnd: { value: new THREE.Color("#06b6d4") }
  },
  wireframe: false,
  transparent: true
});

// Update time in animation loop
function animate(time) {
  material.uniforms.uTime.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
```

# Three.js Performance & Best Practices

## Memory Management
```jsx
// ALWAYS dispose on unmount
useEffect(() => {
  return () => {
    geometry.dispose()
    material.dispose()
    texture.dispose()
    renderTarget.dispose()
  }
}, [])

// Deep dispose helper
function disposeObject(obj) {
  obj.traverse(child => {
    if (child.isMesh) {
      child.geometry.dispose()
      if (Array.isArray(child.material)) {
        child.material.forEach(m => disposeMaterial(m))
      } else {
        disposeMaterial(child.material)
      }
    }
  })
}

function disposeMaterial(mat) {
  Object.values(mat).forEach(val => {
    if (val?.isTexture) val.dispose()
  })
  mat.dispose()
}
```

## Mobile Optimization
```jsx
import { useThree } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor } from '@react-three/drei'

function MobileOptimized({ children }) {
  const { size } = useThree()
  const isMobile = size.width < 768

  return (
    <>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <PerformanceMonitor
        onDecline={() => {
          // Reduce quality when FPS drops
          set({ dpr: 1 })
        }}
      />
      {children}
    </>
  )
}

// Mobile-specific settings
<Canvas
  dpr={isMobile ? 1 : [1, 2]}
  shadows={isMobile ? false : true}
  gl={{
    powerPreference: 'high-performance',
    antialias: !isMobile,
  }}
>
```

## Geometry Optimization
```jsx
// Use BufferGeometry (default in modern three.js)
// Merge static geometries
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

const merged = mergeBufferGeometries([geo1, geo2, geo3])

// Instancing for repeated meshes (100x+ faster than individual meshes)
const mesh = new THREE.InstancedMesh(geometry, material, count)
const matrix = new THREE.Matrix4()
for (let i = 0; i < count; i++) {
  matrix.setPosition(x, y, z)
  mesh.setMatrixAt(i, matrix)
}
mesh.instanceMatrix.needsUpdate = true
```

## Texture Optimization
```jsx
// Use KTX2 compressed textures (70-80% smaller)
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'
import { useKTX2 } from '@react-three/drei'

const texture = useKTX2('/textures/product.ktx2')

// Texture settings
texture.minFilter = THREE.LinearMipmapLinearFilter
texture.generateMipmaps = true
texture.anisotropy = renderer.capabilities.getMaxAnisotropy()

// Size guidelines for e-commerce:
// - Product thumbnails: 512x512
// - Product detail: 1024x1024
// - Environment maps: 256x256 (HDR)
// - Normal/roughness maps: 512x512
// - Mobile: halve all sizes

// Texture atlas for multiple products
// Combine textures into single atlas to reduce draw calls
```

## useFrame Best Practices
```jsx
// GOOD: use refs, no allocations
const meshRef = useRef()
const vec = useMemo(() => new THREE.Vector3(), [])

useFrame((state, delta) => {
  meshRef.current.rotation.y += delta * 0.5
  // Reuse vector — don't create new Vector3 every frame
  vec.set(state.mouse.x, state.mouse.y, 0)
  meshRef.current.position.lerp(vec, 0.1)
})

// BAD: causes re-renders
useFrame(() => {
  setRotation(prev => prev + 0.01) // Never setState in useFrame!
})

// Conditional updates — skip when not visible
useFrame((state, delta) => {
  if (!visible.current) return
  // ...animation logic
})
```

## Avoiding Re-renders in R3F
```jsx
// Use refs instead of state for animated values
const ref = useRef()

// Use drei's useIntersect for visibility
import { useIntersect } from '@react-three/drei'
const ref = useIntersect(visible => {
  // Only animate when in viewport
})

// Separate animated components from static ones
// Static parent won't re-render when child animates
function Scene() {
  return (
    <>
      <StaticEnvironment />  {/* No useFrame, no state changes */}
      <AnimatedProduct />     {/* Has useFrame, isolated re-renders */}
    </>
  )
}
```

## Shader Performance
```glsl
// Prefer step/smoothstep over if/else
// BAD
if (uv.x > 0.5) { color = vec3(1.0); }
// GOOD
color = mix(vec3(0.0), vec3(1.0), step(0.5, uv.x));

// Use mediump where possible
precision mediump float;

// Avoid dependent texture reads
// BAD: texture lookup based on another texture
vec2 offset = texture2D(offsetMap, uv).xy;
vec4 color = texture2D(colorMap, uv + offset);
// Move to vertex shader when possible
```

## Debug Tools
```jsx
import { Stats, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Perf } from 'r3f-perf'

// FPS counter
<Stats />

// Detailed performance monitor
<Perf position="top-left" />

// Navigation gizmo
<GizmoHelper alignment="bottom-right">
  <GizmoViewport />
</GizmoHelper>
```

## E-Commerce Checklist
- [ ] Models under 2MB (use Draco compression, `gltf-transform`)
- [ ] Max 50k triangles per product model
- [ ] Textures: WebP for 2D, KTX2 for 3D, max 1024px on mobile
- [ ] `frameloop="demand"` for static product displays
- [ ] Preload next product model while viewing current
- [ ] Fallback to 2D image if WebGL not supported
- [ ] Test on low-end Android (Samsung A series) — target 30fps minimum
- [ ] Lazy load 3D viewer — show 2D image first, load Canvas on interaction

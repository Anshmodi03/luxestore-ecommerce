# Three.js & React Three Fiber Scene Builder

## R3F Canvas Setup
```jsx
import { Canvas } from '@react-three/fiber'

<Canvas
  shadows
  dpr={[1, 2]}
  camera={{ position: [0, 0, 5], fov: 45 }}
  gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
>
  <Suspense fallback={null}>
    <Scene />
  </Suspense>
</Canvas>
```

## GLTF/GLB Model Loading
```jsx
import { useGLTF, useAnimations } from '@react-three/drei'

function ProductModel({ url }) {
  const { scene, animations } = useGLTF(url)
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    // Clone for multiple instances
    const clone = scene.clone()
    return () => clone.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose()
        child.material.dispose()
      }
    })
  }, [scene])

  return <primitive object={scene} scale={1} />
}

// Preload models
useGLTF.preload('/models/product.glb')
```

### Draco Compression
```jsx
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
```

## Camera Controls
```jsx
import { OrbitControls, PresentationControls } from '@react-three/drei'

// Product viewer orbit
<OrbitControls
  enablePan={false}
  enableZoom={true}
  minDistance={2}
  maxDistance={10}
  minPolarAngle={Math.PI / 6}
  maxPolarAngle={Math.PI / 2}
  autoRotate
  autoRotateSpeed={1}
/>

// Drag-to-rotate (mobile-friendly)
<PresentationControls
  global
  snap
  rotation={[0, -Math.PI / 4, 0]}
  polar={[-Math.PI / 4, Math.PI / 4]}
  azimuth={[-Math.PI / 4, Math.PI / 4]}
>
  <ProductModel />
</PresentationControls>
```

## Lighting Setups
```jsx
import { Environment, Lightformer, AccumulativeShadows, RandomizedLight } from '@react-three/drei'

// Studio lighting for products
<>
  <ambientLight intensity={0.4} />
  <directionalLight position={[10, 10, 5]} intensity={1} castShadow shadow-mapSize={2048} />
  <Environment preset="studio" />
</>

// Custom environment
<Environment resolution={256}>
  <Lightformer position={[0, 5, -5]} scale={[10, 1, 1]} intensity={2} />
</Environment>

// Soft shadows
<AccumulativeShadows temporal frames={60} position={[0, -0.5, 0]}>
  <RandomizedLight amount={8} position={[5, 5, -5]} />
</AccumulativeShadows>
```

## Responsive 3D
```jsx
import { useThree } from '@react-three/fiber'

function ResponsiveScene() {
  const { viewport, size } = useThree()
  const isMobile = size.width < 768

  return (
    <mesh scale={isMobile ? 0.6 : 1}>
      <ProductModel />
    </mesh>
  )
}

// Adaptive DPR
import { AdaptiveDpr } from '@react-three/drei'
<Canvas>
  <AdaptiveDpr pixelated />
</Canvas>
```

## Post-Processing
```jsx
import { EffectComposer, Bloom, SSAO, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

<EffectComposer multisampling={4}>
  <Bloom luminanceThreshold={0.9} intensity={0.5} mipmapBlur />
  <SSAO radius={0.05} intensity={15} />
  <Vignette offset={0.3} darkness={0.6} blendFunction={BlendFunction.NORMAL} />
</EffectComposer>
```

## E-Commerce Product Viewer Pattern
```jsx
function ProductViewer({ modelUrl, onLoaded }) {
  return (
    <div className="w-full aspect-square relative">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
        <Suspense fallback={<Loader />}>
          <Stage environment="studio" intensity={0.5} adjustCamera={false}>
            <ProductModel url={modelUrl} />
          </Stage>
          <OrbitControls autoRotate enablePan={false} />
        </Suspense>
      </Canvas>
      {/* HTML overlay for price, add-to-cart */}
      <Html as="div" className="absolute bottom-4 left-4">
        <button className="btn-primary">Add to Cart</button>
      </Html>
    </div>
  )
}
```

## Performance: Instancing & LOD
```jsx
import { Instances, Instance, Detailed } from '@react-three/drei'

// Instancing for repeated objects (e.g., product grid)
<Instances limit={100}>
  <boxGeometry />
  <meshStandardMaterial />
  {products.map((p, i) => (
    <Instance key={i} position={[i * 2, 0, 0]} color={p.color} />
  ))}
</Instances>

// LOD for distance-based quality
<Detailed distances={[0, 10, 25]}>
  <HighPolyModel />
  <MedPolyModel />
  <LowPolyModel />
</Detailed>
```

## Common Pitfalls
- Always wrap 3D content in `<Suspense>` — GLTF loading is async
- Never set state inside `useFrame` — use refs instead
- Dispose textures/geometries on unmount to prevent memory leaks
- Use `<Html>` from drei for overlaying 2D UI on 3D scenes
- Set `frameloop="demand"` on Canvas if scene is static (saves battery)
- Test on mobile early — reduce shadow map size, disable post-processing

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import Globe from './Globe'
import Background from './Background'
import CameraRig from './CameraRig'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 200 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
      style={{ position: 'fixed', inset: 0 }}
    >
      <color attach="background" args={['#020817']} />

      <Suspense fallback={null}>
        <Background />
        <Globe />
        <CameraRig />

        {/* Lighting */}
        <ambientLight intensity={0.15} color="#1a2a4a" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#4fc3f7" />
        <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#b39ddb" />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.7}
            intensity={1.4}
            blendFunction={BlendFunction.ADD}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.7} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

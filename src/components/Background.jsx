import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function DustParticles() {
  const mesh = useRef()
  const count = 200

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      speeds[i] = 0.0003 + Math.random() * 0.0005
    }
    return { positions, speeds }
  }, [])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const pos = mesh.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] -= speeds[i] * delta * 60
      if (pos.array[i * 3 + 1] < -10) pos.array[i * 3 + 1] = 10
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#4fc3f7"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  )
}

export default function Background() {
  return (
    <>
      <Stars radius={80} depth={50} count={3000} factor={3} saturation={0.3} fade speed={0.4} />
      <DustParticles />
      <fog attach="fog" args={['#020817', 20, 60]} />
    </>
  )
}

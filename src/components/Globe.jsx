import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import useSectionStore, { SECTIONS, SECTION_CONFIG } from '../store/useSectionStore'

function GlobeLines() {
  const mesh = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.82, 3)
    return new THREE.EdgesGeometry(geo)
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04
  })

  return (
    <lineSegments ref={mesh} geometry={geometry}>
      <lineBasicMaterial color="#4fc3f7" transparent opacity={0.12} />
    </lineSegments>
  )
}

function EnergyRing({ radius, rotationSpeed, tilt, color }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.z += rotationSpeed * 0.01
    mesh.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2 + radius) * 0.15
  })

  const geometry = useMemo(() => {
    return new THREE.TorusGeometry(radius, 0.006, 8, 120)
  }, [radius])

  return (
    <mesh ref={mesh} rotation={[tilt, 0, 0]} geometry={geometry}>
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

function OrbitalParticles() {
  const mesh = useRef()
  const count = 80

  const { positions, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const offsets = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 1.95 + (Math.random() - 0.5) * 0.3
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.4
      positions[i * 3 + 2] = Math.sin(angle) * radius
      offsets[i] = Math.random() * Math.PI * 2
    }
    return { positions, offsets }
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y += 0.002
    const pos = mesh.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime * 0.5 + offsets[i]
      pos.array[i * 3 + 1] = Math.sin(t) * 0.15
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#00e5ff" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Hotspot({ section, config }) {
  const dotRef = useRef()
  const haloRef = useRef()
  const spinRingRef = useRef()
  const pulseRing1 = useRef()
  const pulseRing2 = useRef()
  const lightRef = useRef()
  const textRef = useRef()
  const { activeSection, hoveredSection, setSection, setHovered } = useSectionStore()

  const isActive = activeSection === section
  const isHovered = hoveredSection === section
  const color = config.hotspot.color

  const position = useMemo(() => {
    const { phi, theta } = config.hotspot
    const r = 1.85
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    )
  }, [config])

  // Radially outward offset for the label — points away from globe center
  const labelOffset = useMemo(() => position.clone().normalize().multiplyScalar(0.42), [position])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const fastPulse = Math.sin(t * 3) * 0.5 + 0.5
    const slowPulse = Math.sin(t * 1.2) * 0.5 + 0.5

    if (dotRef.current) {
      const targetScale = isActive ? 2.2 + fastPulse * 0.4 : isHovered ? 1.6 + fastPulse * 0.2 : 1 + fastPulse * 0.15
      const cur = dotRef.current.scale.x
      const next = cur + (targetScale - cur) * 0.12
      dotRef.current.scale.setScalar(next)
    }

    if (haloRef.current) {
      haloRef.current.material.opacity = isActive
        ? 0.18 + slowPulse * 0.12
        : isHovered ? 0.1 + slowPulse * 0.08 : 0
      const hs = isActive ? 1.0 + slowPulse * 0.3 : 1.0
      haloRef.current.scale.setScalar(hs)
    }

    if (spinRingRef.current) {
      spinRingRef.current.rotation.z += isActive ? 0.04 : 0.015
      spinRingRef.current.material.opacity = isActive ? 0.9 + fastPulse * 0.1 : isHovered ? 0.45 : 0.2
    }

    // Expanding pulse rings — only when active
    if (pulseRing1.current) {
      const p1 = ((t * 0.8) % 1)
      pulseRing1.current.scale.setScalar(1 + p1 * 2.5)
      pulseRing1.current.material.opacity = isActive ? (1 - p1) * 0.6 : 0
    }
    if (pulseRing2.current) {
      const p2 = (((t * 0.8) + 0.5) % 1)
      pulseRing2.current.scale.setScalar(1 + p2 * 2.5)
      pulseRing2.current.material.opacity = isActive ? (1 - p2) * 0.6 : 0
    }

    if (lightRef.current) {
      lightRef.current.intensity = isActive ? 1.8 + fastPulse * 0.8 : isHovered ? 0.6 : 0
    }

    if (textRef.current) {
      const targetOpacity = isActive ? 1 : isHovered ? 0.85 : 0.4
      textRef.current.fillOpacity += (targetOpacity - textRef.current.fillOpacity) * 0.08
    }
  })

  return (
    <group position={position}>
      {/* Invisible click target — larger hit area */}
      <mesh
        onClick={() => setSection(section)}
        onPointerEnter={() => setHovered(section)}
        onPointerLeave={() => setHovered(null)}
      >
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Core dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Halo glow sphere */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0} side={THREE.FrontSide} />
      </mesh>

      {/* Spinning orbit ring */}
      <mesh ref={spinRingRef}>
        <torusGeometry args={[0.14, 0.006, 6, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Expanding pulse rings (active only) */}
      <mesh ref={pulseRing1}>
        <torusGeometry args={[0.12, 0.004, 6, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0} />
      </mesh>
      <mesh ref={pulseRing2}>
        <torusGeometry args={[0.12, 0.004, 6, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0} />
      </mesh>

      {/* Point light — active only */}
      <pointLight ref={lightRef} color={color} intensity={0} distance={2.5} />

      {/* Label — always faces camera via Billboard, floats radially outward */}
      <Billboard position={labelOffset}>
        <Text
          ref={textRef}
          fontSize={0.095}
          color={color}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.4}
          outlineWidth={0.003}
          outlineColor="#000000"
          outlineOpacity={0.6}
          letterSpacing={0.06}
        >
          {config.label.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  )
}

export default function Globe() {
  const globeRef = useRef()
  const innerRef = useRef()
  const activeSection = useSectionStore((s) => s.activeSection)

  useFrame((state) => {
    if (!globeRef.current) return
    globeRef.current.rotation.y += 0.0015
    const t = state.clock.elapsedTime
    globeRef.current.position.y = Math.sin(t * 0.4) * 0.08

    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.003
      const pulse = 0.8 + Math.sin(t * 1.5) * 0.15
      innerRef.current.material.emissiveIntensity = pulse
    }
  })

  const hotspotEntries = Object.entries(SECTION_CONFIG).filter(
    ([, cfg]) => cfg.hotspot !== null
  )

  return (
    <group ref={globeRef}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color="#020c24"
          emissive="#0a2040"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshStandardMaterial
          color="#041428"
          emissive="#1a4a7a"
          emissiveIntensity={0.8}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      <GlobeLines />

      {/* Orbiting rings */}
      <EnergyRing radius={2.1} rotationSpeed={0.8} tilt={Math.PI * 0.1} color="#4fc3f7" />
      <EnergyRing radius={2.3} rotationSpeed={-0.5} tilt={Math.PI * 0.35} color="#b39ddb" />
      <EnergyRing radius={2.5} rotationSpeed={0.3} tilt={Math.PI * 0.55} color="#00e5ff" />

      <OrbitalParticles />

      {/* Hotspots */}
      {hotspotEntries.map(([section, config]) => (
        <Hotspot key={section} section={section} config={config} />
      ))}

      {/* Ambient point light inside globe */}
      <pointLight color="#4fc3f7" intensity={2} distance={4} />
    </group>
  )
}

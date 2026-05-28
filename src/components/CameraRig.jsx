import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'
import useSectionStore, { SECTION_CONFIG } from '../store/useSectionStore'

const target = new THREE.Vector3()
const lerpTarget = new THREE.Vector3()

export default function CameraRig() {
  const { camera } = useThree()
  const activeSection = useSectionStore((s) => s.activeSection)
  const setTransitioning = useSectionStore((s) => s.setTransitioning)
  const swayRef = useRef({ x: 0, y: 0 })
  const swayOffset = useRef({ x: 0, y: 0 })
  const currentTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    const config = SECTION_CONFIG[activeSection]
    if (!config) return

    const [px, py, pz] = config.camera.position
    const [tx, ty, tz] = config.camera.target

    setTransitioning(true)
    swayOffset.current = { x: 0, y: 0 }

    gsap.to(camera.position, {
      x: px, y: py, z: pz,
      duration: 2.2,
      ease: 'power2.inOut',
      onComplete: () => setTransitioning(false),
    })

    gsap.to(currentTarget.current, {
      x: tx, y: ty, z: tz,
      duration: 2.2,
      ease: 'power2.inOut',
    })
  }, [activeSection])

  useEffect(() => {
    const onMove = (e) => {
      swayRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.06
      swayRef.current.y = (e.clientY / window.innerHeight - 0.5) * -0.04
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    lerpTarget.lerp(currentTarget.current, 0.05)
    camera.lookAt(lerpTarget)

    // subtle sway — apply only the delta so offset converges and never drifts
    const prevX = swayOffset.current.x
    const prevY = swayOffset.current.y
    swayOffset.current.x += (swayRef.current.x - swayOffset.current.x) * 0.05
    swayOffset.current.y += (swayRef.current.y - swayOffset.current.y) * 0.05
    camera.position.x += swayOffset.current.x - prevX
    camera.position.y += swayOffset.current.y - prevY
  })

  return null
}

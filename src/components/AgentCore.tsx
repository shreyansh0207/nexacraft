import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { hasWebGL, useReducedMotion } from '../lib/hooks'

function AgentVisual() {
  const core = useRef<THREE.Mesh>(null)
  const orbit = useRef<THREE.Group>(null)
  const web = useRef<THREE.Group>(null)
  const matRef = useRef<THREE.LineBasicMaterial>(null)

  const { webGeom, nodeGeom } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < 10; i++) {
      const r = 2.5 + Math.random() * 0.7
      const theta = (i / 10) * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.6,
          r * Math.cos(phi),
        ),
      )
    }
    const linePts: number[] = []
    for (const n of nodes) {
      linePts.push(0, 0, 0, n.x, n.y, n.z)
    }
    const webGeom = new THREE.BufferGeometry()
    webGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3))
    const nodeGeom = new THREE.BufferGeometry()
    nodeGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(nodes.flatMap((v) => [v.x, v.y, v.z]), 3),
    )
    return { webGeom, nodeGeom }
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (core.current) {
      core.current.rotation.y += delta * 0.5
      core.current.rotation.x = Math.sin(t * 0.5) * 0.2
    }
    if (orbit.current) orbit.current.rotation.y -= delta * 0.6
    if (web.current) web.current.rotation.y += delta * 0.16
    if (matRef.current) matRef.current.opacity = 0.22 + Math.sin(t * 2.1) * 0.1
  })

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#0e2a33"
          emissive="#22d3ee"
          emissiveIntensity={0.55}
          metalness={0.7}
          roughness={0.25}
          wireframe
        />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.15, 2]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} />
      </mesh>
      <mesh ref={orbit} rotation={[1.1, 0, 0.4]}>
        <torusGeometry args={[1.9, 0.01, 8, 120]} />
        <meshBasicMaterial color="#ff6a3d" transparent opacity={0.55} />
      </mesh>
      <group ref={web}>
        <lineSegments geometry={webGeom}>
          <lineBasicMaterial
            ref={matRef}
            color="#22d3ee"
            transparent
            opacity={0.25}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        <points geometry={nodeGeom}>
          <pointsMaterial
            size={0.12}
            color="#ff8a5c"
            transparent
            opacity={0.95}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  )
}

export default function AgentCore() {
  const reduced = useReducedMotion()
  const [ok, setOk] = useState(false)
  const [inView, setInView] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOk(!reduced && hasWebGL())
  }, [reduced])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="relative h-full min-h-[340px] w-full">
      {ok ? (
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0, 0.4, 5.4], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={inView ? 'always' : 'never'}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 3, 4]} intensity={30} color="#22d3ee" />
          <pointLight position={[-3, -2, 3]} intensity={22} color="#ff6a3d" />
          <AgentVisual />
        </Canvas>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 200" className="h-64 w-64 opacity-60">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#22d3ee" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="#ff6a3d" strokeOpacity="0.4" />
            <polygon points="100,55 139,122 61,122" fill="none" stroke="#22d3ee" strokeOpacity="0.6" />
            <polygon points="100,145 61,78 139,78" fill="none" stroke="#ff6a3d" strokeOpacity="0.6" />
            <circle cx="100" cy="100" r="6" fill="#22d3ee" />
          </svg>
        </div>
      )}
    </div>
  )
}

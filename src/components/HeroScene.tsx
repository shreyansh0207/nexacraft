import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    const g = ref.current
    if (!g) return
    const { x, y } = state.pointer
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.26, 2.4, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.2, 2.4, delta)
    const targetY = Math.min(window.scrollY * 0.0014, 1.6)
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 2.2, delta)
  })
  return <group ref={ref}>{children}</group>
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#ff6a3d'),
      new THREE.Color('#ff9a5a'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#7dd3fc'),
    ]
    for (let i = 0; i < count; i++) {
      const r = 5.5 + Math.random() * 7
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72
      positions[i * 3 + 2] = r * Math.cos(phi)
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((_, delta) => {
    const p = ref.current
    if (!p) return
    p.rotation.y += delta * 0.022
    p.rotation.x += delta * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function Satellites() {
  const orbitA = useRef<THREE.Group>(null)
  const orbitB = useRef<THREE.Group>(null)
  const orbitC = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (orbitA.current) {
      orbitA.current.rotation.y += delta * 0.5
      orbitA.current.rotation.z = Math.sin(t * 0.3) * 0.2
    }
    if (orbitB.current) orbitB.current.rotation.y -= delta * 0.36
    if (orbitC.current) {
      orbitC.current.rotation.x -= delta * 0.28
      orbitC.current.rotation.y += delta * 0.2
    }
  })

  return (
    <>
      <group ref={orbitA} rotation={[0.45, 0, 0.15]}>
        <Float speed={2.4} rotationIntensity={1.6} floatIntensity={0.6}>
          <mesh position={[3.4, 0.5, 0]}>
            <octahedronGeometry args={[0.24, 0]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.7}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
        </Float>
        <Float speed={2} rotationIntensity={1.4} floatIntensity={0.5}>
          <mesh position={[-3.1, -0.9, 0.6]}>
            <boxGeometry args={[0.26, 0.26, 0.26]} />
            <meshStandardMaterial
              color="#ff6a3d"
              emissive="#ff6a3d"
              emissiveIntensity={0.6}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
      </group>
      <group ref={orbitB} rotation={[-0.5, 0.6, 0]}>
        <Float speed={2.2} rotationIntensity={1.5} floatIntensity={0.6}>
          <mesh position={[0, 3.3, 0.4]}>
            <torusGeometry args={[0.2, 0.07, 12, 32]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#a78bfa"
              emissiveIntensity={0.65}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        </Float>
      </group>
      <group ref={orbitC}>
        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={0.7}>
          <mesh position={[0.4, -3.2, 0.8]}>
            <icosahedronGeometry args={[0.17, 0]} />
            <meshStandardMaterial
              color="#7dd3fc"
              emissive="#7dd3fc"
              emissiveIntensity={0.7}
              metalness={0.6}
              roughness={0.25}
            />
          </mesh>
        </Float>
      </group>
    </>
  )
}

function Core() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  const shell = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.24
      ring1.current.rotation.x = Math.PI / 2.35 + Math.sin(t * 0.4) * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.18
      ring2.current.rotation.y = Math.PI / 1.8 + Math.cos(t * 0.35) * 0.12
    }
    if (shell.current) shell.current.rotation.y += delta * 0.08
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.35} floatIntensity={0.85}>
        <mesh>
          <icosahedronGeometry args={[1.8, 16]} />
          <MeshDistortMaterial
            color="#14141f"
            metalness={0.85}
            roughness={0.18}
            distort={0.32}
            speed={1.7}
            emissive="#ff6a3d"
            emissiveIntensity={0.1}
          />
        </mesh>
        <mesh ref={shell} scale={1.22}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshBasicMaterial color="#ff8a5c" wireframe transparent opacity={0.14} />
        </mesh>
        <mesh scale={0.55}>
          <sphereGeometry args={[1.8, 32, 32]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} />
        </mesh>
      </Float>

      <mesh ref={ring1} rotation={[Math.PI / 2.35, 0.3, 0]}>
        <torusGeometry args={[3.05, 0.012, 8, 140]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, -0.5, 0.4]}>
        <torusGeometry args={[3.65, 0.008, 8, 140]} />
        <meshBasicMaterial color="#ff6a3d" transparent opacity={0.35} />
      </mesh>

      <Satellites />
    </group>
  )
}

function NeuralWeb() {
  const group = useRef<THREE.Group>(null)
  const { linesGeom, nodesGeom } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    const nodeCount = 26
    for (let i = 0; i < nodeCount; i++) {
      const r = 3.4 + Math.random() * 1.8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.75,
          r * Math.cos(phi),
        ),
      )
    }
    const linePts: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.7) {
          linePts.push(nodes[i].x, nodes[i].y, nodes[i].z)
          linePts.push(nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    const linesGeom = new THREE.BufferGeometry()
    linesGeom.setAttribute('position', new THREE.Float32BufferAttribute(linePts, 3))
    const nodesGeom = new THREE.BufferGeometry()
    nodesGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(nodes.flatMap((v) => [v.x, v.y, v.z]), 3),
    )
    return { linesGeom, nodesGeom }
  }, [])

  const matRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y += delta * 0.045
    const t = state.clock.elapsedTime
    if (matRef.current) matRef.current.opacity = 0.12 + Math.sin(t * 1.4) * 0.05
  })

  return (
    <group ref={group}>
      <lineSegments geometry={linesGeom}>
        <lineBasicMaterial
          ref={matRef}
          color="#22d3ee"
          transparent
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={nodesGeom}>
        <pointsMaterial
          size={0.1}
          color="#7dd3fc"
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HeroScene({ active, mobile }: { active: boolean; mobile: boolean }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, mobile ? 1.3 : 2]}
        camera={{ position: [0, 0, 9.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={active ? 'always' : 'never'}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <pointLight position={[-6, 2, 4]} intensity={55} color="#ff6a3d" />
        <pointLight position={[6, -2, 4]} intensity={55} color="#22d3ee" />
        <pointLight position={[0, 5, -6]} intensity={45} color="#a78bfa" />
        <Rig>
          <Core />
          <NeuralWeb />
          <Particles count={mobile ? 480 : 1500} />
        </Rig>
      </Canvas>
    </div>
  )
}

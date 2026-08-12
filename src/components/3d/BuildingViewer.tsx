'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Floor data ──────────────────────────────────────────────── */
interface FloorZone {
  name: string
  floors: [number, number]
  color: string
  emissive: string
  price: string
  units: number
  avgSqFt: string
}

const FLOOR_ZONES: FloorZone[] = [
  { name: 'Penthouse Collection', floors: [70, 85], color: '#D4AF37', emissive: '#D4AF37', price: '$18M – $45M', units: 8, avgSqFt: '6,500 – 8,200 ft²' },
  { name: 'Sky Residences', floors: [50, 69], color: '#F59E0B', emissive: '#F59E0B', price: '$8M – $17M', units: 24, avgSqFt: '3,200 – 4,500 ft²' },
  { name: 'Executive Suites', floors: [25, 49], color: '#E57C23', emissive: '#E57C23', price: '$4M – $7.5M', units: 48, avgSqFt: '2,000 – 2,800 ft²' },
  { name: 'Urban Lofts', floors: [1, 24], color: '#94A3B8', emissive: '#64748B', price: '$2M – $3.8M', units: 60, avgSqFt: '1,200 – 1,800 ft²' },
]

/* ─── Single floor mesh ──────────────────────────────────────── */
function FloorSegment({
  floorIndex,
  totalFloors,
  zone,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}: {
  floorIndex: number
  totalFloors: number
  zone: FloorZone
  isHovered: boolean
  isSelected: boolean
  onHover: (floor: number | null) => void
  onSelect: (floor: number) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const floorHeight = 0.065
  const y = (floorIndex / totalFloors) * totalFloors * floorHeight - (totalFloors * floorHeight) / 2

  // Taper the building — narrower at top
  const taperFactor = 1 - (floorIndex / totalFloors) * 0.35
  const width = 1.6 * taperFactor
  const depth = 1.1 * taperFactor

  useFrame(() => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.MeshStandardMaterial
    const targetEmissiveIntensity = isSelected ? 1.8 : isHovered ? 1.0 : 0.15
    mat.emissiveIntensity += (targetEmissiveIntensity - mat.emissiveIntensity) * 0.1
  })

  return (
    <mesh
      ref={meshRef}
      position={[0, y, 0]}
      onPointerOver={(e) => { e.stopPropagation(); onHover(floorIndex) }}
      onPointerOut={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onSelect(floorIndex) }}
    >
      <boxGeometry args={[width, floorHeight * 0.88, depth]} />
      <meshStandardMaterial
        color={isSelected ? zone.color : isHovered ? zone.color : '#1A2130'}
        emissive={zone.emissive}
        emissiveIntensity={0.15}
        metalness={0.85}
        roughness={0.18}
        transparent
        opacity={isSelected ? 1 : isHovered ? 0.95 : 0.85}
      />
    </mesh>
  )
}

/* ─── Building spire ──────────────────────────────────────────── */
function Spire({ totalFloors }: { totalFloors: number }) {
  const floorHeight = 0.065
  const topY = (totalFloors * floorHeight) / 2

  return (
    <group position={[0, topY + 0.6, 0]}>
      <mesh>
        <coneGeometry args={[0.1, 1.2, 8]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#D4AF37"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Beacon light */}
      <pointLight position={[0, 0.8, 0]} color="#F59E0B" intensity={3} distance={6} />
    </group>
  )
}

/* ─── Glass curtain-wall wireframe ────────────────────────────── */
function GlassCurtain({ totalFloors }: { totalFloors: number }) {
  const floorHeight = 0.065
  const height = totalFloors * floorHeight

  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1.65, height, 1.15]} />
      <meshStandardMaterial
        color="#D4AF37"
        transparent
        opacity={0.12}
        wireframe
        wireframeLinewidth={1}
      />
    </mesh>
  )
}

/* ─── Ground plane ────────────────────────────────────────────── */
function Ground({ totalFloors }: { totalFloors: number }) {
  const floorHeight = 0.065
  const bottomY = -(totalFloors * floorHeight) / 2 - 0.05

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, bottomY, 0]} receiveShadow>
      <circleGeometry args={[6, 64]} />
      <meshStandardMaterial color="#0B0E14" metalness={0.9} roughness={0.4} />
    </mesh>
  )
}

/* ─── Ambient particles ──────────────────────────────────────── */
function Particles() {
  const count = 250
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [])

  const ref = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#D4AF37"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── Building assembly ───────────────────────────────────────── */
function Building({
  hoveredFloor,
  selectedFloor,
  onHover,
  onSelect,
}: {
  hoveredFloor: number | null
  selectedFloor: number | null
  onHover: (floor: number | null) => void
  onSelect: (floor: number) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const totalFloors = 85

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.12
  })

  const getZone = (floorIndex: number): FloorZone => {
    for (const zone of FLOOR_ZONES) {
      if (floorIndex >= zone.floors[0] && floorIndex <= zone.floors[1]) return zone
    }
    return FLOOR_ZONES[3]
  }

  return (
    <Float speed={0.4} rotationIntensity={0.06} floatIntensity={0.15}>
      <group ref={groupRef}>
        {Array.from({ length: totalFloors }, (_, i) => (
          <FloorSegment
            key={i}
            floorIndex={i + 1}
            totalFloors={totalFloors}
            zone={getZone(i + 1)}
            isHovered={hoveredFloor === i + 1}
            isSelected={selectedFloor !== null && getZone(selectedFloor).name === getZone(i + 1).name}
            onHover={onHover}
            onSelect={onSelect}
          />
        ))}
        <Spire totalFloors={totalFloors} />
        <GlassCurtain totalFloors={totalFloors} />
        <Ground totalFloors={totalFloors} />
        <Particles />
      </group>
    </Float>
  )
}

/* ─── Main exported component ─────────────────────────────────── */
export default function BuildingViewer({
  onFloorSelect,
  onFloorHover,
  hoveredFloor,
  selectedFloor,
}: {
  onFloorSelect: (floor: number) => void
  onFloorHover: (floor: number | null) => void
  hoveredFloor: number | null
  selectedFloor: number | null
}) {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '600px' }}>
      <Canvas
        camera={{ position: [5, 0.2, 8.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.3}
          color="#F59E0B"
        />
        <directionalLight
          position={[-5, 5, -5]}
          intensity={0.5}
          color="#D4AF37"
        />
        <pointLight position={[0, 6, 0]} intensity={0.8} color="#D4AF37" />

        <fog attach="fog" args={['#0B0E14', 12, 35]} />

        <Suspense fallback={null}>
          <Building
            hoveredFloor={hoveredFloor}
            selectedFloor={selectedFloor}
            onHover={onFloorHover}
            onSelect={onFloorSelect}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={14}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  )
}

export { FLOOR_ZONES }
export type { FloorZone }

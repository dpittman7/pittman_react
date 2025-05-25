import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF, Text3D } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import fontJSON from '../images/Bebas_Neue_Regular.json'

export function FrameModel({ project, ...props }) {
  const { scene, nodes } = useGLTF('/models/frame.glb')
  const { camera } = useThree()
  const windowMeshRef = useRef()
  const textGroup = useRef()

  useEffect(() => {
    const mesh = scene.getObjectByName('Window_Plane')
    if (!mesh || !project?.image) return
    const loader = new THREE.TextureLoader()
    const url = require(`../images/projects/${project.image}`)
    loader.load(url, (texture) => {
      texture.flipY = false
      if (texture.colorSpace !== undefined) texture.colorSpace = THREE.SRGBColorSpace
      texture.wrapS = THREE.ClampToEdgeWrapping
      texture.wrapT = THREE.ClampToEdgeWrapping
      mesh.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, side: THREE.DoubleSide, transparent: true })
      mesh.material.needsUpdate = true
      windowMeshRef.current = mesh
    })
  }, [project?.image, scene])

  useFrame((_, delta) => {
    if (windowMeshRef.current) {
      windowMeshRef.current.rotation.y += delta * 0.5
    }
    if (textGroup.current) {
      textGroup.current.rotation.y += delta * 0.2
      textGroup.current.children.forEach(child => {
        child.lookAt(camera.position)
      })
    }
  })

  const projectMesh = nodes.Project_Plane
  const box = useMemo(() => new THREE.Box3().setFromObject(projectMesh), [projectMesh])
  const size = useMemo(() => box.getSize(new THREE.Vector3()), [box])
  const center = useMemo(() => box.getCenter(new THREE.Vector3()), [box])

  const offset = 0.5
  const sides = useMemo(() => [
    { pos: [center.x - size.x / 2 - offset, center.y, center.z], rot: [0, Math.PI / 2, 0] },
    { pos: [center.x + size.x / 2 + offset, center.y, center.z], rot: [0, -Math.PI / 2, 0] },
  ], [center, size])

  return (
    <primitive object={scene} {...props} dispose={null}>
      <group ref={textGroup}>
        {sides.map((s, i) => (
          <Text3D
            key={i}
            font={fontJSON}
            size={0.15}
            height={0.03}
            position={s.pos}
            rotation={s.rot}
            bevelEnabled
            bevelSegments={4}
            bevelSize={0.005}
          >
            PROJECTS
            <meshStandardMaterial color="white" />
          </Text3D>
        ))}
      </group>
    </primitive>
  )
}

useGLTF.preload('/models/frame.glb')

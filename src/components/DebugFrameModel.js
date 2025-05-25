import React, { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

export function DebugFrameModel({ project, ...props }) {
  const gltf = useGLTF('/models/frame.glb')
  const { scene } = gltf

  useEffect(() => {
    console.log('--- export scene graph ---')
    scene.traverse((child) => {
      if (child.isMesh) {
        const pos = child.position.toArray().map((n) => n.toFixed(2))
        const rot = [child.rotation.x, child.rotation.y, child.rotation.z].map((n) => n.toFixed(2))
        const scl = child.scale.toArray().map((n) => n.toFixed(2))
        console.log(child.name, 'position=', pos, 'rotation=', rot, 'scale=', scl)
      }
    })
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/frame.glb')

import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect } from 'react'

function AlignCameraToMesh({ meshName, distance = 5 }) {
  const { camera, scene } = useThree()
  useEffect(() => {
    const mesh = scene.getObjectByName(meshName)
    if (!mesh) return

    // compute the mesh’s world‑space center
    const box = new THREE.Box3().setFromObject(mesh)
    const center = box.getCenter(new THREE.Vector3())

    // position camera in front of it along its local normal (here +Z)
    camera.position.set(center.x, center.y, center.z + distance)
    camera.lookAt(center)
    camera.updateProjectionMatrix()
  }, [camera, scene, meshName, distance])

  // optional: if you rotate the mesh over time, uncomment to keep it “locked on”  
  // useFrame(() => {
  //   const mesh = scene.getObjectByName(meshName)
  //   if (mesh) camera.lookAt(mesh.position)
  // })

  return null
}

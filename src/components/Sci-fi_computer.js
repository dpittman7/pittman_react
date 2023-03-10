/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Render Blue (https://sketchfab.com/pablojcd)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/sci-fi-computer-43f296dbc51b40e2b80cb90698c2837b
title: Sci-fi Computer
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/sci-fi_computer.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Pantalla} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Bisagras} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Bisagras} />
          <mesh geometry={nodes.defaultMaterial_4.geometry} material={materials.Bisagras} />
          <mesh geometry={nodes.defaultMaterial_5.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_6.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_7.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_8.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_9.geometry} material={materials.Marcos} />
          <mesh geometry={nodes.defaultMaterial_10.geometry} material={materials.Marcos} />
          <mesh geometry={nodes.defaultMaterial_11.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_12.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_13.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_14.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_15.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_16.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_17.geometry} material={materials.Forros} />
          <mesh geometry={nodes.defaultMaterial_18.geometry} material={materials.Forros} />
          <mesh geometry={nodes.defaultMaterial_19.geometry} material={materials.Marcos} />
          <mesh geometry={nodes.defaultMaterial_20.geometry} material={materials.Marcos} />
          <mesh geometry={nodes.defaultMaterial_21.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_22.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_23.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_24.geometry} material={materials.Carcasa_2} />
          <mesh geometry={nodes.defaultMaterial_25.geometry} material={materials.Carcasa_1} />
          <mesh geometry={nodes.defaultMaterial_26.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_27.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_28.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_29.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_30.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_31.geometry} material={materials.Bisagras} />
          <mesh geometry={nodes.defaultMaterial_32.geometry} material={materials.Bisagras} />
          <mesh geometry={nodes.defaultMaterial_33.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_34.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_35.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_36.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_37.geometry} material={materials.Detalles} />
          <mesh geometry={nodes.defaultMaterial_38.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_39.geometry} material={materials.Bases} />
          <mesh geometry={nodes.defaultMaterial_40.geometry} material={materials.Bisagras} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/sci-fi_computer.glb')

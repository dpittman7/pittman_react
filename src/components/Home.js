import * as THREE from "three"
import React, { Component, Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Html, useProgress } from '@react-three/drei'
import { Model } from './Flaming_orb.js'
import fontUrl from '../images/Bebas_Neue_Regular.json'
import AboutPortal from './AboutPortal'
import { Spinner } from 'reactstrap';

// Smooth camera follow based on pointer
function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      1 + state.mouse.x / 4,
      0.075
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1.5 + state.mouse.y / 4,
      0.075
    )
  })
}

// Floating text that reacts to hover OR keyboard focus, then returns smoothly
function FloatingText({ children, position, rotation, onClick, keyboardActive }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const active = hovered || keyboardActive

  // store original Y and Z-rotation
  const baseY = useMemo(() => position[1], [])
  const baseZ = useMemo(() => rotation?.[2] || 0, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (active) {
      // float & sway
      ref.current.position.y = baseY + Math.sin(t * 2) * 0.2
      ref.current.rotation.z = baseZ + Math.sin(t * 1.5) * 0.1
    } else {
      // lerp back to original
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, baseY, 0.1)
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, baseZ, 0.1)
    }
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <Text3D
        font={fontUrl}
        onPointerOver={() => setHovered(true)}
        onPointerOut={()  => setHovered(false)}
        onClick={onClick}
      >
        {children}
        <meshStandardMaterial color={active ? 'orange' : 'white'} />
      </Text3D>
    </group>
  )
}

// Simple loader while GLTF & textures load
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div>
        <h1>Welcome to my portfolio.</h1>
        <p>The page is loading: <b>{progress}%</b></p>
        <Spinner type="grow" color="warning" />
      </div>
    </Html>
  )
}

document.body.style.background = 'linear-gradient(to right, #E1E1E5, #FFDAB9)'

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutCards: [],
      isLoading: true,
      activeCardIndex: null,
      fov: 115,
      focusIndex: null,    // no focus until Tab pressed
    }
  }

  componentDidMount() {
    fetch('/api/about')
      .then(r => r.json())
      .then(data => this.setState({ aboutCards: data, isLoading: false }))

    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    this.setState({ fov: isMobile ? 145 : 115 })
  }

  openAbout = idx => {
    this.setState({ activeCardIndex: idx })
  }

  closeAbout = () => {
    this.setState({ activeCardIndex: null })
  }

  handleCanvasKeyDown = e => {
    const max = this.state.aboutCards.length
    if (e.key === 'Tab') {
      e.preventDefault()
      this.setState(({ focusIndex }) => ({
        focusIndex: focusIndex === null ? 0 : (focusIndex + 1) % max
      }))
    }
    if ((e.key === 'Enter' || e.key === ' ') && this.state.focusIndex !== null) {
      e.preventDefault()
      this.openAbout(this.state.focusIndex)
    }
  }

  render() {
    const {
      isLoading,
      fov,
      aboutCards,
      activeCardIndex,
      focusIndex,
    } = this.state

    if (isLoading) {
      return (
        <div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }} />
      )
    }

    return (
      <div style={{ height: '100vh' }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 3], fov }}
          tabIndex={0}
          onKeyDown={this.handleCanvasKeyDown}
        >
          <Suspense fallback={<Loader />}>
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />

            <Model play="Animation" position={[1, 2.5, 0.5]} />

            <FloatingText
              position={[-5.5, 8, -4]}
              rotation={[1, 0.5, 0]}
              keyboardActive={focusIndex === 0}
              onClick={() => this.openAbout(0)}
            >
              Math Guy
            </FloatingText>

            <FloatingText
              position={[3.5, 8.5, -4]}
              rotation={[1, -0.5, 0]}
              keyboardActive={focusIndex === 1}
              onClick={() => this.openAbout(1)}
            >
              Developer
            </FloatingText>

            <FloatingText
              position={[-6.5, 4.2, -4.5]}
              keyboardActive={focusIndex === 2}
              onClick={() => this.openAbout(2)}
            >
              Tutor
            </FloatingText>

            <FloatingText
              position={[6, 4.2, -4.5]}
              keyboardActive={focusIndex === 3}
              onClick={() => this.openAbout(3)}
            >
              Otaku
            </FloatingText>

            <FloatingText
              position={[-0.7, -1, -4]}
              keyboardActive={focusIndex === 4}
              onClick={() => this.openAbout(4)}
            >
              Human
            </FloatingText>

            <FloatingText
              position={[-2.5, -2.2, -1]}
              rotation={[-1, 0, 0]}
              keyboardActive={focusIndex === 5}
              onClick={() => this.openAbout(5)}
            >
              Deanta Pittman
            </FloatingText>

            <Rig />
          </Suspense>
        </Canvas>

        {activeCardIndex !== null && (
          <AboutPortal
            about={aboutCards[activeCardIndex]}
            onClose={this.closeAbout}
          />
        )}
      </div>
    )
  }
}

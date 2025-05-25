import * as THREE from "three";
import React, { Component, createRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { DebugFrameModel } from './DebugFrameModel';
import { FrameModel } from './frame';
import Project from './Project';
import './Projects.css';

// Positions and aligns the camera to a named mesh
function AlignCameraToMesh({ meshName, distance = 5, basePos }) {
  const { camera, scene } = useThree();
  React.useEffect(() => {
    const mesh = scene.getObjectByName(meshName);
    if (!mesh) return;
    const box = new THREE.Box3().setFromObject(mesh);
    const center = box.getCenter(new THREE.Vector3());
    basePos.current.set(center.x, center.y + distance, center.z);
    camera.position.copy(basePos.current);
    camera.up.set(0, 0, 1);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
  }, [camera, scene, meshName, distance, basePos]);
  return null;
}

// Smoothly lerps the camera around the base position based on pointer
function Rig({ basePos, xAmp = 0.25, yAmp = 0.25, speed = 0.075 }) {
  // useFrame((state) => {
  //   const { camera, pointer } = state;
  //   const targetX = basePos.current.x + pointer.x * xAmp;
  //   const targetY = basePos.current.y + pointer.y * yAmp;
  //   camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, speed);
  //   camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, speed);
  //   camera.lookAt(basePos.current);
  // });
  // return null;
}

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], isLoading: true, selectedIndex: 0 };
    this.basePos = { current: new THREE.Vector3() };
  }

  componentDidMount() {
    fetch('api/project')
      .then(res => res.json())
      .then(data => this.setState({ projects: data, isLoading: false }));
  }

  render() {
    const { projects, isLoading, selectedIndex } = this.state;
    const current = projects[selectedIndex];

    if (isLoading) {
      return (
        <div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }} />
      );
    }

    return (
      <div className="projects-page">
        <div className="hero-3d">
          <Canvas shadows>
            <PerspectiveCamera makeDefault fov={50} />
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} castShadow />

            <AlignCameraToMesh meshName="Window_Plane" distance={5} basePos={this.basePos} />
            <Rig basePos={this.basePos} />

            <FrameModel
              project={current}
              position={[0, 0, -1]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1.5}
            />
          </Canvas>
        </div>

        <h1 className="projects-title">PROJECTS</h1>

        <div className="carousel-container">
          <Swiper
            modules={[Mousewheel, Pagination]}
            direction="horizontal"
            slidesPerView={1}
            mousewheel
            pagination={{ clickable: true }}
            className="projects-swiper"
            onSlideChange={swiper => this.setState({ selectedIndex: swiper.activeIndex })}
          >
            {projects.map(p => (
              <SwiperSlide key={p.id}>
                <Project project={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
}

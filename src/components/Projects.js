import * as THREE from "three";
import React, { Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Model } from './Sci-fi_computer';
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Project from './Project';
import './Projects.css'; 

function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      1 + state.pointer.x / 4,
      0.075
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      1.5 + state.pointer.y / 4,
      0.075
    );
  });
}

export class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: [], isLoading: true };
  }

  componentDidMount() {
    fetch('api/project')
      .then(res => res.json())
      .then(data => this.setState({ projects: data, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }} />
      );
    }

    return (
      <div className="projects-page">
        {/* Hero 3D + Title */}
        <div className="hero-3d">
            <Canvas shadows camera={{ position: [0, .5, 3], fov: 90 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
            <Model play="Animation" position={[1, 2, 1]} />
            <Rig />
            </Canvas>
        </div>

        {/* Plain HTML header, always right under the case */}
        <h1 className="projects-title">PROJECTS</h1>

        {/* Overlapping carousel */}
        <div className="carousel-container">
          <Swiper
            modules={[Mousewheel, Pagination]}
            direction="horizontal"
            slidesPerView={3}
            mousewheel
            pagination={{ clickable: true }}
            className="projects-swiper"
          >
            {this.state.projects.map(p => (
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

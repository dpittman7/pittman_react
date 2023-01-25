import * as THREE from "three"
import React, { Component, Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Text, Text3D } from '@react-three/drei'
import { Model } from './Sci-fi_computer'

import {
    Row, CardImg, CardTitle, CardSubtitle, CardText, Button
} from 'reactstrap';
import Project from './Project';



function Rig() {
    return useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
    })
}


export class Projects extends Component {
    displayName = Projects.name;

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('api/project')
            .then(response => response.json())
            .then(data => {
                this.setState({ projects: data, isLoading: false });
               
            })
    }


    render() {
        if (this.state.isLoading) {
            return (<div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }}> </div>);
        }
        else {
            return (
                <div>
                    <div style={{ height: "40vh" }} >
                        
                        <Canvas shadows camera={{ position: [0, .5, 3], fov: 90 }}>
                            <ambientLight intensity={1} />
                            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
                            <Model play='Animation' position={[1, 2, 1]} />
                            <Text

                                color="black" // default
                                anchorX="center" // default
                                anchorY="top"
                                position={[1, 0, 1.2]}
                            >
                            PROJECTS
                            </Text>

                          
                            <Rig />
                        </Canvas>
                    </div>
                    <div>
                        
                        <hr></hr>
                        <Row>
                            {this.state.projects.map(project =>
                                <Project key={project.id} project={project} />
                            )}
                        </Row>
                    </div>
                </div>
            );
        }
    }
}; 
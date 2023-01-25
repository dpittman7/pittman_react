import * as THREE from "three"
import React, { Component, Suspense, useRef, useState, Fragment } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Text, Text3D, Html, useProgress } from '@react-three/drei'
import { Model } from './Magic_furball'
import fontUrl from '../images/Bebas_Neue_Regular.json'
import About from './About'
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter
} from 'reactstrap';


function Rig() {
    return useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)
    })
}

function onClickHandler() {
    console.log("yuhyuhyuh");
    console.log(list);
    list.style.display ='none';
}
// cream -> '#F9F4F4'

document.body.style.background = '#E1E1E5';
var list = document.getElementsByClassName('testCard')[0];

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aboutCards: [],
            isLoading: true,
            MathActive: false,
            DevActive: false,
            TutorActive: false,
            OtakuActive: false,
            HumanActive: false
        }
    }

    componentDidMount() {
        fetch('/api/about')
            .then(response => response.json())
            .then(data => {
                this.setState({ aboutCards: data, isLoading: false });
                console.log(data);
                console.log(this.state.aboutCards);
            })
        
    }
    

    handleShow = (name) => {
    console.log("Click Event received " + name);
    var toggle = null;
    switch (name) {
        case 'math':
            console.log("Current State: " + this.state.MathActive);
            toggle = this.state.MathActive ? false : true;
            console.log("Toggle value: " + toggle);
            this.setState({ MathActive: toggle });
            console.log("After toggle: " + this.state.MathActive);
            break;
        case 'dev':
            console.log("Current State: " + this.state.DevActive);
            toggle = this.state.DevActive ? false : true;
            console.log("Toggle Value: " + this.state.DevActive);
            this.setState({ DevActive: toggle });
            console.log("After Toggle: " + this.state.DevActive);
            break;
        case 'tutor':
            toggle = this.state.TutorActive ? false : true;
            this.setState({ TutorActive: toggle });
            break;
        case 'otaku':
            console.log("Current State: " + this.state.OtakuActive);
            toggle = this.state.OtakuActive ? false : true;
            console.log("Toggle Value: " + this.state.OtakuActive);
            this.setState({ OtakuActive: toggle });
            console.log("After Toggle: " + this.state.OtakuActive);
            break;
        case 'human':
            toggle = this.state.HumanActive ? false : true;
            this.setState({ HumanActive: toggle });
            break;
    }

}
  
  
    render() {
        //console.log(this.state.aboutCards);
        if (this.state.isLoading) {
            return (<div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }}> </div>);
        } else {
            return (
                <div style={{ height: "100vh" }} >

                    <Canvas shadows camera={{ position: [0, 0, 4], fov: 115 }}>
                        <Suspense fallback={<Loader />}>
                            <ambientLight intensity={1} />
                            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
                            <Model play='Animation' position={[1, 2.2, 1]} />
                            <Text

                                color="black" // default
                                anchorX="center" // default
                                position={[1, 4, 1.2]}

                            >
                                !
                            </Text>


                            <Text3D font={fontUrl} position={[-5.5, 8, -4]}
                                rotation={[1, .5, 0]} onClick={() => this.handleShow('math')}                 >
                                Math Guy
                                <meshNormalMaterial />
                            </Text3D>

                            <Text3D font={fontUrl} position={[-6.5, 4.2, -4.5]}
                                onClick={() => this.handleShow('tutor')}
                            >
                                Tutor
                                <meshNormalMaterial />
                            </Text3D>

                            <Text3D font={fontUrl} position={[6, 4.2, -4.5]}
                                onClick={() => this.handleShow('otaku')}
                            >
                                Otaku
                                <meshNormalMaterial />
                            </Text3D>

                            <Text3D font={fontUrl} position={[3.5, 8.5, -4]}
                                rotation={[1, -.5, 0]} onClick={() => this.handleShow('dev')}>
                                Developer
                                <meshNormalMaterial />
                            </Text3D>

                            <Text3D font={fontUrl} position={[-.7, -1, -4]}
                                onClick={() => this.handleShow('human')}>
                                Human
                                <meshNormalMaterial />
                            </Text3D>

                            <Text3D font={fontUrl} position={[-2.5, -2.2, -1]}
                                rotation={[-1, 0, 0]}>
                                Deanta Pittman
                                <meshNormalMaterial />
                            </Text3D>

                            <React.Fragment >
                                <Html
                                    position={[-7, -4.5, 0]}
                                    style={{ position: 'fixed', bottom: '0' }}


                                >
                                    {this.state.MathActive ?
                                        <About key={this.state.aboutCards[0].id} about={this.state.aboutCards[0]} />
                                        : null}

                                    {this.state.DevActive ?
                                        <About key={this.state.aboutCards[1].id} about={this.state.aboutCards[1]} />
                                        : null}

                                    {this.state.TutorActive ?
                                        <About key={this.state.aboutCards[2].id} about={this.state.aboutCards[2]} />
                                        : null}
                                    {this.state.OtakuActive ?
                                        <About key={this.state.aboutCards[3].id} about={this.state.aboutCards[3]} />
                                        : null}

                                    {this.state.HumanActive ?
                                        <About key={this.state.aboutCards[4].id} about={this.state.aboutCards[4]} />
                                        : null}
                                </Html>
                            </React.Fragment>
                            <Rig />
                        </Suspense>
                    </Canvas>
                </div>
            );
        }
    }
}
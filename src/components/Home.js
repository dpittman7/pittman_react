import * as THREE from "three"
import React, { Component, Suspense, useRef, useState, Fragment, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Text, Text3D, Html, useProgress } from '@react-three/drei'
import { Model } from './Flaming_orb.js'
import fontUrl from '../images/Bebas_Neue_Regular.json'
import About from './About'
import AMA from './AMA'
import Contact from './Contact'
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter, Spinner
} from 'reactstrap';


function Rig() {
    return useFrame((state) => {
            state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 1 + state.mouse.x / 4, 0.075)
            state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 1.5 + state.mouse.y / 4, 0.075)


    })
}



document.body.style.background = "linear-gradient(to right, #E1E1E5, #FFDAB9)"; // coolgrey: '#E1E1E5', peach: '#FFDAB9'
//var list = document.getElementsByClassName('testCard')[0];

function Loader() {
    const { progress } = useProgress()
    return <Html center>
        <div>
            <h1> Welcome to my portfolio. </h1>
            <p> The page is currently loading: <b> {progress} % loaded</b> </p>
            <Spinner type="grow" color="warning"/>
        </div>
        
    </Html>
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
            HumanActive: false,
            GPTActive: false,
            ContactActive: false,
            fov: 115,
            camPosition: [0,0,5]
        };
        this.handleResize = this.handleResize.bind(this);
    }

 



    componentDidMount() {
        fetch('/api/about')
            .then(response => response.json())
            .then(data => {
                this.setState({ aboutCards: data, isLoading: false });
               // console.log(data);
               // console.log(this.state);
            })
        this.handleResize();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        this.setState({ fov: mobile ? 145 : 115 });
        this.setState({ zHTML: mobile ? 2 : 0 });
    }


    

    handleShow = (name) => {
    //console.log("Click Event received " + name);
    var toggle = null;
    switch (name) {
        case 'math':
           // console.log("Current State: " + this.state.MathActive);
            toggle = this.state.MathActive ? false : true;
           // console.log("Toggle value: " + toggle);
            this.setState({ MathActive: toggle });
           // console.log("After toggle: " + this.state.MathActive);
            break;
        case 'dev':
           // console.log("Current State: " + this.state.DevActive);
            toggle = this.state.DevActive ? false : true;
           // console.log("Toggle Value: " + this.state.DevActive);
            this.setState({ DevActive: toggle });
           // console.log("After Toggle: " + this.state.DevActive);
            break;
        case 'tutor':
            toggle = this.state.TutorActive ? false : true;
            this.setState({ TutorActive: toggle });
            break;
        case 'otaku':
           // console.log("Current State: " + this.state.OtakuActive);
            toggle = this.state.OtakuActive ? false : true;
           // console.log("Toggle Value: " + this.state.OtakuActive);
            this.setState({ OtakuActive: toggle });
           // console.log("After Toggle: " + this.state.OtakuActive);
            break;
        case 'human':
            toggle = this.state.HumanActive ? false : true;
            this.setState({ HumanActive: toggle });
            break;
        case 'gpt':
            toggle = this.state.GPTActive ? false : true;
            this.setState({ GPTActive: toggle });
            break;
        case 'contact':
            toggle = this.state.ContactActive ? false : true;
            this.setState({ ContactActive: toggle });
            break;
    }

    }

    


    render() {
        //console.log(this.state.aboutCards);
        // original pvo: 115
        
        //const { Fov } = this.state.fov; -> returning undefined at the time of canvas render
        if (this.state.isLoading) {
            return (<div className="spinner-border image-center" style={{ width: '5rem', height: '5rem' }}> </div>);
            
        } else {
            return (
                <div style={{ height: "100vh"}}>

                    <Canvas shadows camera={{ position: [0, 0, 3], fov: this.state.fov }}>
                        
                        <Suspense fallback={<Loader />}>
                            <ambientLight intensity={1} />
                            <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
                            <Model play='Animation' position={[1, 2.5, 0.5]} onClick={() => this.handleShow('gpt')} />
                            <Text

                                color="black" // default
                                anchorX="center" // default
                                position={[1, 4, 1.2]}

                            >
                                !
                            </Text>

                            
                            <React.Fragment>
                                <Html
                                    // position={[3, 9, this.zHTML]} //have z vary on media state. fov=145 -> z=2 original z = 0
                                    style={{ position: 'fixed', zIndex: 100000 }}
                                    center
                                    //zIndexRange={[100000]}
                                    //occlude
                                >
                                    {this.state.MathActive ?
                                        <About key={this.state.aboutCards[0].id} about={this.state.aboutCards[0]} buttonClick={() => this.handleShow('math')} />
                                        : null}

                                    {this.state.DevActive ?
                                        <About key={this.state.aboutCards[1].id} about={this.state.aboutCards[1]} buttonClick={() => this.handleShow('dev')} />
                                        : null}

                                    {this.state.TutorActive ?
                                        <About key={this.state.aboutCards[2].id} about={this.state.aboutCards[2]} buttonClick={() => this.handleShow('tutor')} />
                                        : null}
                                    {this.state.OtakuActive ?
                                        <About key={this.state.aboutCards[3].id} about={this.state.aboutCards[3]} buttonClick={() => this.handleShow('otaku')} />
                                        : null}

                                    {this.state.HumanActive ?
                                        <About key={this.state.aboutCards[4].id} about={this.state.aboutCards[4]} buttonClick={() => this.handleShow('human')} />
                                        : null}

                                    {this.state.GPTActive ?
                                        <AMA buttonClick={() => this.handleShow('gpt')} />
                                        : null}
                                    {this.state.ContactActive ?
                                        <Contact buttonClick={() => this.handleShow('contact')} />
                                        : null}
                                </Html>
                            

                                <Text3D font={fontUrl} position={[-5.5, 8, -4]}
                                    rotation={[1, .5, 0]} onClick={() => this.handleShow('math')} >
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
                                    rotation={[-1, 0, 0]}
                                    onClick={() => this.handleShow('contact')}
                                >
                                    
                                    Deanta Pittman
                                    <meshNormalMaterial />
                                </Text3D>
                            </React.Fragment>
                            

                            <Rig />
                        </Suspense>
                    </Canvas>
                </div>
            );
        }
    }
}

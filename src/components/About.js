import React, { Component } from 'react';
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter
} from 'reactstrap';


function About(props) {


    const about = props.about;

    const buttonClick = props.buttonClick;


    return (

        
            <Card outline style={{ width: '20rem' }}>
                <CardHeader tag="h2">{about.title}</CardHeader>
                <CardImg top width="50%" className="about-image" src={require('../images/about/' + about.image)} alt="Card image cap" />
                <CardBody> 
                    <CardText>{about.description}</CardText>
                    <Button color="primary" size="sm" onClick={buttonClick}>Close Card</Button>
                </CardBody>
                
            </Card>
       
        
        
    );
}

export default About;
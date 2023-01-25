import React, { Component } from 'react';
import {
    Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardHeader, CardFooter
} from 'reactstrap';


function Project(props) {

    function getProjectLink(project) {
        if (project.hasWebLink) {
            return <a className="project-links" href={project.webUrl} target="_blank">
                <i className="fas fa-external-link-alt fa-lg"></i>
            </a>
        }
        if (project.hasDownloadLink) {
            return <a className="project-links" target="_blank">
                <i className=" fas fa-download fa-lg"></i>
            </a>
        }
    }

    function getGithubLink(project) {
        if (project.hasGithubLink) {
            return <a className="project-links" href={"https://github.com/" + project.githubUrl} title="view source code" alt="view source code" target="_blank">
                <i className="fab fa-github fa-lg"></i>
            </a>
        }
    }

    const project = props.project;
    return (
        <Col md={4}>
            <Card>
                <CardHeader tag="h2">{project.title}</CardHeader>
                <CardImg top width="50%" className="project-image" src={require('../images/projects/' + project.image)} alt="Card image cap" />
                <CardBody> 
                    <CardText>{project.description}</CardText>
                    {getGithubLink(project)}
                    {getProjectLink(project)}
                </CardBody>
                <CardFooter tag="h5">{project.stack}</CardFooter>
            </Card>
        </Col>
    );
}

export default Project;
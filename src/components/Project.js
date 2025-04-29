import React from 'react';
import {
  Card, CardImg, CardBody, CardText,
  CardHeader, CardFooter
} from 'reactstrap';
import './Project.css'; 

function Project({ project }) {
  const getProjectLink = () => {
    if (project.hasWebLink) {
      return (
        <a className="project-links" href={project.webUrl} target="_blank" rel="noreferrer">
          <i className="fas fa-external-link-alt fa-lg" />
        </a>
      );
    }
    if (project.hasDownloadLink) {
      return (
        <a className="project-links" download>
          <i className="fas fa-download fa-lg" />
        </a>
      );
    }
  };

  const getGithubLink = () => {
    if (project.hasGithubLink) {
      return (
        <a
          className="project-links"
          href={`https://github.com/${project.githubUrl}`}
          title="view source code"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github fa-lg" />
        </a>
      );
    }
  };

  return (
    <Card className="project-card">
      <CardHeader tag="h2">{project.title}</CardHeader>
      <CardImg
        top
        className="project-image"
        src={require(`../images/projects/${project.image}`)}
        alt={project.title}
      />
      <CardBody>
        <CardText>{project.description}</CardText>
        <div className="link-row">
          {getGithubLink()}
          {getProjectLink()}
        </div>
      </CardBody>
      <CardFooter tag="h5">{project.stack}</CardFooter>
    </Card>
  );
}

export default Project;

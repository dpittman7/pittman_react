import React from 'react';
import { Row, Col, Card, CardImg, CardText, CardBody, CardHeader, Button } from 'reactstrap';

/**
 * About card component. Renders header only if title is provided.
 */
function About(props) {
  const { title, image, description } = props.about;
  const { buttonClick } = props;

  return (
    <section className="about-container" style={{ width: '100%' }}>
      <Card outline className="about-card">
        {/* Render header only when title exists */}
        {title ? (
          <CardHeader tag="h2" className="about-card__header">
            {title}
          </CardHeader>
        ) : null}

        <CardBody className="about-card__body">
          <Row className="d-flex align-items-start" noGutters>
            {image && (
              <Col xs="4" className="pr-3">
                <CardImg
                  top
                  className="about-card__image"
                  src={require(`../images/about/${image}`)}
                  alt={title ? `${title} illustration` : 'About image'}
                />
              </Col>
            )}

            <Col xs={image ? '8' : '12'}>
              {description && (
                <CardText className="about-card__text">
                  {description}
                </CardText>
              )}
              <Button color="primary" size="sm" onClick={buttonClick}>
                Close
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </section>
  );
}

export default About;

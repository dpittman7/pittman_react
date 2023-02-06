import React, { useState } from 'react';
import { Card, CardHeader, CardFooter, ListGroup, ListGroupItem, Button } from 'reactstrap';

function Contact(props) {
    const buttonClick = props.buttonClick;
    return (
        <Card style={{width: '18rem'}}>
            <CardHeader>
                Get In Touch!
            </CardHeader>
            <ListGroup>
                <ListGroupItem
                    tag="a"
                    href="https://www.linkedin.com/in/deanta-pittman-8b2b0a146/"
                    action
                >
                    LinkedIn
                </ListGroupItem>
                <ListGroupItem
                >
                    Email: deantapittman@gmail.com
                </ListGroupItem>
                <ListGroupItem>
                    Discord: unterrorize#6321
                </ListGroupItem>
            </ListGroup>
            <CardFooter>
                Actively seeking fulltime employment.
            </CardFooter>
            <Button color="primary" size="sm" onClick={buttonClick}>Close Card</Button>
        </Card>
    );
};

export default Contact;
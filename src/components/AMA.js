import React, { useState } from 'react';
import { Card, CardBody, CardText, Form, FormGroup, FormText, Label, Input, Button, Spinner } from 'reactstrap';

function AMA(props) {
    const [formData, setFormData] = useState({ prompt: ''});
    const [apiData, setApiData] = useState();
    //const [loading, setLoading] = useState(false); Need to refactor as a component to re-render on state change.
    const buttonClick = props.buttonClick;
    var baseURL = '/api/openAI';

    const handleSubmit = e => {
        //setLoading(true);
        e.preventDefault();
        fetch(baseURL, {
            method: 'POST',
            body: formData.prompt
        })
            .then(res => res.text())
            .then(result => setApiData(result))
            .catch(error => console.log(error));
        //setLoading(false);
    };

    return (
        <Card style={{ width: '250px' }}>
            <CardBody>
                <Form onSubmit={handleSubmit} >
                    <FormGroup>
                        <Label for="prompt">Ask InstructGPT Anything!</Label>
                        <Input
                            type="text"
                            name="prompt"
                            id="prompt"
                            value={formData.prompt || ''}
                            placeholder="Casually explain Quantum Physics."
                            onChange={e => setFormData({ ...formData, prompt: e.target.value })}
                        />
                        <FormText>wait a couple seconds on submit.</FormText>
                    </FormGroup>
                
                    <Button type="submit">Submit </Button>
                </Form>
                <CardText>{apiData}</CardText>
            </CardBody>
            
            
            <Button color="primary" size="sm" onClick={buttonClick}>Close Card</Button>
        </Card>
    );
};

export default AMA;
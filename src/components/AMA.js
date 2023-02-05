import React, { useState } from 'react';
import { Card, CardText, Form, FormGroup, FormText, Label, Input, Button, Spinner } from 'reactstrap';

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
        <Card style={{ width:'250px'}}>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="prompt">Ask ChatGPT Anything!</Label>
                    <Input
                        type="text"
                        name="prompt"
                        id="prompt"
                        value={formData.prompt || ''}
                        onChange={e => setFormData({ ...formData, prompt: e.target.value })}
                    />
                </FormGroup>
            
                <Button type="submit">Submit </Button>

            </Form>
            <CardText>i.e: Introduce The Great Depression to a middle schooler. <br /> <br /> {apiData}</CardText>
            <Button color="primary" size="sm" onClick={buttonClick}>Close Card</Button>
        </Card>
    );
};

export default AMA;
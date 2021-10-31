import '../../App.css';
import React from 'react';


function AddCoin() {
    return (
        <>
            <Form>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Coin Image</Form.Label>
                    <Form.Control type="file" multiple />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>description</Form.Label>
                    <Form.Control type="text" placeholder="description" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}


export default Home;
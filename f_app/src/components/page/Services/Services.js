import { get } from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCoin } from '../../../api/Coin';
import axios from 'axios';
import '../../../App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import './Services.css';






/*export default function Services () {
    return <h1 className='services'>SERVICES</h1>;
}*/

const Services = () => {
    const [doc, setDoc] = useState({});
    useEffect(async () => {
        console.log(doc);
        const temp = await getCoin();
        setDoc(temp);
    }, [])
    let Service = <div></div>;
    if (doc.length > 0) {
        Service = 
            <Row xs={1} md={2} className="new g-4">
                {Array.from({ length: doc.length }).map((_, idx) => (
                <Col>
                    {doc.map((coin) => (
                        <>
                            <Card className="cards--wrapper">
                                <Card.Img variant="top" src={coin.image} />
                                <Card.Body>
                                    <Card.Title>{coin.title}</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </>
                    ))}
                </Col>
                ))}
            </Row>
    }
    return (
        <div>
            {Service}
        </div>
    )
}
export default Services;

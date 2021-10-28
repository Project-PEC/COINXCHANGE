import React, { useEffect, useState } from 'react';
import { getCoin } from '../../../api/Coin';
import '../../../App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import './Services.css';




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
        <div className='new coin--container'>
            <Row xs={1} md={2} lg={3} >
                {doc.map((coin) => (
                <Col className='coin--item'>
                    <Card>
                        <div className="coin--wrapper">
                            <Card.Img className="coin--img" variant="top" src={coin.image} />
                        </div>
                        <Card.Body>
                            <Card.Title>{coin.title}</Card.Title>
                            <Card.Text>
                                {coin.description}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{coin.publisher}</small>
                        </Card.Footer>
                    </Card>
                </Col> 
                ))}
            </Row>
        </div>  
    }
    return (
        <div>
            {Service}
        </div>
    )
}
export default Services;

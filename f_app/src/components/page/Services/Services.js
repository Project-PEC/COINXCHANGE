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
        const temp = await getCoin();
        setDoc(temp);
    }, [])
    let Service = <div></div>;
    if (doc.length > 0) {
        Service = 
        <div>
            <div className="search--btn">
                <input id='search-btn' type='checkbox'/>
                <label for='search-btn'>Show search bar</label>
                <input id='search-bar' type='text' placeholder='Search...'/>
            </div>
        
        <div className='new coin--container'>
            <Row xs={1} md={2} lg={3} >
                {doc.map((coin) => (
                <Col className='coin--item'>
                    <Card>
                        <div className="coin--wrapper">
                            <Card.Img className="coin--img" variant="top" src={coin.image} />
                        </div>
                        <Card.Body>
                            <Card.Title className="new--text">{coin.title}</Card.Title>
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
        </div>
    }
    return (
        <div>
            {Service}
        </div>
    )
}

    

export default Services;

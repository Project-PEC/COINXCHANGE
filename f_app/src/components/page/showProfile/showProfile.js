import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './showProfile.css';
import Row from 'react-bootstrap/esm/Row';
import CardItem from '../../Cards/CardItem';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ShowProfile = (props) => {
    const [doc, setDoc] = useState({});
    useEffect(async () => {
        const temp = await getProfile(props.match.params.id);
        if (!temp) props.history.push('/');
        setDoc(temp);
    }, [])
    const email = doc.email;
    const name = doc.username;
    const coins =
        <div className='cards'>
            <h1 id="title">Check out these RARE coins by {name}!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <Row lg={3} md={2} sm={1}>
                        {doc.Coins && doc.Coins.map((ele, id) => (
                           
                                <CardItem
                                    key={id}
                                    src={ele.image[0]}
                                    text={ele.title}
                                    label={ele.publisher}
                                    path={"/getCoin/" + ele.publisher + "/" + ele._id}
                                    param= {ele}
                                />
                      
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    const image = doc.image;
    return (
        <>
            <div className="pf-container">
                <div className='pf-wrapper shadow'>
                    <Card style={{ width: '20rem' }}>
                        <div className="pic--wrap">
                            <Card.Img variant="top" id="profileImage" src={image} />
                        </div>
                        <Card.Body>
                            <Card.Title>Name: {name}</Card.Title>
                            <Card.Title>Email: {email}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Can add bio about coins</ListGroup.Item>
                            <ListGroup.Item>Private/public profile</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            {/* <Card.Link href="#">Card Link</Card.Link> */}
                            <Button style={{ zIndex: "20", position: "relative" }} href="#title">View Collection</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            {coins}

        </>
    )
}
export default ShowProfile;
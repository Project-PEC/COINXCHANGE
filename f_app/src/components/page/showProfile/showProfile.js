import React, { useEffect, useState } from 'react';
import {  getProfile } from '../../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './showProfile.css';

const ShowProfile = (props) => {
    const [doc, setDoc] = useState({});
    useEffect(async () => {
        const temp = await getProfile(props.match.params.id);
        if(!temp) props.history.push('/'); 
        setDoc(temp);
    }, [])
    const email = doc.email;
    const name = doc.username;
    const coins = doc.Coins;
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
                            <Card.Title>Collection: {coins}</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>

        </>
    )
}
export default ShowProfile;
import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import './showProfile.css';
import Row from 'react-bootstrap/esm/Row';
import CardItem from '../../Cards/CardItem';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getConversations, newConvo, updateConvo } from '../../../api/Messenger';
import { getUserInfo } from '../../../api/Auth';

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
                                param={ele}
                            />

                        ))}
                    </Row>
                </div>
            </div>
        </div>
    const image = doc.image;

    const toChatHandler = async () => {
        // const x = await updateConvo({ user: friend, toChange: user, changed: true })
        const user = await getUserInfo();
        
        if(!user.auth)
        {
            alert("Login to do that");
            props.history.push('/sign-up')
            return;
        }
        if(user.username===doc.username)
        {
            alert("You cannot chat with yourself!! Find some friends dude :)");
            return;
        }
        const userProfile = await getProfile(user.username);
        const friend = doc.username;
        const conversations = await getConversations(user.username);
        const res = conversations.find(convo => convo.members[0] === friend || convo.members[1] === friend);
        const data = {
            "senderId": user.username,
            "receiverId": doc.username,
            "senderImage": userProfile.image,
            "receiverImage": doc.image
        }
        if (!res) {
            let result = await newConvo(data);
            const imageObj = {

            }
            imageObj[user.username] = userProfile.image;
            imageObj[doc.username] = doc.image;
            result = {
                ...result,
                images: imageObj
            }
            props.history.push('/messenger', { state: result });
        }
        else {
            const x = await updateConvo({ user: friend, toChange: user.username, changed: true })
            let req = x;
            const imageObj = {

            }
            imageObj[user.username] = userProfile.image;
            imageObj[doc.username] = doc.image;
            req = {
                ...req,
                images: imageObj
            }
            console.log(req)
            props.history.push('/messenger', { state: req });
        }

    }
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
            <button onClick={toChatHandler}>Chat with {doc.username}</button>
            {coins}

        </>
    )
}
export default ShowProfile;
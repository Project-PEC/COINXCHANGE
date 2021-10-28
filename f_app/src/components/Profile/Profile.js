import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/Auth';
import { editProfile, getProfile } from '../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [doc, setDoc] = useState({});
    useEffect(async () => {
        const t = await getUserInfo();
        const temp = await getProfile(t.username);
        setUsername(t);
        setDoc(temp);
    }, [])
    const fileUploadHandler = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mhabs7f9");

        axios.post("https://api.cloudinary.com/v1_1/dx0rf8u0t/image/upload", formData).then(async (res) => {

            const t = await editProfile(username,
                {
                    data: {
                        ...doc,
                        image: res.data.secure_url
                    },
                    image: doc.image
                });
            console.log(t);
            setDoc({
                ...doc,
                image: res.data.secure_url
            })
        })
    }
    const fileSelectedHandler = (e) => {
        const file = e.target.files[0];
        fileUploadHandler(file);

    }
    const email = doc.email;
    const name = doc.username;
    const coins = doc.Coins;
    const image = doc.image;
    return (
        <>
            <div className="pf-container">
                <div className='pf-wrapper'>
<<<<<<< HEAD
                    <div className="pic--wrap">
                        <img id="profileImage" src={image} alt="Profile Picture"/>
                        <p class="img__description">
                            <label for="profile image">Select image </label>
                            <input id="profile image" type="file" onChange={fileSelectedHandler} />
                        </p>
                    </div>
                    <div className="items">
                        <strong>Name: {name}</strong>
                        <strong>Email: {email}</strong>
                    </div>
                    <div className="items">
                        <p>Can add bio about coins</p>
                        <p>Private/public profile</p>
                        <strong>Collection:{coins}</strong>
                    </div>
                    <div>
                    </div>
=======
                    <Card style={{ width: '20rem' }}>
                        <div className="pic--wrap">
                            <Card.Img variant="top" id="profileImage" src={image} />
                            <Card.ImgOverlay>
                                <Card.Text>
                                    <p className="img__description">
                                        <label for="profile image">Update image:  </label>
                                        <input id="profile image" type="file" onChange={fileSelectedHandler} />
                                    </p>
                                </Card.Text>
                            </Card.ImgOverlay>
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
                            <Card.Title>Collection: </Card.Title>
                        </Card.Body>
                    </Card>
>>>>>>> 76c312469f330cbd72e9f4ed464b6a587920b0e4
                </div>
            </div>

        </>
    )
}
export default Profile;
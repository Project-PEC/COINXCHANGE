import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/Auth';
import { editProfile, editProfileImage, getProfile } from '../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import './Profile.css';
import CardItem from '../Cards/CardItem';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/esm/Row';
import Loader from 'react-loader-spinner';
import { getReviewByUsername } from '../../api/Review';
import { RatingView } from 'react-simple-star-rating';


const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [doc, setDoc] = useState({});
    const [rating, setRating] = useState(5);
    useEffect(async () => {
        const t = await getUserInfo();
        const temp = await getProfile(t.username);
        const temp2 = await getReviewByUsername(t.username);
        let stars = 0;
        for (let i in temp2) {
            stars += temp2[i].rating;
        }
        stars /= temp2.length;
        if (temp2.length !== 0) {
            setRating(stars);
        }
        setUsername(t.username);
        setDoc(temp);
        setLoading(false);
    }, [])
    const fileUploadHandler = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mhabs7f9");

        axios.post("https://api.cloudinary.com/v1_1/dx0rf8u0t/image/upload", formData).then(async (res) => {

            const t = await editProfileImage(username,
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
    const image = doc.image;
    const coins = loading === true ?
        <div className="wrappp"></div>
        :
        <div className='cards'>
            <h1 id="title">Your Collection!</h1>
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
    const pff = loading === true ?
        <div className="wrappp"><Loader
            type="Oval"
            color="rgb(4,21,59)"
            height={150}
            width={150}
        /></div>
        :
        <div className="pf-container">
            <div className='pf-wrapper shadow'>
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
                    <div style={{margin:"auto"}}>
                    <RatingView ratingValue={rating} size={30} />
                    </div>
                    <Card.Body>
                        <Card.Title>Name: {name}</Card.Title>
                        <Card.Title>Email: {email}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Can add bio about coins</ListGroup.Item>
                        <ListGroup.Item><img src="https://cdn-icons.flaticon.com/png/512/1946/premium/1946770.png?token=exp=1636600691~hmac=49d4bde417142801a65a1585d8a03f64" style={{ width: "25px", height: "25px" }} alt="Your location  premium icon" title="Your location premium icon" />:
                            <span style={{ marginLeft: "10px" }}>Chandigarh</span>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button style={{ zIndex: "20", position: "relative" }} href="#title">View Collection</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>


    return (
        <>
            {pff}
            {coins}

        </>
    )
}
export default Profile;
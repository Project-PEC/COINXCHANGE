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
import Model from '../Model/Model';
import { getCoinOfUser, getUserCoin } from '../../api/Coin';
import { MdLocationOn } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");
    const [doc, setDoc] = useState({});
    const [rating, setRating] = useState(0);
    const [location, setLocation] = useState("");
    const [text, setText] = useState("");
    const [Coins,setCoins]=useState([]);

    useEffect(async () => {
        const t = await getUserInfo();
        const temp = await getProfile(t.username);
        const temp3=await getCoinOfUser(t.username);
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
        setDoc({...temp,Coins:temp3});
        setCoins(temp3);
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
    const saveChangesHandler = async () => {
        setText("Saving Changes..")
        const x = await editProfile(username, { ...doc, location: location });
        setText("");
        setDoc({...doc,location:location});
        setLocation("");
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
                        {Coins.map((ele, id) => (
                            <CardItem
                                key={id}
                                src={ele.image[0]}
                                text={ele.title}
                                label={ele.publisher}
                                location={doc.location}
                                path={"/getCoin/" + ele.publisher + "/" + ele._id}
                                param={{...ele,location:doc.location}}
                                param2={name}
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
                    <div style={{ margin: "auto" }}>
                        <RatingView ratingValue={rating} size={30} />
                    </div>
                    <Card.Body>
                        <Card.Title>Name: {name}</Card.Title>
                        <Card.Title>Email: {email}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Can add bio about coins</ListGroup.Item>
                        <ListGroup.Item>
                            <MdLocationOn/>
                            <input style={{ marginLeft: "10px", borderWidth: "0 0 2px" }} placeholder={doc.location} onChange={(e) => setLocation(e.target.value)} />
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Button style={{ zIndex: "20", position: "relative" }} href="#title">View Collection</Button>
                        {location.length > 0 ? <Button onClick={saveChangesHandler} style={{ zIndex: "20", position: "relative", marginTop:"10px" }}>Save Changes <MdOutlineSaveAlt/></Button> : <div />}
                    </Card.Body>
                </Card>
            </div>
        </div>


    return (
        <>
            <Model text={text} />
            {pff}
            {coins}

        </>
    )
}
export default Profile;


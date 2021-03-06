import React, { useEffect, useState } from 'react';
import { getProfile } from '../../../api/Profile';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './showProfile.css';
import Row from 'react-bootstrap/esm/Row';
import CardItem from '../../Cards/CardItem';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { getConversations, newConvo, updateConvo } from '../../../api/Messenger';
import { getUserInfo } from '../../../api/Auth';
import Loader from 'react-loader-spinner';
import Model from '../../Model/Model';
import { getReviewByUsername } from '../../../api/Review';
import { RatingView } from 'react-simple-star-rating';
import { getCoinOfUser } from '../../../api/Coin'
import { MdLocationOn } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();




const ShowProfile = (props) => {
    const [loading, setLoading] = useState(true);
    const [doc, setDoc] = useState({});
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5.0);
    const [Coins, setCoins] = useState([]);
    useEffect(async () => {
        const temp = await getProfile(props.match.params.id);
        if (!temp) props.history.push('/');
        const temp2 = await getReviewByUsername(props.match.params.id);
        const temp3 = await getCoinOfUser(props.match.params.id);
        let stars = 0;
        for (let i in temp2) {
            stars += temp2[i].rating;
        }
        stars /= temp2.length;
        if (temp2.length !== 0) {
            setRating(stars);
        }
        setDoc(temp);
        setCoins(temp3);
        setLoading(false);
    }, [])
    const email = doc.email;
    const name = doc.username;
    const coins = loading === true ?
        <div className="wrappp"></div>
        :
        <div className='cards'>
            <h1 id="title">Check out these RARE coins by {name}!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <Row lg={3} md={2} sm={1}>
                        {Coins.map((ele, id) => (

                            <CardItem
                                key={id}
                                src={ele.image[0]}
                                text={ele.title}
                                label={ele.publisher}
                                path={"/getCoin/" + ele.publisher + "/" + ele._id}
                                param={{ ...ele, location: doc.location }}
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
        if (!user.auth) {
            toast("Login to do that");
            props.history.push('/sign-up')
            return;
        }
        if (user.username === doc.username) {
            toast("You cannot chat with yourself!!");
            props.history.push('/')
            return;
        }
        setText("Redirecting to Messenger!!")
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
    const shpf = loading === true ?
        <div className="wrappp"><Loader
            type="Oval"
            color="rgb(4,21,59)"
            height={150}
            width={150}
        /></div>
        :
        <div>
            <div className="pf-container">
                <div className='pf-wrapper shadow'>
                    <Card style={{ width: '20rem' }}>
                        <div className="pic--wrap">
                            <Card.Img variant="top" id="profileImage" src={image} />
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
                                <MdLocationOn />
                                <span style={{ marginLeft: "10px" }}>Chandigarh</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            {/* <Card.Link href="#">Card Link</Card.Link> */}
                            <Button style={{ zIndex: "20", position: "relative", marginBottom: "10px" }} href="#title">View Collection</Button>
                            <Button onClick={toChatHandler}>Chat with {doc.username}</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    return (
        <>
            <Model text={text} />
            {shpf}
            {coins}
        </>
    )
}
export default ShowProfile;
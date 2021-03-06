import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Carousel from 'react-bootstrap/Carousel'
import './ShowCoin.css'
import { deleteCoin, getUserCoin } from '../../api/Coin';
import { Link } from 'react-router-dom';
import Review from '../Review/Review';
import ShowReview from '../ShowReview/ShowReview';
import { getReview } from '../../api/Review';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RatingView } from 'react-simple-star-rating';
import { MdLocationOn } from "react-icons/md";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  ButtonN } from "../Button/Button";
import Button from 'react-bootstrap/Button';


toast.configure();

const ShowCoin = (props) => {

    const [review, setReview] = useState([]);
    const [rating, setRating] = useState(0);
    // console.log(props);

    console.log("Chala");
    useEffect(async () => {
        if (!props.location.param1) {
            props.history.push('/');
            return;
        }
        const temp = await getReview(props.location.param1._id);
        let stars = 0.0;
        for (let i in temp) {
            stars += temp[i].rating;
        }
        stars /= temp.length;
        if (temp.length !== 0)
            setRating(stars);
        if (!temp) props.history.push('/');
        setReview(temp);
    }, [])


    useEffect(async () => {
        const temp = await getUserCoin(props.match.params.username, props.match.params.id);
        // console.log(temp);
        // if (!temp) props.history.push('/');
    }, [])

    const carous = [];
    const dp = [];
    let comp = <div></div>;
    let reviewComp = <div></div>;
    // console.log(props.location.param2);
    const coin = props.location.param1;
    // console.log(coin);

    const deleteHandler = async () => {
        const x = await deleteCoin(coin._id); 
        toast.success("Coin Deleted Successfully!");
        props.history.push('/services'); 
    }

    if (typeof coin === 'undefined') props.history.push('/');
    else {
        for (let i = 0; i < coin.image.length; i++) {
            carous.push(
                <Carousel.Item key={i}>
                    <img
                        className="d-block w-100 img2"
                        src={coin.image[i]}
                        alt="First slide"
                    />
                </Carousel.Item>);
        }


        if (coin.image.length == 1)
            dp.push(< img className="img2" src={coin.image[0]} />);
        else
            dp.push(coin.image[0] ? <Carousel fade className="size2">{carous}</Carousel> : <img className="img2" src="data:image/jpeg;base64,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" />)


        let edit = <div></div>;

        if (props.location.param2==coin.publisher)
            edit = <div>
                <Link to={{ pathname: "/" + coin._id + "/editCoin", param: coin }}>
                    <ButtonN>
                        Edit Coin
                    </ButtonN>
                </Link>
                <div style={{margin:"20px 0px"}}>
                    <ButtonN onClick={deleteHandler}>
                        Delete Coin
                    </ButtonN>
                </div>
            </div>

        comp = <div className="pf-container">
            <div className='pf-wrapper2 '>
                <Card className="coinWidth">
                    <div className="pic--wrap">
                        {dp}
                        <RatingView ratingValue={rating} size={20} />
                    </div>
                    <Card.Body>
                        <Card.Title>{coin.title}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item><strong>{coin.description}</strong></ListGroup.Item>

                    </ListGroup>
                    <Card.Body>
                        <Card.Text>Published By: <Link to={"/view/" + coin.publisher} className="link1" > {coin.publisher}</Link>
                            <span style={{ float: "right" }}>
                                < MdLocationOn />
                                <span style={{ marginLeft: "10px" }}>{coin.location ? coin.location : "undefined"}</span>
                            </span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            {edit}

        </div>

        reviewComp = < ShowReview param={coin._id} review={review} />;
    }

    return (
        <>

            <Row style={{ marginRight: "0px" }} className="wee" xs={1} sm={1} md={1} lg={3} >
                <Col className="coin--item">{comp}</Col>
                <Col className="coin--item">
                    < Review param={coin} username={props.location.param2} review={review} setReview={setReview} />
                    {reviewComp}
                </Col>
            </Row >
        </>
    )
}
export default ShowCoin;
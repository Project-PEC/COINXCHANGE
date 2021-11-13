import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';
import { addReview } from '../../api/Review';
import { Rating, RatingView } from 'react-simple-star-rating';
import './Review.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();



function AddReview(props) {


    const [rating, setRating] = useState(1);
    const [text, setText] = useState("");

    // const [rating, setRating] = useState(0)



    const onSubmitHandler = async () => {
        const data = {};
        console.log(props);
        data["coinId"] = props.match.params.id;
        data["user"] = props.username;  
        data["text"] = text;
        data["rating"] = rating;
        data["publisher"] = props.param.publisher;
        toast("Review Added Successfully!");
        const t = await addReview(props.username, props.match.params.id, data); 
        props.setReview([...props.review,t])
        // props.history.push('/getCoin/'+props.param.publisher+'/'+props.match.params.id); // Not working
    }

    const handleRating = (rate) => {
        setRating(rate);
        // Some logic
    }

    return (
        <>

            <div className="form-container">
                <h2>Leave a Review</h2>
                <Form className="form-wrapper2">
                    <div >
                        <Rating onClick={handleRating} ratingValue={rating} transition={true} size={50} required/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="body">Write a Review</label>
                        <textarea placeholder="Type here........" class="form-control" id="body" cols="30" rows="3" onChange={(e) => setText(e.target.value)} required></textarea>
                        <div class="valid-feedback">
                            looks Good!
                        </div>
                    </div>
                    <Button variant="success" size="sm" className="mar" type="submit" onClick={(e) => {
                        e.preventDefault();
                        onSubmitHandler();
                    }}>
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}


export default withRouter(AddReview);
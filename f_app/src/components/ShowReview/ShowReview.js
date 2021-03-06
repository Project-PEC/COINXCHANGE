import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';
import { getReview } from '../../api/Review';
import './ShowReview.css';
import { RatingView } from 'react-simple-star-rating';

const ShowReview = (props) => {


    let reviews = <div>No Reviews Yet!!</div>

    if (props.review.length >= 1)
        reviews =
            props.review.map(rev => (
                <div>
                    <Card className="revCard">
                        <Card.Body>
                            <Card.Title ><span style={{marginRight:"10px"}}>Rating:</span>
                                <RatingView  ratingValue={rev.rating}  size={20} required />
                            </Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><strong>Review: {rev.text}</strong></ListGroup.Item>

                        </ListGroup>
                        <Card.Body>
                            <Card.Text>Published By: <Link to={"/view/" + rev.user} className="link1" > {rev.user}</Link></Card.Text>
                        </Card.Body>
                    </Card>
                </div>

            ))


    return (
        <>

            <div className='pf-wrapper3 '>
                <h1>Reviews</h1>
                {reviews}
            </div>

        </>
    )
}
export default ShowReview;
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom';
import { getReview } from '../../api/Review';

import './ShowReview.css';

const ShowReview = (props) => {



    // console.log(props.location.param2);

    // console.log(coin);


    //     for (let i = 0; i < ; i++) {
    //         rev.push();
    //     }
    console.log(props);


    return (
        <>
            
                <div className='pf-wrapper3 '>
                    <h1>Reviews</h1>
                    {props.review.map(rev => (
                        <div>
                            <Card className="revCard">
                                <Card.Body>
                                    <Card.Title>Rating: {rev.rating} stars</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><strong>Review: {rev.text}</strong></ListGroup.Item>

                                </ListGroup>
                                <Card.Body>
                                    <Card.Text>Published By: <Link to={"/view/" + rev.user} className="link1" > {rev.user}</Link></Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    ))}
                </div>
         
        </>
    )
}
export default ShowReview;
import React from "react";
import '../../../App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import './Products.css';

const Products = () => {
    let Products=<div></div>;
    Products=
        <div className="wrapper"> 
            <div className="container">
            <Row xs={1} md={2} lg={4} >
                <Col className="item">
                        <Card style={{minWidth:"0px"}} >
                            <Card.Img className="Image" variant="top" src="#" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Satan0069"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height:"30px",width:"30px" }} alt="git-hub icon" /></a>
                                <a href="https://github.com/Satan0069" ><img style={{height:"30px",width:"30px",float: "right",borderRadius:"5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                </Col>
                <Col className="item">
                    <Card style={{minWidth:"0px"}} > 
                        <Card.Img className="Image" variant="top" src="#" />
                        <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <a href="https://github.com/Satan0069"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height:"30px",width:"30px" }} alt="git-hub icon" /></a>
                            <a href="https://github.com/Satan0069" ><img style={{height:"30px",width:"30px",float: "right",borderRadius:"5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col className="item">
                    <Card style={{minWidth:"0px"}}>
                            <Card.Img className="Image" variant="top" src="#" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Satan0069"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height:"30px",width:"30px" }} alt="git-hub icon" /></a>
                                <a href="https://github.com/Satan0069" ><img style={{height:"30px",width:"30px",float: "right",borderRadius:"5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                </Col>
                <Col className="item">
                    <Card style={{minWidth:"0px"}}>
                            <Card.Img className="Image" variant="top" src="#" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Satan0069"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height:"30px",width:"30px" }} alt="git-hub icon" /></a>
                                <a href="https://github.com/Satan0069" ><img style={{height:"30px",width:"30px",float: "right",borderRadius:"5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                </Col>
                </Row>
</div>  
        </div>
    return (
        <div>
            {Products}
        </div>
    )
}


export default Products;



/*

                {Array.from({ length: 4 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src="#" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Satan0069">
                                    <img style={{height:"30px",width:"30px",borderRadius:"15px"}} src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"/>
                                </a></Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="spook-">
    
                                    <div className="left-">
                                        <i className="fab fa-linkedin-in"></i>
                                    </div>
                                </div>
            */
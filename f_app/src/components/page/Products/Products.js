import React from "react";
import '../../../App.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import './Products.css';

const Products = () => {
    let Products = <div></div>;
    Products =
        <div className="wrapper">
            <div className="container">
                <Row xs={1} md={2} lg={4} >
                    <Col className="item">
                        <Card style={{ minWidth: "250px" }} >
                            <Card.Img className="Image" variant="top" src="images/AK.jpeg" />
                            <Card.Body>
                                <Card.Title>Arsh Kashyap</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Arsh-Kashyap"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height: "30px", width: "30px" }} alt="git-hub icon" /></a>
                                <a href="https://www.linkedin.com/in/arsh-kashyap/" ><img style={{ height: "30px", width: "30px", float: "right", borderRadius: "5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className="item">
                        <Card style={{ minWidth: "250px" }} >
                            <Card.Img className="Image" variant="top" src="images/AJ.jpeg" />
                            <Card.Body>
                                <Card.Title>Akshit Jain</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/akshit2382"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height: "30px", width: "30px" }} alt="git-hub icon" /></a>
                                <a href="https://www.linkedin.com/in/akshit-jain-0aa2721ba/" ><img style={{ height: "30px", width: "30px", float: "right", borderRadius: "5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className="item">
                        <Card style={{ minWidth: "250px" }}>
                            <Card.Img className="Image" variant="top" src="images/SA.jpg" />
                            <Card.Body>
                                <Card.Title>Shubham Arya</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/Satan0069"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height: "30px", width: "30px" }} alt="git-hub icon" /></a>
                                <a href="https://www.linkedin.com/in/shubham-arya-558954190/" ><img style={{ height: "30px", width: "30px", float: "right", borderRadius: "5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col className="item">
                        <Card style={{ minWidth: "250px" }}>
                            <Card.Img className="Image" variant="top" src="images/PS.jpg" />
                            <Card.Body>
                                <Card.Title>Prateek Singh</Card.Title>
                                <Card.Text>

                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href="https://github.com/PrateekSingh-glitched"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" style={{ height: "30px", width: "30px" }} alt="git-hub icon" /></a>
                                <a href="/" ><img style={{ height: "30px", width: "30px", float: "right", borderRadius: "5px" }} src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="linked-in icon" /></a>
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
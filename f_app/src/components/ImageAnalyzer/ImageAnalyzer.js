import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { csv } from 'd3';
import './ImageAnalyzer.css';
import { ButtonP } from '../Button/Button';
import stringSimilarity from 'string-similarity';
import { getCoin } from '../../api/Coin';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/esm/Row';
import CardItem from '../Cards/CardItem';
import Model from '../Model/Model';

export const ImageAnalyzer = () => {
    const [prediction, setPrediction] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("data:image/jpeg;base64,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");
    const [model, setModel] = useState();
    const [classes, setClasses] = useState([]);
    const [renderedPredictions, setRenderedPredictions] = useState();
    const [showCoins, setShowCoins] = useState([]);
    const [text,setText]=useState("");

    useEffect(() => {
        tf.ready().then(() =>
            loadModel());
        csv('data.csv').then(data => {
            setClasses(data);
        })
        const predictIt = async () => {
            if (file && preview) {
                // const imageElement = document.createElement("img");
                // imageElement.src = preview;

                const imageElement = document.getElementById('uploadedImage');
                imageElement.onload = async () => {
                    const img = tf.browser.fromPixels(imageElement, 3);
                    let tensor = tf.image.resizeNearestNeighbor(img, [224, 224]).toFloat();
                    tensor = tensor.reshape([224, 224, 3]);
                    // tensor.print();
                    tensor = tensor.div(255);
                    // console.log("-----Mean-----");
                    const mean = tf.tensor([0.485, 0.456, 0.406]);
                    const std = tf.tensor([0.229, 0.224, 0.225]);
                    tensor = tensor.sub(mean);
                    // tensor.print();
                    tensor = tensor.div(std)
                    tensor = tensor.expandDims(0);
                    // console.log("final");
                    // tensor.print()
                    const predictedImage = await model.predict(tensor).data();
                    setPrediction(predictedImage);
                    setText("");
                }


            }
        }
        predictIt();

    }, [file, preview])
    let predictedCoins = []
    const predict = async () => {
        const predictionCopy = [...prediction];
        predictionCopy.sort((a, b) => {
            return b - a;
        });
        const requiredPredictions = predictionCopy.slice(0, 3);
        let toIterate = []
        let toCheckArr = []
        for (const i in requiredPredictions) {
            const label = prediction.indexOf(requiredPredictions[i], 0);
            const data = classes[label];
            toCheckArr.push(data[0]);
            toIterate.push(data[0] + ", " + data[1] + ", " + data[2] + ", " + "Confidence: " + (parseFloat(prediction[label]) * 100).toFixed(2) + "%");
        }
        predictedCoins = <ol>{ toIterate.map((i, id) => (
            <li key={id}>{i}<hr></hr></li> 
            
        ))} </ol>
        setRenderedPredictions(predictedCoins);
        const toCheck = toCheckArr[0];
        let coins = await getCoin();
        coins = coins.sort((a, b) => {
            const t1 = a.title;
            const t2 = b.title;
            const x = stringSimilarity.compareTwoStrings(t1, toCheck);
            const y = stringSimilarity.compareTwoStrings(t2, toCheck);
            if (x > y) return -1;
            else if (y > x) return 1;
            return 0;
        })
        coins = coins.slice(0, 3);
        setShowCoins(coins);
    }
    const loadModel = async () => {
        try {
            const model = await tf.loadLayersModel("https://raw.githubusercontent.com/Project-PEC/CoinPredictionModel/main/model.json");
            setModel(model);
        }
        catch (err) {
            console.log("failed to load model");
            console.log(err);
        }
    }
    const fileSelectedHandler = e => {
        setText("Analyzing your image...");
        setPreview(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    let renderCoins = <div></div>;
    if (showCoins.length > 0) {
        renderCoins = <div className='cards'>
            <h1 id="title">Similar results in our database</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <Row lg={3} md={2} sm={1}>
                        {showCoins.map((ele, id) => (

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
    }
    return (
        <div>
            <Model text={text} />
            <div className="cd--container">
                <div className='cd--wrapper shadow'>
                    <Card >
                        <div className="im-container">
                            <div className="im-img-wrapper">
                                <div className="im-img">
                                    <img id="uploadedImage" alt="Insert Image" style={{maxHeight:"350px", maxWidth:"350px"}} src={(preview)} />
                                </div>
                            </div>
                        </div>
                        <div className="im-ind-container">
                            <div className="im-ind-wrapper">
                                <input type="file" onChange={fileSelectedHandler} />
                            </div>
                        </div>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                <div className="im-btn-container">
                                    <Button  onClick={predict}>
                                        PREDICT
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                     </Card>
                </div>
            </div>
            
            <div className="res-conatiner">
                <div className="res-wrapper">
                    {renderedPredictions}
                </div>
            </div>
            
            {renderCoins}
        </div>
    )
}
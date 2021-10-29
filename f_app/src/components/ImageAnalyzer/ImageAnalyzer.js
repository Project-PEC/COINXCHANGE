import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { csv } from 'd3';
import './ImageAnalyzer.css';
import { ButtonP } from '../Button/Button';


export const ImageAnalyzer = () => {
    const [prediction, setPrediction] = useState(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [model, setModel] = useState();
    const [classes, setClasses] = useState([]);
    const [renderedPredictions, setRenderedPredictions] = useState();

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
                }


            }
        }
        predictIt();

    }, [file, preview])

    let predictedCoins = []
    const predict = () => {
        console.log("will show predicted image");
        const predictionCopy = [...prediction];
        predictionCopy.sort((a, b) => {
            return b - a;
        });
        const requiredPredictions = predictionCopy.slice(0, 3);
        let toIterate = []
        for (const i in requiredPredictions) {
            const label = prediction.indexOf(requiredPredictions[i], 0);
            console.log(label, classes[label], prediction[label]);
            const data = classes[label];
            toIterate.push(data[0] + ", " + data[1] + ", " + data[2] + ", " + "Confidence: " + prediction[label] * 100 + "%");
        }
        predictedCoins = toIterate.map((i, id) => (
            <div key={id}>{i}</div>
        ))
        setRenderedPredictions(predictedCoins);
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


    const fileUploadHandler = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "mhabs7f9");

        axios.post("https://api.cloudinary.com/v1_1/dx0rf8u0t/image/upload", formData).then((res) => {
            console.log(res);
        })
    }
    const fileSelectedHandler = e => {
        setPreview(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    return (
    <div>
        <div className="im-container">
            <div className="im-img-wrapper">
                <div className="im-img">
                    <img id="uploadedImage" alt="Insert Image" height="224px" width="224px" src={(preview)} />
                </div>
            </div>
        </div>
        <div className="im-ind-container">
            <div className="im-ind-wrapper">
                    <input type="file" onChange={fileSelectedHandler} />
                
            </div>
        </div>
        <div className="im-btn-container">
            <div className="im-btn-wrapper">
                <div className="im-btns">
                    <ButtonP onClick={fileUploadHandler}>
                        UPLOAD
                    </ButtonP>
                    <ButtonP onClick={predict}>
                        PREDICT
                    </ButtonP>
                </div>
            </div>
        </div>
        <div className="res-conatiner">
            <div className="res-wrapper">
                {renderedPredictions}
            </div>
        </div>
    </div>
    )
}
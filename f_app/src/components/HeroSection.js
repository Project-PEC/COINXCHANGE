import React from "react";
import '../App.css';
import { Button,ButtonS } from './Button';
import './HeroSection.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ImageAnalyzer } from './ImageAnalyzer';


function HeroSection() {
    return (
        <div className="hero-container">
            <video src="/videos/video-2.mp4" autoPlay loop muted/>
            <h1>COIN WORLD</h1>
            <p>Looking some for your collection?</p>
            <div className="hero-btns">
                <ButtonS className="btns" buttonStyle='btn--outline' buttonSize="btn-large">
                    SEARCH COINS <i class="fas fa-camera"/>
                </ButtonS>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn-large">
                    WATCH TRAILER <i className='far fa-play-circle'/>
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
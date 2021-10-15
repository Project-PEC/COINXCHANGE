import React from "react";
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="/videos/video-2.mp4" autoPlay loop muted/>
            <h1>COIN WORLD</h1>
            <p>Looking some for your collection?</p>
            <div className="hero-btns">
                <Button className="btns" buttonStyle='btn--outline' buttonSize="btn-large">
                    SEARCH COINS <i class="fas fa-camera"/>
                </Button>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn-large">
                    WATCH TRAILER <i className='far fa-play-circle'/>
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
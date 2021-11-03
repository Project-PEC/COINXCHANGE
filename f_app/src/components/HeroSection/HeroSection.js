import React from "react";
import '../../App.css';
import { Button,ButtonS } from '../Button/Button';
import './HeroSection.css';




function HeroSection(props) {
    return (
        <div className="hero-container">
            <video src="/videos/video-2.mp4" autoPlay loop muted/>
            <h1>COIN WORLD</h1>
            <p>Looking some for your collection?</p>
            <div className="hero-btns">
                <ButtonS className="btns" buttonStyle='btn--outline' buttonSize="btn-large">
                    SEARCH COINS 
                </ButtonS>
                <Button className="btns" buttonStyle='btn--primary' buttonSize="btn-large" link={"/AddCoin/"+props.username}>
                    AddCoin 
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
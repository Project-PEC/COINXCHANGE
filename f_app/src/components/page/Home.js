import '../../App.css';
import React from 'react';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <HeroSection />
            <Link to="/predict">
                <Button variant="primary">Predict</Button>
            </Link>
            <Cards />
            <Footer />
        </>
    )
}


export default Home;
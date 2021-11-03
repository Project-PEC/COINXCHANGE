import '../../App.css';
import React from 'react';
import HeroSection from '../HeroSection/HeroSection';
import Cards from '../Cards/Cards';
import Footer from '../Footer/Footer';


function Home(props) {
    return (
        <>
            <HeroSection username={props.username}/>
            <Cards />
            <Footer />
        </>
    )
}


export default Home;
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import About from '../About/About';
import Banner from '../Banner/Banner';
import ClosedCases from '../ClosedCases/ClosedCases';
import Services from '../Services/Services';

const Home = () => {
    const closedCases = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Services></Services>
            <ClosedCases closedCases={closedCases}></ClosedCases>
        </div>
    );
};

export default Home;
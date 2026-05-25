import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Details from './Details';

function DetailsPage() {
    return (
        <>
            <Header />
            {/* <div className="min-h-screen flex justify-center items-center px-margin-mobile md:px-margin-desktop w-full"><h1>Details Page</h1></div> */}
            <Details />
            <Footer />
        </>
    )
}

export default DetailsPage;
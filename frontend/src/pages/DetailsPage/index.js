import React from 'react'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductInfoSection from './ProductInfoSection';
import FeaturesSection from './FeaturesSection';
import TechnicalSpecsSection from './TechnicalSpecsSection';

function DetailsPage() {
    return (
        <>
            <Header />
            <main className="w-full mx-auto px-margin-desktop mt-16 pt-12">
                <ProductInfoSection />
                <FeaturesSection />
                <TechnicalSpecsSection />
                {/* <PromoSection /> */}
            </main>
            <Footer />
        </>
    )
}

export default DetailsPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productCard';

const RelatedProductsSection = () => {
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products/${id}/related`);
                setRelatedProducts(response.data);
            } catch (error) {
                console.error("Error fetching related products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, [id]);

    if (loading) return null;
    if (relatedProducts.length === 0) return null; // Don't show section if no products

    return (
        <section className="py-12 mt-12 border-t border-outline-variant">
            <h2 className="text-2xl font-bold font-headline text-on-surface mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        src={product.src}
                        alt={product.alt || product.title}
                    />
                ))}
            </div>
        </section>
    );
};

export default RelatedProductsSection;

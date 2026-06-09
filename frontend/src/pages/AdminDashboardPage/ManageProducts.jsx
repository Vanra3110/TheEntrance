import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        price: '',
        category: '',
        src: '',
        stock: 0,
        features: [],
        processors: [],
        memoryOptions: [],
        specs: []
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (query = '') => {
        try {
            setLoading(true);
            const url = query 
                ? `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products?search=${encodeURIComponent(query)}`
                : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/products`;
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts(searchInput.trim());
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const adminId = JSON.parse(sessionStorage.getItem('session'))?._id;
                await axios.delete(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products/${id}`, {
                    headers: { 'x-admin-id': adminId }
                });
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    const handleAddClick = () => {
        setEditingProduct('new');
        setEditForm({
            title: '',
            price: '',
            category: '',
            src: '',
            stock: 0,
            features: [],
            processors: [],
            memoryOptions: [],
            specs: []
        });
    };

    const handleEditClick = (product) => {
        setEditingProduct(product.id);
        setEditForm({
            title: product.title || '',
            price: product.price || '',
            category: product.category || '',
            src: product.src || '',
            stock: product.stock || 0,
            features: product.features ? [...product.features] : [],
            processors: product.processors ? [...product.processors] : [],
            memoryOptions: product.memoryOptions ? [...product.memoryOptions] : [],
            specs: product.specs ? [...product.specs] : []
        });
    };

    const handleEditSave = async (e) => {
        e.preventDefault();
        try {
            const adminId = JSON.parse(sessionStorage.getItem('session'))?._id;
            const headers = { 'x-admin-id': adminId };

            if (editingProduct === 'new') {
                const response = await axios.post(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products`, editForm, { headers });
                setProducts([...products, response.data]);
            } else {
                const response = await axios.put(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/products/${editingProduct}`, editForm, { headers });
                setProducts(products.map(p => p.id === editingProduct ? { ...p, ...response.data } : p));
            }
            setEditingProduct(null);
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Failed to save product.");
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        setUploadingImage(true);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}${res.data.imageUrl}`;
            setEditForm({ ...editForm, src: imageUrl });
        } catch (err) {
            console.error("Error uploading image:", err);
            alert("Failed to upload image.");
        } finally {
            setUploadingImage(false);
        }
    };

    // Array manipulation helpers
    const handleArrayChange = (arrayName, index, field, value) => {
        const newArray = [...editForm[arrayName]];
        newArray[index] = { ...newArray[index], [field]: value };
        setEditForm({ ...editForm, [arrayName]: newArray });
    };

    const addArrayItem = (arrayName, emptyItem) => {
        setEditForm({ ...editForm, [arrayName]: [...editForm[arrayName], emptyItem] });
    };

    const removeArrayItem = (arrayName, index) => {
        const newArray = editForm[arrayName].filter((_, i) => i !== index);
        setEditForm({ ...editForm, [arrayName]: newArray });
    };

    if (loading) {
        return <div className="text-center py-12"><span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span></div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
                <h2 className="text-2xl font-bold font-headline text-primary">Manage Products</h2>
                
                <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-md items-center bg-surface border border-outline-variant rounded-full px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary shadow-sm mx-auto md:mx-4">
                    <span className="material-symbols-outlined text-on-surface-variant mr-3 text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder="Search products by name..." 
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm text-on-surface w-full font-body-sm"
                    />
                    {searchInput && (
                        <button type="button" onClick={() => { setSearchInput(''); fetchProducts(''); }} className="material-symbols-outlined text-on-surface-variant hover:text-error ml-2 rounded-full transition-colors text-[20px]">close</button>
                    )}
                </form>

                <button
                    onClick={handleAddClick}
                    className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add Product
                </button>
            </div>

            {products.map(product => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row bg-surface-container rounded-xl border border-outline-variant shadow-sm overflow-hidden"
                >
                    <div className="w-full md:w-48 h-48 md:h-auto bg-white flex-shrink-0 border-b md:border-b-0 md:border-r border-outline-variant flex items-center justify-center p-4">
                        <img src={product.src} alt={product.alt || product.title} className="max-w-full max-h-full object-contain" />
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{product.category}</span>
                                    <h3 className="text-xl font-bold text-on-surface mt-1">{product.title}</h3>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-bold text-primary">{product.price}</span>
                                    <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-error'}`}>
                                        Stock: {product.stock || 0}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-on-surface-variant line-clamp-2 mt-2">
                                {product.features && product.features.length > 0
                                    ? product.features[0].description
                                    : "No description available."}
                            </p>
                        </div>

                        <div className="flex gap-3 mt-6 self-end">
                            <button
                                onClick={() => handleEditClick(product)}
                                className="px-4 py-2 text-secondary bg-secondary/10 hover:bg-secondary/20 rounded-full font-medium transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="px-4 py-2 text-error bg-error/10 hover:bg-error/20 rounded-full font-medium transition-colors flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Remove
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Edit Modal */}
            <AnimatePresence>
                {editingProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 py-8"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-surface dark:bg-surface-dim p-8 rounded-2xl shadow-xl w-full max-w-4xl max-h-full overflow-y-auto border border-outline-variant flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6 sticky top-0 bg-surface dark:bg-surface-dim z-10 pb-4 border-b border-outline-variant">
                                <h2 className="text-2xl font-bold text-primary">
                                    {editingProduct === 'new' ? 'Add New Product' : 'Edit Product'}
                                </h2>
                                <button onClick={() => setEditingProduct(null)} className="text-on-surface-variant hover:text-on-surface">
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleEditSave} className="flex flex-col gap-8 pb-8">
                                {/* Basic Details */}
                                <section className="flex flex-col gap-4">
                                    <h3 className="text-lg font-semibold border-b border-outline-variant pb-2">Basic Details</h3>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-medium text-on-surface-variant">Product Image</label>

                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            {editForm.src && (
                                                <div className="w-16 h-16 rounded overflow-hidden border border-outline-variant flex-shrink-0 bg-white flex justify-center items-center">
                                                    <img src={editForm.src} alt="Preview" className="max-w-full max-h-full object-contain" />
                                                </div>
                                            )}
                                            <div className="flex-grow flex flex-col gap-2 w-full">
                                                <div className="flex items-center gap-2">
                                                    <label className={`cursor-pointer bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-medium hover:bg-secondary/20 transition-colors flex items-center gap-2 ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                                                        <span className="material-symbols-outlined text-[18px]">upload</span>
                                                        {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleImageUpload}
                                                            disabled={uploadingImage}
                                                        />
                                                    </label>
                                                    <span className="text-xs text-on-surface-variant font-medium">OR</span>
                                                    <input
                                                        type="text"
                                                        value={editForm.src}
                                                        onChange={(e) => setEditForm({ ...editForm, src: e.target.value })}
                                                        placeholder="Enter Image URL directly"
                                                        className="flex-grow p-2 bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-on-surface-variant">Price</label>
                                            <input
                                                type="text"
                                                value={editForm.price}
                                                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                                className="p-3 bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-on-surface-variant">Category</label>
                                            <input
                                                type="text"
                                                value={editForm.category}
                                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                className="p-3 bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-sm font-medium text-on-surface-variant">Stock Quantity</label>
                                            <input
                                                type="number"
                                                value={editForm.stock}
                                                onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                                                className="p-3 bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="flex flex-col gap-1">
                                        <label className="text-sm font-medium text-on-surface-variant">Image URL</label>
                                        <input
                                            type="text"
                                            value={editForm.src}
                                            onChange={(e) => setEditForm({ ...editForm, src: e.target.value })}
                                            className="p-3 bg-surface-container rounded-lg border border-outline focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            required
                                        />
                                    </div> */}
                                </section>

                                {/* Features */}
                                <section className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                                        <h3 className="text-lg font-semibold">Features</h3>
                                        <button type="button" onClick={() => addArrayItem('features', { title: '', description: '' })} className="text-sm text-primary font-medium hover:underline">
                                            + Add Feature
                                        </button>
                                    </div>
                                    {editForm.features.map((feature, index) => (
                                        <div key={index} className="flex gap-4 items-start bg-surface-container p-4 rounded-lg">
                                            <div className="flex flex-col gap-3 flex-grow">
                                                <input
                                                    type="text" placeholder="Title" value={feature.title}
                                                    onChange={(e) => handleArrayChange('features', index, 'title', e.target.value)}
                                                    className="p-2 bg-surface rounded border border-outline outline-none" required
                                                />
                                                <textarea
                                                    placeholder="Description" value={feature.description}
                                                    onChange={(e) => handleArrayChange('features', index, 'description', e.target.value)}
                                                    className="p-2 bg-surface rounded border border-outline outline-none" required
                                                />
                                            </div>
                                            <button type="button" onClick={() => removeArrayItem('features', index)} className="text-error hover:bg-error/10 p-2 rounded">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </section>

                                {/* Processors */}
                                <section className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                                        <h3 className="text-lg font-semibold">Processors</h3>
                                        <button type="button" onClick={() => addArrayItem('processors', { name: '', price: '', selected: false })} className="text-sm text-primary font-medium hover:underline">
                                            + Add Processor
                                        </button>
                                    </div>
                                    {editForm.processors.map((proc, index) => (
                                        <div key={index} className="flex gap-4 items-center bg-surface-container p-4 rounded-lg">
                                            <input
                                                type="text" placeholder="Name" value={proc.name}
                                                onChange={(e) => handleArrayChange('processors', index, 'name', e.target.value)}
                                                className="p-2 bg-surface rounded border border-outline outline-none flex-grow" required
                                            />
                                            <input
                                                type="text" placeholder="Price (e.g. +$200)" value={proc.price}
                                                onChange={(e) => handleArrayChange('processors', index, 'price', e.target.value)}
                                                className="p-2 bg-surface rounded border border-outline outline-none w-32" required
                                            />
                                            <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                                                <input
                                                    type="checkbox" checked={proc.selected}
                                                    onChange={(e) => handleArrayChange('processors', index, 'selected', e.target.checked)}
                                                    className="w-4 h-4 text-primary"
                                                /> Default
                                            </label>
                                            <button type="button" onClick={() => removeArrayItem('processors', index)} className="text-error hover:bg-error/10 p-2 rounded">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </section>

                                {/* Memory Options */}
                                <section className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                                        <h3 className="text-lg font-semibold">Memory Options</h3>
                                        <button type="button" onClick={() => addArrayItem('memoryOptions', { size: '', selected: false })} className="text-sm text-primary font-medium hover:underline">
                                            + Add Memory Option
                                        </button>
                                    </div>
                                    {editForm.memoryOptions.map((mem, index) => (
                                        <div key={index} className="flex gap-4 items-center bg-surface-container p-4 rounded-lg">
                                            <input
                                                type="text" placeholder="Size (e.g. 16GB)" value={mem.size}
                                                onChange={(e) => handleArrayChange('memoryOptions', index, 'size', e.target.value)}
                                                className="p-2 bg-surface rounded border border-outline outline-none flex-grow" required
                                            />
                                            <label className="flex items-center gap-2 text-sm text-on-surface cursor-pointer">
                                                <input
                                                    type="checkbox" checked={mem.selected}
                                                    onChange={(e) => handleArrayChange('memoryOptions', index, 'selected', e.target.checked)}
                                                    className="w-4 h-4 text-primary"
                                                /> Default
                                            </label>
                                            <button type="button" onClick={() => removeArrayItem('memoryOptions', index)} className="text-error hover:bg-error/10 p-2 rounded">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </section>

                                {/* Specs */}
                                <section className="flex flex-col gap-4">
                                    <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                                        <h3 className="text-lg font-semibold">Specifications</h3>
                                        <button type="button" onClick={() => addArrayItem('specs', { label: '', value: '' })} className="text-sm text-primary font-medium hover:underline">
                                            + Add Specification
                                        </button>
                                    </div>
                                    {editForm.specs.map((spec, index) => (
                                        <div key={index} className="flex gap-4 items-center bg-surface-container p-4 rounded-lg">
                                            <input
                                                type="text" placeholder="Label (e.g. Display)" value={spec.label}
                                                onChange={(e) => handleArrayChange('specs', index, 'label', e.target.value)}
                                                className="p-2 bg-surface rounded border border-outline outline-none w-1/3" required
                                            />
                                            <input
                                                type="text" placeholder="Value (e.g. 16-inch Liquid Retina)" value={spec.value}
                                                onChange={(e) => handleArrayChange('specs', index, 'value', e.target.value)}
                                                className="p-2 bg-surface rounded border border-outline outline-none flex-grow" required
                                            />
                                            <button type="button" onClick={() => removeArrayItem('specs', index)} className="text-error hover:bg-error/10 p-2 rounded">
                                                <span className="material-symbols-outlined">delete</span>
                                            </button>
                                        </div>
                                    ))}
                                </section>

                                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-outline-variant sticky bottom-0 bg-surface dark:bg-surface-dim z-10">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="px-6 py-2 rounded-full font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-full font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProducts;

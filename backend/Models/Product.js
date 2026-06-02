const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const processorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    selected: { type: Boolean, default: false }
});

const memoryOptionSchema = new mongoose.Schema({
    size: { type: String, required: true },
    selected: { type: Boolean, default: false }
});

const specSchema = new mongoose.Schema({
    label: { type: String, required: true },
    value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    src: { type: String, required: true },
    alt: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    features: [featureSchema],
    processors: [processorSchema],
    memoryOptions: [memoryOptionSchema],
    specs: [specSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

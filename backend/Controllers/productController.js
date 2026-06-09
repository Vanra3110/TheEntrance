const Product = require('../Models/Product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Seed dummy data
exports.seedProducts = async (req, res) => {
    try {
        // We will receive the dummy products in the request body
        const productsData = req.body;
        
        // Delete existing products to avoid duplicates
        await Product.deleteMany({});
        
        // Insert new products
        const createdProducts = await Product.insertMany(productsData);
        res.status(201).json({ message: "Products seeded successfully", count: createdProducts.length });
    } catch (error) {
        console.error("Error seeding products:", error);
        res.status(500).json({ message: "Server error during seeding" });
    }
};

// Get product by id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update product by id
exports.updateProduct = async (req, res) => {
    try {
        const { title, price, category, src, stock, features, processors, memoryOptions, specs } = req.body;
        const product = await Product.findOne({ id: req.params.id });
        if (product) {
            product.title = title !== undefined ? title : product.title;
            product.price = price !== undefined ? price : product.price;
            product.category = category !== undefined ? category : product.category;
            product.src = src !== undefined ? src : product.src;
            product.stock = stock !== undefined ? stock : product.stock;
            
            if (features) product.features = features;
            if (processors) product.processors = processors;
            if (memoryOptions) product.memoryOptions = memoryOptions;
            if (specs) product.specs = specs;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete product by id
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (product) {
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { title, price, category, src, alt, stock, features, processors, memoryOptions, specs } = req.body;
        
        // Generate new sequential ID
        const lastProduct = await Product.findOne().sort({ id: -1 });
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        const newProduct = new Product({
            id: newId,
            title,
            price,
            category,
            src,
            alt: alt || title,
            stock: stock || 0,
            features: features || [],
            processors: processors || [],
            memoryOptions: memoryOptions || [],
            specs: specs || []
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get related products
exports.getRelatedProducts = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const product = await Product.findOne({ id: productId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Fetch 4 random products from the same category, excluding the current product
        const relatedProducts = await Product.aggregate([
            { $match: { category: product.category, id: { $ne: productId } } },
            { $sample: { size: 4 } }
        ]);

        res.json(relatedProducts);
    } catch (error) {
        console.error("Error fetching related products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

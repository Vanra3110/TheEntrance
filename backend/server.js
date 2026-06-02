const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./Routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const path = require('path');

app.use('/api/auth', authRoutes);
app.use('/api/products', require('./Routes/productRoutes'));
app.use('/api/upload', require('./Routes/uploadRoutes'));
app.use('/api/users', require('./Routes/userRoutes'));

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
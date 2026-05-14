const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        // the frontend expects an id field (string), mongoose uses _id (ObjectId).
        // map the _id to id
        const mappedProducts = products.map(p => {
            p.id = p._id.toString();
            return p;
        });
        res.json(mappedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/products/:id
// @desc    Get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (product) {
            product.id = product._id.toString();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/products
// @desc    Create a product
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();

        const pObj = createdProduct.toObject();
        pObj.id = pObj._id.toString();
        res.status(201).json(pObj);
    } catch (error) {
        console.error("PRODUCT CREATION ERROR:", error);
        res.status(400).json({ message: error.message || 'Unknown error' });
    }
});

// @route   PUT /api/products/:id
// @desc    Update a product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            Object.assign(product, req.body);
            const updatedProduct = await product.save();

            const pObj = updatedProduct.toObject();
            pObj.id = pObj._id.toString();
            res.json(pObj);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    images: [{ type: String, required: true }],
    category: { type: String, required: true },
    size: { type: String, required: true },
    condition: { type: String, required: true, enum: ['Excellent', 'Good', 'Fair'] },
    limited: { type: Boolean, required: true, default: false },
    description: { type: String, default: '' },
    fit: { type: String, default: 'Regular' },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

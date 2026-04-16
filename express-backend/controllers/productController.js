"use strict";
const model = require('../models/productModel');

async function fetchAllProducts(req, res) {
    try {
        const products = await model.getAllProducts();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchProductById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const product = await model.getOneProductById(id);
            res.json(product);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function fetchProductsByType(req, res) {
    const type = req.params.type;
    const price = req.query.price;
    let params;
    if (type) {
        try {
            params = [type];
            if (price) {
                params.push(price);
            }
            const products = await model.getProductsByType(params);
            res.json(products);
        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function removeProduct(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteProduct(id);
            if (deletedCount > 0) {
                res.send(`Product with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Product not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createProduct(req, res) {
    const { name, type, price, description } = req.body;
    if (name && type && price && description) {
        try {
            const newProduct = await model.addProduct(name, type, price, description);
            res.status(201).json(newProduct);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}

module.exports = {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByType,
    removeProduct,
    createProduct
};
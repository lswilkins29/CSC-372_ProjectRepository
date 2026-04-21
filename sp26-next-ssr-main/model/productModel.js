"use strict";
const pool = require('./dbConnection');

async function getAllProducts() {
  const queryText = "SELECT * FROM products";
  const result = await pool.query(queryText);
  return result.rows;
}

async function getOneProductById(id) {
  const queryText = "SELECT * FROM products where id= $1";
  const values = [id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

async function getProductsByType(params) {
  let queryText = "SELECT * FROM products where type= $1";
  if (params.length > 1) {
    queryText += " AND price <= $2";
  }
  const result = await pool.query(queryText, params);
  return result.rows;
}


async function deleteProduct(id) {
  let queryText = "DELETE FROM products WHERE id = $1 ";
  const values = [id];
  const result = await pool.query(queryText, values);
  return result.rowCount;
}

async function addProduct(name, type, price, description) {
  let queryText = "INSERT INTO products ( name, type, price, description) VALUES ($1, $2, $3, $4) RETURNING *";
  let values = [name, type, price, description];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}
module.exports = {
  getAllProducts,
  getOneProductById,
  getProductsByType,
  deleteProduct,
  addProduct
};
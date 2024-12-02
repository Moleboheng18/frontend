// src/components/ProductManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductManagement.css';

const ProductManagement = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setLocalProducts(data);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const url = editingProduct
      ? `http://localhost:5000/api/products/${editingProduct.id}`
      : 'http://localhost:5000/api/products';
    const method = editingProduct ? 'PUT' : 'POST';
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Failed to add/update product');

      setEditingProduct(null);
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      const updatedProduct = { ...product, quantity: updatedQuantity };
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProduct),
        });
        if (!response.ok) throw new Error('Failed to sell product');
        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="product-management">
      <header className="header">
        <h2>Product Management</h2>
        <nav className="navigation">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/users">User Management</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          className="input-field"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="input-field"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
          className="input-field"
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h3>Product List</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="table-row">
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEditProduct(product)} className="action-button edit-button">Edit</button>
                <button onClick={() => handleSellProduct(product.id)} className="action-button sell-button">Sell</button>
                <button onClick={() => handleDeleteProduct(product.id)} className="action-button delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="footer">
  <div className="footer-content">
    {/* Footer Links Section */}
    <div className="footer-sections">
      
      {/* About Us Section */}
      <div className="footer-section">
        <h4>About Us</h4>
        <p>
          We are a leading provider of high-quality products, focusing on customer satisfaction and reliable service. 
          Our mission is to offer the best products at competitive prices.
        </p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul className="footer-links">
          <li><Link to="#" className="footer-link">Home</Link></li>
          <li><Link to="#" className="footer-link">Products</Link></li>
          <li><Link to="#" className="footer-link">Users</Link></li>
          <li><Link to="#" className="footer-link">Dashboard</Link></li>
        </ul>
      </div>

      {/* Contact Information Section */}
      <div className="footer-section">
        <h4>Contact Us</h4>
        <ul className="contact-info">
          <li>Email: <a href="mailto:info@yourcompany.com">molly's@cafe.com</a></li>
          <li>Phone: <a href="57054214">57054214</a></li>

        </ul>
      </div>

      {/* Follow Us Section */}
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="social-media-links">
          <Link to="#" className="social-link"><i className="fab fa-facebook"></i> Facebook</Link>
          <Link to="#" className="social-link"><i className="fab fa-twitter"></i> Twitter</Link>
          <Link to="#" className="social-link"><i className="fab fa-instagram"></i> Instagram</Link>
          <Link to="#" className="social-link"><i className="fab fa-linkedin"></i> LinkedIn</Link>
        </div>
      </div>

    </div>

    {/* Copyright Section */}
    <div className="footer-bottom">
      <div className="footer-copyright">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default ProductManagement;

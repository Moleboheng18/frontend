// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  // Image list for the slideshow
  const images = [
    { src: 'apple.jpeg', alt: 'Product 1', animation: 'slide-in' },
    { src: 'OIP.jpeg', alt: 'Product 2', animation: 'fade-in' },
    { src: 'strawberries.jpeg', alt: 'Strawberries', animation: 'bounce-in' },
    { src: 'grapes.jpeg', alt: 'Grapes', animation: 'rotate-in' },
    { src: 'pears.jpeg', alt: 'Pears', animation: 'zoom-in' },
    { src: 'coke.jpeg', alt: 'Coke', animation: 'slide-in' },
    { src: 'cake.jpeg', alt: 'Cake', animation: 'fade-in' }
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 3 seconds (3000 milliseconds)
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(imageInterval);
  }, [images.length]);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h2 id="dashboard-title">Dashboard</h2>
          <nav className="dashboard-nav">
            <Link to="/products" className="nav-link">Product Management</Link>
            <Link to="/users" className="nav-link">User Management</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </nav>
        </header>

        <section className="dashboard-main">
          <h3 id="products-overview-title">Products Overview</h3>

          {products.length === 0 ? (
            <p id="no-products-message">No products have been added yet.</p>
          ) : (
            <div className="dashboard-data">
              <div className="chart-container">
                <ProductBarChart products={products} />
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sequential Image Slideshow */}
          <div className="image-container">
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className={`dashboard-image ${images[currentImageIndex].animation}`}
            />
          </div>
        </section>
      </div>

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
          <li>Email: <a href="molly's@cafe.com">molly's@cafe.com</a></li>
          <li>Phone: <a href="tel:57054214">57054214</a></li>
         
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

export default Dashboard;

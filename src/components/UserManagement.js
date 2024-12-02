// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch users from the server
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Error adding user');
      }
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error adding user');
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, password: '' });
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Error updating user');
      }
      setEditingUser(null);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error updating user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
      fetchUsers();
    } catch (error) {
      setError('Error deleting user');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear any authentication tokens or session data if needed
    navigate('/login');
  };

  return (
    <div className="user-management" id="user-management-container">
      <header className="header" id="user-management-header">
        <h2 id='user-management-title'>User Management</h2>
        <nav className="navigation" id="navigation-links">
          <ul className="nav-links" id="user-nav-links">
            <li><Link to="/dashboard" className="nav-link" id="dashboard-link">Dashboard</Link></li>
            <li><Link to="/products" className="nav-link" id="product-link">Product Management</Link></li>
          </ul>
          <button onClick={handleLogout} className="logout-button" id="logout-btn">Logout</button>
        </nav>
      </header>
      
      {error && <p className="error" id="error-message">{error}</p>}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form" id="user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
          className="input-field"
          id="username-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
          className="input-field"
          id="password-input"
        />
        <button type="submit" className="submit-button" id="submit-btn">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      <table className="user-table" id="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleEditUser(user)} className="action-btn" id={`edit-btn-${user.id}`}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className="action-btn" id={`delete-btn-${user.id}`}>Delete</button>
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
          <li>Email: <a href="molly's@cafe.com">molly's@cafe.com</a></li>
          <li>Phone: <a href="tel:+57054214">57054214</a></li>
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

export default UserManagement;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile } from '../services/api';
import Cookies from 'js-cookie';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setUser(response.data.user);
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch profile';
        toast.error(message);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return <div className="dashboard-container"><p>Loading...</p></div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-section">
          <h3>Welcome, {user?.name}!</h3>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user?.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

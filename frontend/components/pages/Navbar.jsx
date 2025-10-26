import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // So it re-renders on route change
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token on mount and on location change
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true if token exists
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Logo / Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          MyWebsite
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          {isLoggedIn && (
            <Button color="inherit" onClick={() => navigate('/profile')}>
              Profile
            </Button>
          )}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

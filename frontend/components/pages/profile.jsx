import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Avatar,
  Grid,
  Divider,
  Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('https://login-r4l9.onrender.com/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error(error.response?.data || error);
        alert(error.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Alert severity="error">User not found. Please login again.</Alert>
      </Box>
    );
  }

  const getInitials = (name) =>
    name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: 400,
          boxShadow: 4,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Avatar sx={{ bgcolor: 'primary.main', width: 80, height: 80 }}>
                {user.name ? getInitials(user.name) : <PersonIcon fontSize="large" />}
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {user.name}
              </Typography>
            </Grid>
            <Divider flexItem sx={{ width: '100%', marginY: 2 }} />
            <Grid item container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Username:</strong> {user.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Email:</strong> {user.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;


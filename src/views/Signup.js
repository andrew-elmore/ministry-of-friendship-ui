import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from 'components/core/Stack';
import Sheet from 'components/core/Sheet';
import Card from 'components/core/Card';
import Input from 'components/core/Input';
import Button from 'components/core/Button';
import Link from 'components/core/Link';
import authActions from 'actions/authActions';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(({ auth }) => auth.isCreatingUser);
  const [formData, setFormData] = useState({
    email: '',
    gamerTag: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await dispatch(authActions.createUser({
        email: formData.email,
        gamerTag: formData.gamerTag,
        password: formData.password
      }));
      navigate('/');
    } catch (err) {
      const errorText = err.message || String(err);
      
      if (errorText.includes('email')) {
        setError('Email is already in use');
      } else if (errorText.includes('gamer')) {
        setError('Gamer tag is already taken');
      } else {
        setError('An error occurred. Please try again later');
      }
    }
  };

  return (
    <Sheet 
      sx={{
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 8,
          backgroundColor: 'secondary.400',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Stack spacing={8} alignItems="center" sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={4} alignItems="center">
              <Input
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({
                  ...formData,
                  email: value
                })}
                sx={{ width: '100%' }}
              />

              <Input
                placeholder="Gamer Tag"
                value={formData.gamerTag}
                onChange={(value) => setFormData({
                  ...formData,
                  gamerTag: value
                })}
                sx={{ width: '100%' }}
              />
              
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(value) => setFormData({
                  ...formData,
                  password: value
                })}
                sx={{ width: '100%' }}
              />

              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(value) => setFormData({
                  ...formData,
                  confirmPassword: value
                })}
                sx={{ width: '100%' }}
              />
              
              {error && <div style={{ color: 'red' }}>{error}</div>}
              
              <Button 
                type="submit" 
                disabled={isLoading}
                sx={{ width: '100%' }}
              >
                {isLoading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
              </Button>
              
              <Link 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }} 
                component="button" 
                variant="plain" 
                size="sm"
              >
                Already have an account? Login
              </Link>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Sheet>
  );
};

export default Signup;
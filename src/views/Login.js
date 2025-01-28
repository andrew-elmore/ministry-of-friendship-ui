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


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(({ auth }) => auth.isAuthorizing);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await dispatch(authActions.login(credentials.username, credentials.password));
    } catch (err) {
      const errorText = err.message || String(err);
      
      if (errorText.includes('Your account is locked due to multiple failed login attempts.')) {
        const minutesRemaining = errorText.match(/\d+/)[0];
        if (minutesRemaining > 1) {
          setError(`Your account is locked due to multiple failed login attempts. Please try again after ${minutesRemaining} minutes`);
        } else {
          setError(`Your account is locked due to multiple failed login attempts. Please try again after ${minutesRemaining} minute`);
        }
      } else if (errorText.includes('Invalid')) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later');
      }
    }
  }

  return (
    <Sheet 
      sx={{
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        backgroundImage: 'url(/api/placeholder/1920/1080)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.50'
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 8,
          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Stack spacing={8} alignItems="center" sx={{ width: '100%' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Stack spacing={4} alignItems="center">
              <Input
                placeholder="Username"
                value={credentials.username}
                onChange={(value) => setCredentials({
                  ...credentials,
                  username: value
                })}
                sx={{ width: '100%' }}
              />
              
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(value) => setCredentials({
                  ...credentials,
                  password: value
                })}
                sx={{ width: '100%' }}
              />
              
              {error && <div style={{ color: 'red' }}>{error}</div>}
              
              <Button 
                type="submit" 
                disabled={isLoading}
                sx={{ width: '100%' }}
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </Button>
              
              <Link 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }} 
                component="button" 
                variant="plain" 
                size="sm"
              >
                Forgot password?
              </Link>
            </Stack>
          </form>
        </Stack>
      </Card>
    </Sheet>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!recaptchaToken) {
      setMessage('Please complete the reCAPTCHA');
      setIsSuccess(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/login', { 
        email: email.trim().toLowerCase(), 
        password: password.trim(), 
        recaptchaToken 
      });

      // Store the JWT token
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // Store user data
      const userData = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        description: response.data.user.description,
        lastLogin: response.data.user.lastLogin
      };
      localStorage.setItem('user', JSON.stringify(userData));

      setMessage('Login successful! Redirecting...');
      setIsSuccess(true);
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/profile'); 
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data || 
                         'Login failed. Please try again.';
      setMessage(errorMessage);
      setIsSuccess(false);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
  
      // Send to your backend to verify and get your JWT
      const res = await fetch('http://localhost:3000/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: googleToken }),
      });
  
      if (!res.ok) throw new Error('Failed to authenticate with server.');
  
      const { token, user } = await res.json();
  
      // Store the backend-issued JWT and user info
      localStorage.setItem('token', token); // ✅ Your own backend's JWT
      localStorage.setItem('user', JSON.stringify(user)); // user._id will be here
  
      // Update AuthContext
      window.dispatchEvent(new Event('storage'));
  
      setMessage('Google login successful! Redirecting...');
      setIsSuccess(true);
      setTimeout(() => navigate('/profile'), 1500);
  
    } catch (error) {
      console.error('Google login error:', error);
      setMessage('Google login failed. Please try again.');
      setIsSuccess(false);
    }
  };
  
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          <MDBCol md='6'>
            <MDBCardImage src='/assets/Signup_pic.png' alt="login form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="sign-in-alt fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Login</span>
              </div>

              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Sign in to your account
              </h5>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass='mb-4'
                  label='Email address'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4'
                  label='Password'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                />

                <div className="text-center mt-4">
                  <MDBBtn 
                    type="submit" 
                    color="dark" 
                    size="lg" 
                    className="mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="visually-hidden">Loading...</span>
                      </>
                    ) : 'Login'}
                  </MDBBtn>

                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setMessage('Google login failed. Please try again.');
                      setIsSuccess(false);
                    }}
                    useOneTap
                  />
                </div>
              </form>

              {message && (
                <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} mt-3`}>
                  {message}
                </div>
              )}

                <Link to='/register' className="small" style={{ color: '#393f81' }}>
                  Don't have an account? Register here
                </Link>


              <div className='d-flex flex-row justify-content-start mt-3'>
                <a href="#!" className="small text-muted me-1">Terms of use.</a>
                <a href="#!" className="small text-muted">Privacy policy</a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;

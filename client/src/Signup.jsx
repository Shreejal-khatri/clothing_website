
import React, { useState } from 'react';
import axios from 'axios';
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
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import ReCAPTCHA from 'react-google-recaptcha';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const navigate = useNavigate();

  // Validation functions
  const isEmailValid = (email) => /^[a-zA-Z]+\d*@gmail\.com$/.test(email);
  const isPasswordValid = (password) => /^[A-Za-z0-9]{8}$/.test(password);
  const isPhoneValid = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setMessage('Please complete the reCAPTCHA');
      setIsSuccess(false);
      return;
    }

    if (!isEmailValid(email)) {
      setMessage('Invalid email. Format: anyname + digits @gmail.com');
      setIsSuccess(false);
      return;
    }

    if (!isPasswordValid(password)) {
      setMessage('Password must be 8 characters long (letters & digits only).');
      setIsSuccess(false);
      return;
    }

    if (!isPhoneValid(phone)) {
      setMessage('Phone number must be 10 digits.');
      setIsSuccess(false);
      return;
    }

    axios.post('http://localhost:3000/register', { 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      password: password.trim(), 
      address: address.trim(), 
      phone: phone.trim(), 
      recaptchaToken 
    })
    .then(response => {
      // Store the JWT token
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // Store user data if needed
      const userData = {
        name: response.data.user.name,
        email: response.data.user.email,
        address: response.data.user.address,
        phone: response.data.user.phone
      };
      localStorage.setItem('user', JSON.stringify(userData));

      setMessage('Registration successful! Redirecting...');
      setIsSuccess(true);
      
      // Redirect after 1.5 seconds
      setTimeout(() => {
        navigate('/profile'); // Or your desired post-registration route
      }, 1500);
    })
    .catch(err => {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data || 
                         'Registration failed';
      setMessage(errorMessage);
      setIsSuccess(false);
      console.error('Registration error:', err);
    });
  };

  const handleGoogleSignup = async (credentialResponse) => {
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
      localStorage.setItem('token', token); 
      localStorage.setItem('user', JSON.stringify(user)); 
  
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
            <MDBCardImage src='/assets/Signup_pic.png' alt="signup form" className='rounded-start w-100' />
          </MDBCol>

          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <span className="h1 fw-bold mb-0">Register</span>
              </div>

              <h5 className="fw-normal my-4 pb-3">Create a new account</h5>

              <form onSubmit={handleSubmit}>
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Name' 
                  type='text' 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Email address' 
                  type='email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Password' 
                  type='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Address' 
                  type='text' 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <MDBInput 
                  wrapperClass='mb-3' 
                  label='Phone Number' 
                  type='tel' 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={setRecaptchaToken}
                />

                <div className="d-flex flex-column align-items-center mt-3">
                  <MDBBtn type="submit" className="mb-3 px-5" color='dark'>Sign Up</MDBBtn>

                  <GoogleLogin
                    onSuccess={handleGoogleSignup}
                    onError={() => {
                      setMessage('Google Sign-up Failed');
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

              <Link to='/login' className="mt-3" style={{ color: '#393f81' }}>
                Already have an account? Login here
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

export default Signup;

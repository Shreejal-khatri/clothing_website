import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'; // Social icons

const styles = {
  footer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    textAlign: 'center',
    padding: '40px 20px',
    marginTop: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'left',
  },
  column: {
    flex: '1',
    minWidth: '250px',
    margin: '10px',
  },
  heading: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  links: {
    color: '#ffffff',
    textDecoration: 'none',
    display: 'block',
    fontSize: '1rem',
    margin: '5px 0',
    transition: 'color 0.3s',
  },
  linksHover: {
    color: '#ffcc00',
  },
  socialIcons: {
    fontSize: '1.5rem',
    margin: '10px',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
};

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Business Hours Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Business Hours</h3>
          <p>
            Monday – Wednesday: 9 am – 5:30 pm <br />
            Thursday: 9 am – 9 pm <br />
            Friday: 9 am – 5:30 pm <br />
            Saturday: 9 am – 4 pm <br />
            Sunday/Public Holiday: 10:30 am – 4 pm <br />
            <strong>Closed:</strong> Constitution Day, Dashain, Easter Sunday, Christmas Day
          </p>
        </div>

        {/* Location Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Our Location</h3>
          <p>
            Durbar Mall, 911 Raja Street, Kathmandu, LL1 500 <br />
            Phone: <a href="tel:+61242265933" style={{ color: '#ffcc00', textDecoration: 'none' }}>977+ 980649586</a>
          </p>
        </div>

        {/* Shop Links Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Shop</h3>
          {/* <a href="#sale" style={styles.links} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')}>Shop The Sale</a> */}
          {/* <a href="#brands" style={styles.links} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')}>Shop By Brands</a>
          <a href="#contact" style={styles.links} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')}>Contact Us</a> */}
          <a href="/profile" style={styles.links} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')}>My Account</a>
        </div>

        {/* Social Media Column */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Follow Us</h3>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={styles.socialIcons} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram style={styles.socialIcons} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')} />
          </a>
          <a href="mailto:getogod69@gmail.com">
            <FaEnvelope style={styles.socialIcons} onMouseOver={(e) => (e.target.style.color = styles.linksHover.color)} onMouseOut={(e) => (e.target.style.color = '#ffffff')} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
        &copy; 2024 KhatriShops. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;

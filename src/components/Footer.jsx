import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">

        <div className="footer-header">
          <h2 className="footer-title">About</h2>
          <p className="footer-description">
            first name of group members
          </p>
          <hr className="footer-divider" />
        </div>

        <div className="footer-content">
          <div className="footer-left">
            <p className="copyright">©2026 Design by Amaka &amp; Ifeoma A.</p>
            <p className="copyright">Built by GroupName. All rights reserved</p>
          </div>
          <div className="footer-right">
            <p className="terms-text">TSAcademy</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
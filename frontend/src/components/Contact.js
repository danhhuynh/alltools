import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-content">
        <p className="contact-description">
          Have questions or feedback about our tools? We'd love to hear from you!
        </p>
        <div className="contact-info">
          <div className="contact-email">
            <h3>Email</h3>
            <a href="mailto:weareking0202@gmail.com" className="email-link">
              weareking0202@gmail.com
            </a>
          </div>
        </div>
        <div className="contact-message">
          <p>
            We strive to provide the best tools for your needs. Your feedback helps us improve!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact';
import Header from '../components/Header';
import SEO from '../components/SEO';
import '../components/Navigation.css';

function ContactPage() {
  // SEO configuration for Contact page
  const seoConfig = {
    title: 'Contact Us',
    description: 'Contact us for questions or feedback about our online tools',
    keywords: 'contact, email, feedback, support, online tools',
    schemaType: 'ContactPage'
  };

  return (
    <div className="App">
      <SEO 
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        schemaType={seoConfig.schemaType}
      />
      <Header />
      <main className="main-content">
        <section className="section">
          <h2 className="section-title">Contact Us</h2>
          <Contact />
        </section>
      </main>
    </div>
  );
}

export default ContactPage;

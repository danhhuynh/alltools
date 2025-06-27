import React from 'react';
import Header from '../components/Header';
import SEO from '../components/SEO';
import '../components/Navigation.css';

function AboutPage() {
  const seoConfig = {
    title: 'About AllTools',
    description: 'Learn more about AllTools, a collection of productivity and SEO utilities.',
    keywords: 'about, alltools, seo, productivity, utilities',
    schemaType: 'AboutPage'
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
          <h2 className="section-title">About AllTools</h2>
          <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <p>
              <b>AllTools</b> is a collection of productivity and SEO utilities designed to help you get more done, faster. This project features a modern technique providing tools such as backlink management, character counting, and more.
            </p>
            <p>
              <b>Features:</b>
              <ul>
                <li>SEO Backlink Management</li>
                <li>Character Counter</li>
                <li>CSV Uploader</li>
                <li>And more coming soon!</li>
              </ul>
            </p>
            <p style={{ color: '#888', fontSize: 14 }}>
              &copy; {new Date().getFullYear()} AllTools. All rights reserved.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage; 
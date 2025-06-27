import React from 'react';
import { Link } from 'react-router-dom';
import SeoBacklinkEmbed from '../components/SeoBacklinkEmbed';
import Header from '../components/Header';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import Login from '../components/Login';
import '../components/Navigation.css';

function SeoBacklinkPage() {
  const { isAuthenticated, loading } = useAuth();

  // SEO configuration for SEO Backlink page
  const seoConfig = {
    title: 'SEO Backlink Embed',
    description: 'Create and manage SEO backlinks with our free online tool',
    keywords: 'seo, backlink, embed, url, link building, seo tools, online tools',
    schemaType: 'WebApplication'
  };

  // If still loading auth state, show loading indicator
  if (loading) {
    return (
      <div className="App">
        <Header />
        <main className="main-content">
          <div className="loading-container">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

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
          <h2 className="section-title">SEO Backlink Embed</h2>

          {isAuthenticated ? (
            <SeoBacklinkEmbed />
          ) : (
            <div className="auth-required-container">
              <h3>Authentication Required</h3>
                <p style={{ paddingBottom: "5px" }}>Please log in to access the SEO Backlink Embed tool.</p>              <Login />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default SeoBacklinkPage;

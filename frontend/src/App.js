import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import IdGenerator from './components/IdGenerator';
import CharacterCounter from './components/CharacterCounter';
import CsvUploader from './components/CsvUploader';
import SEO from './components/SEO';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Function to determine which section is currently in view
  const handleScroll = () => {
    const sections = ['id-generator', 'character-counter', 'csv-uploader', 'feature-4'];

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        // If the section is in the viewport
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // SEO configuration based on active section
  const getSeoConfig = () => {
    switch (activeSection) {
      case 'id-generator':
        return {
          title: 'ID Generator',
          description: 'Generate unique IDs, short IDs, and UUIDs with our free online ID generator tool',
          keywords: 'id generator, uuid, unique id, short id, random id, online tool',
          schemaType: 'WebApplication'
        };
      case 'character-counter':
        return {
          title: 'Character Counter',
          description: 'Count characters, words, and analyze text with our free online character counter tool',
          keywords: 'character counter, word counter, text analyzer, letter count, online tool',
          schemaType: 'WebApplication'
        };
      case 'csv-uploader':
        return {
          title: 'CSV Chart Visualizer',
          description: 'Upload CSV files to visualize data as pie charts or line graphs with our free online CSV chart tool',
          keywords: 'csv chart, pie chart, line chart, data visualization, time series, csv uploader, file upload, csv processing, data analysis, online tool',
          schemaType: 'WebApplication'
        };
      case 'feature-4':
        return {
          title: 'Feature 4',
          description: 'Coming soon - Feature 4 will provide additional functionality',
          keywords: 'feature 4, coming soon, online tools',
          schemaType: 'WebPage'
        };
      default:
        return {
          title: '',
          description: '',
          keywords: '',
          schemaType: 'WebPage'
        };
    }
  };

  const seoConfig = getSeoConfig();

  return (
    <div className="App">
      <SEO 
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        schemaType={seoConfig.schemaType}
      />
      <Header />

      <nav className="navigation-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <a className="nav-link" href="#id-generator" onClick={(e) => { e.preventDefault(); scrollToSection('id-generator'); }}>
              ID Generator
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#character-counter" onClick={(e) => { e.preventDefault(); scrollToSection('character-counter'); }}>
              Character Counter
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#csv-uploader" onClick={(e) => { e.preventDefault(); scrollToSection('csv-uploader'); }}>
              CSV Charts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#feature-4" onClick={(e) => { e.preventDefault(); scrollToSection('feature-4'); }}>
              Feature 4
            </a>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <section className="section" id="id-generator">
          <h2 className="section-title">ID Generator</h2>
          <IdGenerator />
        </section>

        <section className="section" id="character-counter">
          <h2 className="section-title">Character Counter</h2>
          <CharacterCounter />
        </section>

        <section className="section" id="csv-uploader">
          <h2 className="section-title">CSV Chart Visualizer</h2>
          <CsvUploader />
        </section>

        <section className="section" id="feature-4">
          <h2 className="section-title">Feature 4</h2>
          <div className="placeholder-section">
            <p className="placeholder-text">This is a placeholder for Feature 4. More functionality can be added here in the future.</p>
            <button className="placeholder-button">Coming Soon</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

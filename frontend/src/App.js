import React from 'react';
import './App.css';
import Header from './components/Header';
import IdGenerator from './components/IdGenerator';
import CharacterCounter from './components/CharacterCounter';

function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
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
            <a className="nav-link" href="#feature-3" onClick={(e) => { e.preventDefault(); scrollToSection('feature-3'); }}>
              Feature 3
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

        <section className="section" id="feature-3">
          <h2 className="section-title">Feature 3</h2>
          <div className="placeholder-section">
            <p className="placeholder-text">This is a placeholder for Feature 3. More functionality can be added here in the future.</p>
            <button className="placeholder-button">Coming Soon</button>
          </div>
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

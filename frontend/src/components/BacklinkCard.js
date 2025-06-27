import React from 'react';
import './BacklinkCard.css';

function BacklinkCard({ description, url_link, nickname }) {
  return (
    <div className="backlink-card">
      <div className="backlink-header">
        <span className="backlink-nickname">@{nickname}</span>
      </div>
      <p className="backlink-description">{description}</p>
      <a 
        href={url_link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="backlink-url"
      >
        {url_link}
      </a>
    </div>
  );
}

export default BacklinkCard; 
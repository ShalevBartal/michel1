import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="header-section">
        <img src="/ml_logo.png" alt="Michael Levin Logo" className="logo" />
        <h1>Welcome to Michael Levin's Operation System</h1>
      </header>
      <div className="system-summary">
        <p>Welcome to the central hub of coordination and management for our community. With this powerful system, you can seamlessly update statuses, manage payments and reports, and ensure everything is running smoothly. Dive into the features that make our community thrive, from housing coordination to financial oversight.</p>
      </div>
      <div className="interactive-element">
        {/* Placeholder for Interactive element like a video or a poll */}
      </div>
      <div className="image-gallery">
        <img src="/download.jpeg" alt="Gallery Image 1" className="gallery-img" />
        <img src="/download1.jpeg" alt="Gallery Image 2" className="gallery-img" />
        <img src="/download2.jpeg" alt="Gallery Image 3" className="gallery-img" />
        <img src="/download3.jpeg" alt="Gallery Image 4" className="gallery-img" />
        <img src="/download4.jpeg" alt="Gallery Image 5" className="gallery-img" />
      </div>
      <aside className="featured-content">
        <h3>Featured Articles</h3>
        <ul>
          <li><a href="https://www.izkor.gov.il/%D7%9E%D7%99%D7%9B%D7%90%D7%9C%20%D7%9C%D7%95%D7%99%D7%9F/en_795e34ec0908fc902c179fafa7db2932" target="_blank" rel="noopener noreferrer" className="article-link">Michael Levin - Izkor</a></li>
          <li><a href="https://lsc.org.il/about-us/michael-levin/" target="_blank" rel="noopener noreferrer" className="article-link">About Michael Levin - LSC</a></li>
          <li><a href="https://he.wikipedia.org/wiki/%D7%9E%D7%99%D7%99%D7%A7%D7%9C_%D7%9C%D7%95%D7%99%D7%9F" target="_blank" rel="noopener noreferrer" className="article-link">Michael Levin - Wikipedia</a></li>
        </ul>
      </aside>
    </div>
  );
}

export default HomePage;

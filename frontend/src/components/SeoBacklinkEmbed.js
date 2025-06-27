import React, { useState, useEffect, useCallback, useRef } from 'react';
import './SeoBacklinkEmbed.css';
import { saveBacklink, getBacklinks } from "../services/apiService";
import BacklinkCard from './BacklinkCard';

function SeoBacklinkEmbed() {
  const [formData, setFormData] = useState({
    description: '',
    url_link: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // State for backlink list and pagination
  const [backlinks, setBacklinks] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchBacklinksOnPage = useCallback(async (pageNum) => {
    setIsLoading(true);
    try {
      const data = await getBacklinks(pageNum, 10);
      if (pageNum === 1) {
        setBacklinks(data.items);
      } else {
        setBacklinks(prev => [...prev, ...data.items]);
      }
      setHasMore(data.meta.totalPages > pageNum);
    } catch (error) {
      console.error('Failed to fetch backlinks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBacklinksOnPage(page);
  }, [page, fetchBacklinksOnPage]);

  const lastBacklinkElementRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description.trim() || !formData.url_link.trim()) {
      setSubmitResult({ success: false, message: 'Please fill in all fields' });
      return;
    }
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      await saveBacklink(formData);
      setSubmitResult({ success: true, message: 'Backlink saved successfully!' });
      setFormData({ description: '', url_link: '' });
      // Reset and refetch backlinks
      setBacklinks([]);
      setPage(1); // This will trigger a refetch
      if (page === 1) {
        fetchBacklinksOnPage(1);
      }
    } catch (error) {
      setSubmitResult({ success: false, message: error.message || 'Failed to save backlink' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="seo-backlink-container">
        <div className="seo-backlink-form-section">
          <h2 className="seo-backlink-title">Create a New Backlink</h2>
          {submitResult && (
            <div className={`seo-backlink-message ${submitResult.success ? 'success' : 'error'}`}>
              {submitResult.message}
            </div>
          )}
          <form className="seo-backlink-form" onSubmit={handleSubmit}>
            <div className="seo-backlink-form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description (max 400 chars)"
                rows="4"
                className="seo-backlink-textarea"
                maxLength="400"
              />
              <div className="char-counter">{formData.description.length}/400</div>
            </div>
            <div className="seo-backlink-form-group">
              <label htmlFor="url_link">URL Link:</label>
              <input
                type="text"
                id="url_link"
                name="url_link"
                value={formData.url_link}
                onChange={handleChange}
                placeholder="https://example.com"
                className="seo-backlink-input"
              />
            </div>
            <button type="submit" className="seo-backlink-button" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Backlink'}
            </button>
          </form>
        </div>
      </div>

      {/* New top-level container for backlinks list, 2/3 screen width */}
      <div className="seo-backlink-list-zone-main">
        <div className="seo-backlink-list">
          <h3 className="seo-backlink-list-title">Our Backlinks</h3>
          <div className="backlink-cards-grid">
            {backlinks.map((backlink, index) => (
              <div ref={backlinks.length === index + 1 ? lastBacklinkElementRef : null} key={backlink.id}>
                <BacklinkCard {...backlink} />
              </div>
            ))}
          </div>
          {isLoading && <div className="loading-indicator">Loading more...</div>}
          {!hasMore && backlinks.length > 0 && <div className="no-more-backlinks">You've reached the end.</div>}
          {!isLoading && !backlinks.length && <div className="empty-state">No backlinks found. Create one above!</div>}
        </div>
      </div>
    </>
  );
}

export default SeoBacklinkEmbed;

import React, { useState, useEffect } from 'react';
import SectionHeading from '../components/SectionHeading';
import { skillsCategories } from '../data/skills';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCategory) {
        setSelectedCategory(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <section id="skills" className="section skills-section" aria-label="Technical Skills">
      <div className="container centered-section-container">
        <SectionHeading title="Technical Skills" />

        <div className="skills-category-grid" role="tablist" aria-label="Skill Categories">
          {skillsCategories.map((category) => {
            const isSelected = selectedCategory?.id === category.id;
            return (
              <button
                key={category.id}
                type="button"
                className={`skill-category-trigger-btn ${isSelected ? 'is-active-category' : ''}`}
                onClick={() => handleCategoryClick(category)}
                aria-expanded={isSelected}
                aria-controls={`skills-panel-${category.id}`}
              >
                <span className="category-trigger-name">{category.name}</span>
                <span className="category-trigger-indicator" aria-hidden="true">
                  {isSelected ? '−' : '+'}
                </span>
              </button>
            );
          })}
        </div>

        <div
          className={`expandable-panel-wrapper ${selectedCategory ? 'is-expanded' : ''}`}
          aria-hidden={!selectedCategory}
        >
          <div className="expandable-panel-inner" inert={!selectedCategory ? "" : undefined}>
            {selectedCategory && (
              <div
                id={`skills-panel-${selectedCategory.id}`}
                className="inline-detail-panel skills-detail-panel"
                role="region"
                aria-label={`${selectedCategory.name} skills`}
              >
                <div className="panel-header">
                  <h3 className="panel-title">{selectedCategory.name}</h3>
                  <button
                    type="button"
                    className="panel-close-btn"
                    onClick={() => setSelectedCategory(null)}
                    aria-label="Close skills panel"
                  >
                    &times; Close
                  </button>
                </div>

                <div className="skills-pill-row" key={selectedCategory.id}>
                  {selectedCategory.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="skill-pill skill-pill-animated"
                      style={{ animationDelay: `${Math.min(idx * 30, 180)}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

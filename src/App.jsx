import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Internship from './sections/Internship';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Graceful IntersectionObserver scroll reveal (runs once, disabled on reduced-motion)
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    if ('IntersectionObserver' in window) {
      document.documentElement.classList.add('js-reveal-active');

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px'
        }
      );

      const revealTargets = document.querySelectorAll('.reveal-block');
      revealTargets.forEach((target) => revealObserver.observe(target));

      return () => revealObserver.disconnect();
    }
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <div className="reveal-block">
          <Hero />
        </div>
        <div className="reveal-block">
          <About />
        </div>
        <div className="reveal-block">
          <Skills />
        </div>
        <div className="reveal-block">
          <Internship />
        </div>
        <div className="reveal-block">
          <Projects />
        </div>
        <div className="reveal-block">
          <Certifications />
        </div>
        <div className="reveal-block">
          <Education />
        </div>
        <div className="reveal-block">
          <Contact />
        </div>
      </main>

      <Footer />
    </>
  );
}

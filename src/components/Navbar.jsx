import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, CloseIcon } from './Icons';

const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About Me', href: '#about', id: 'about' },
  { label: 'Technical Skills', href: '#skills', id: 'skills' },
  { label: 'Internship', href: '#internship', id: 'internship' },
  { label: 'Featured Projects', href: '#projects', id: 'projects' },
  { label: 'Certifications', href: '#certifications', id: 'certifications' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: "Let's Connect", href: '#contact', id: 'contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navListRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const firstDrawerLinkRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Monitor scroll for shadow effect (passive and throttled)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding active indicator on activeSection change
  useEffect(() => {
    if (!navListRef.current) return;
    const activeLink = navListRef.current.querySelector('.nav-link.is-active');
    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Update indicator position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (!navListRef.current) return;
      const activeLink = navListRef.current.querySelector('.nav-link.is-active');
      if (activeLink) {
        setIndicatorStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1
        });
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on Escape key and return focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileToggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll and handle focus when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.classList.add('mobile-nav-open');
      // Focus first link in drawer
      setTimeout(() => {
        firstDrawerLinkRef.current?.focus();
      }, 50);
    } else {
      document.documentElement.classList.remove('mobile-nav-open');
    }
    return () => {
      document.documentElement.classList.remove('mobile-nav-open');
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    mobileToggleRef.current?.focus();
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#home" className="header-brand" aria-label="Rampally Neeraj Chary Home">
          <span className="brand-monogram">NC</span>
          <span className="brand-name">Rampally Neeraj Chary</span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list" ref={navListRef}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            {/* Smooth transform-based active indicator */}
            <span
              className="nav-active-indicator"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity
              }}
              aria-hidden="true"
            />
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />

          {/* Mobile Menu Hamburger Button */}
          <button
            ref={mobileToggleRef}
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-menu"
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="mobile-nav-item">
                  <a
                    ref={idx === 0 ? firstDrawerLinkRef : null}
                    href={item.href}
                    className={`mobile-nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={handleLinkClick}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-backdrop is-visible"
          onClick={() => {
            setMobileMenuOpen(false);
            mobileToggleRef.current?.focus();
          }}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

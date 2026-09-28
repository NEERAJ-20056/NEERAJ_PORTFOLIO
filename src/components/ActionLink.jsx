import React from 'react';

/**
 * ActionLink: Handles buttons and links with strict placeholder management.
 * If url is a placeholder (e.g. starts with "[ADD" or matches pattern):
 *   Renders a muted, disabled element with aria-disabled="true", no href,
 *   and tooltip "Link coming soon". Never reveals raw bracketed text.
 * If url is empty and hideIfEmpty is true:
 *   Renders nothing (e.g. hidden Live Demo button).
 */
export default function ActionLink({
  href,
  label,
  icon = null,
  variant = 'secondary',
  className = '',
  hideIfEmpty = false,
  download = false
}) {
  const isPlaceholder = !href || (typeof href === 'string' && href.trim().startsWith('[ADD'));
  const isEmpty = !href || (typeof href === 'string' && href.trim() === '');

  if (isEmpty && hideIfEmpty) {
    return null;
  }

  const baseClass = `btn btn-${variant} ${className}`.trim();

  if (isPlaceholder || isEmpty) {
    return (
      <span className="tooltip-container" style={{ display: 'inline-flex' }}>
        <button
          type="button"
          className={`${baseClass} btn-disabled`}
          aria-disabled="true"
          disabled
          aria-label={`${label} (Link coming soon)`}
        >
          {icon}
          <span>{label}</span>
        </button>
        <span className="tooltip-text" role="tooltip">
          Link coming soon
        </span>
      </span>
    );
  }

  const isInternalHash = href.startsWith('#');
  const isExternal = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');

  return (
    <a
      href={href}
      className={baseClass}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

/**
 * Project Card Component
 * Modular generator for rendering project items
 */

export function createProjectCardMarkup(project) {
  const primaryCategory = project.categories ? project.categories[0] : (project.category || 'Engineering');
  const techTags = (project.tech_stack || []).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');

  let githubBtn = '';
  if (project.github_url && !project.github_url.includes('YOUR_')) {
    githubBtn = `
      <a href="${escapeHtml(project.github_url)}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="View Source">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </a>
    `;
  }

  let demoBtn = '';
  if (project.demo_url && !project.demo_url.includes('YOUR_')) {
    demoBtn = `
      <a href="${escapeHtml(project.demo_url)}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="Live Demo">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>
    `;
  }

  return `
    <div class="project-card reveal" data-id="${escapeHtml(project.id)}">
      <div class="project-thumb-wrapper">
        <img src="${escapeHtml(project.thumbnail || project.thumbnail_url)}" alt="${escapeHtml(project.title)}" class="project-thumb" loading="lazy">
        <span class="project-category-badge">${escapeHtml(primaryCategory)}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.short_description)}</p>
        <div class="project-tech-tags">${techTags}</div>
        <div class="project-footer-actions">
          <button class="btn btn-secondary btn-sm view-details-btn" data-id="${escapeHtml(project.id)}">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <div class="project-links">
            ${githubBtn}
            ${demoBtn}
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

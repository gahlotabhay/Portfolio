/**
 * Navbar Component
 * Reusable markup generator and helper for the sticky navigation bar
 */

export function createNavbarComponent() {
  return `
    <nav class="navbar" id="navbar" role="navigation" aria-label="Main Navigation">
      <div class="container nav-container">
        <a href="#home" class="nav-brand" aria-label="Abhay Gahlot - Home">
          <div class="nav-brand-logo">AG</div>
          <span>Abhay Gahlot</span>
        </a>

        <ul class="nav-menu" id="nav-menu">
          <li><a href="#home" class="nav-link active">Home</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#skills" class="nav-link">Skills</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#research" class="nav-link">Research</a></li>
          <li><a href="#experience" class="nav-link">Experience</a></li>
          <li><a href="#education" class="nav-link">Education</a></li>
          <li><a href="#certifications" class="nav-link">Certifications</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
          <li class="mobile-only">
            
          </li>
        </ul>

        <div class="nav-actions">
          <button class="theme-toggle-btn" aria-label="Toggle Theme" title="Toggle Light/Dark Theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          </button>
          
          <a href="../frontend/assets/resume/ABHAY_RESUME.pdf" download="Abhay_Gahlot_Resume.pdf" class="btn btn-primary btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>Resume</span>
          </a>

          <button class="mobile-toggle-btn" id="mobile-toggle" aria-label="Open Navigation Menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Hero Component
 * Reusable hero layout and interactive badge generator
 */

export function createHeroComponent(data = {}) {
  const {
    name = 'Abhay Gahlot',
    title = 'Electrical & Computer Engineering Student | AI & Data Science Enthusiast',
    tagline = 'Building intelligent systems through AI, software, and engineering.',
    bio = 'I am an Electrical and Computer Engineering student at KIET Group of Institutions, passionate about building intelligent systems using AI, data, software, and engineering principles. I enjoy exploring innovative ideas, developing practical solutions, and transforming complex problems into meaningful technical projects.',
    photoUrl = '../frontend/assets/images/abhay.jpg',
    resumeUrl = '../frontend/assets/resume/ABHAY_RESUME.pdf',
    githubUrl = 'https://github.com/gahlotabhay',
    linkedinUrl = 'www.linkedin.com/in/abhay-gahlot',
    email = 'abhaygahlot100@gmail.com'
  } = data;

  return `
    <section class="hero-section" id="home">
      <canvas id="hero-canvas" class="hero-canvas"></canvas>
      <div class="hero-glow-blob hero-glow-1"></div>
      <div class="hero-glow-blob hero-glow-2"></div>

      <div class="container hero-content-wrapper">
        <div class="hero-text reveal">
          <div class="hero-badge">
            <span class="hero-badge-pulse"></span>
            <span>Available for Internships &amp; Research</span>
          </div>

          <div class="hero-greeting">Hi, I'm</div>
          <h1 class="hero-name"><span class="gradient-text">${name}</span></h1>
          <div class="hero-title">${title}</div>

          <div class="hero-tagline">"${tagline}"</div>

          <p class="hero-desc">${bio}</p>

          <div class="hero-cta-group">
            <a href="#projects" class="btn btn-primary">
              <span>Explore My Projects</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href="${resumeUrl}" download="Abhay_Gahlot_Resume.pdf" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download Resume</span>
            </a>
          </div>

          <div class="hero-social-links">
            <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="GitHub Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="${linkedinUrl}" target="_blank" rel="noopener noreferrer" class="social-pill" aria-label="LinkedIn Profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="mailto:${email}" class="social-pill" aria-label="Send Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </div>
        </div>

        <div class="hero-visual reveal reveal-right">
          <div class="avatar-frame">
            <div class="avatar-inner">
              <img src="${photoUrl}" alt="${name} - Electrical & Computer Engineering Student" loading="eager">
            </div>

            <div class="floating-badge badge-pos-1">
              <div class="floating-badge-icon blue">⚡</div>
              <div class="floating-badge-info">
                <strong>ELCE Student</strong>
                <span>KIET • 7.23 CGPA</span>
              </div>
            </div>

            <div class="floating-badge badge-pos-2">
              <div class="floating-badge-icon cyan">🤖</div>
              <div class="floating-badge-info">
                <strong>AI &amp; Energy Systems</strong>
                <span>Research &amp; Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

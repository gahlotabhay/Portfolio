/**
 * Projects Module
 * Handles project data, category filtering, dynamic rendering, and detailed modal views
 */

(function () {
  'use strict';

  // 1. Structured Projects Data (Single Source of Truth)
  const projectsData = [
    {
      id: 'electricity-load-prediction',
      title: 'Electricity Load Demand Prediction Using Random Forest',
      tagline: 'Machine learning time-series regression for national electricity demand forecasting',
      short_description: 'A machine learning project focused on predicting electricity demand using historical Indian electricity consumption data. The project explores temporal features such as year, month, day, and hour to estimate national hourly electricity demand.',
      categories: ['AI/ML', 'Data Science'],
      thumbnail: '../frontend/assets/projects/load-forecasting.svg',
      tech_stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'Matplotlib'],
      github_url: null, // Set to repo URL or null to gracefully hide
      demo_url: null,
      problem_statement: 'Accurate electricity load forecasting is vital for power grid reliability, preventing blackout risks, optimizing fuel utilization, and scheduling power generator dispatch. The temporal nature of consumption varies non-linearly across diurnal and seasonal cycles.',
      objective: 'Design and implement a robust predictive machine learning pipeline using Random Forest Regressor to forecast hourly national power consumption patterns based on historical temporal dynamics.',
      proposed_solution: 'Built a structured feature-engineering framework extracting cyclically transformed temporal indicators (hour of day, day of week, month, holidays) combined with an ensemble Random Forest regression model to capture non-linear relationships without parametric assumptions.',
      technologies_used: 'Python 3.10+, Pandas (time-series rolling statistics), NumPy (array vectorization), Scikit-learn (RandomForestRegressor, TimeSeriesSplit, GridSearchCV), Matplotlib & Seaborn (error distribution & demand curve visualization).',
      system_architecture: 'Raw Data Ingestion -> Time-Series Preprocessing & Imputation -> Feature Extraction (Temporal Lag, Rolling Statistics) -> Ensemble Training (Random Forest) -> Model Validation & Error Analysis -> Actual vs Predicted Load Visualizations.',
      development_methodology: 'Modular exploratory data analysis (EDA) performed in Jupyter; cross-validation utilizing time-series splits to prevent lookahead bias; hyperparameter tuning with GridSearchCV.',
      my_contribution: 'Led the complete data preprocessing, missing value imputation, engineering cyclical time features, training Scikit-learn regressors, and generating comparative visual plots.',
      results: 'Successfully achieved low root mean squared error (RMSE) on historical test sets, accurately modeling midday and evening peak electricity demands across seasonal transitions.',
      challenges: 'Managing seasonal variance, unannounced load shedding anomalies in historical logs, and tuning ensemble tree depth to mitigate overfitting.',
      future_scope: 'Incorporate real-time meteorological features (ambient temperature, humidity, solar irradiance index) and test hybrid architectures pairing Random Forest with LSTM/XGBoost.'
    },
    {
      id: 'microgrid-energy-management',
      title: 'Microgrid Energy Management and Islanding Detection',
      tagline: 'Simulated microgrid incorporating solar PV, battery energy storage, and IEEE 1547 islanding protection',
      short_description: 'A simulated microgrid system involving solar PV, battery energy storage, a utility grid, and local loads. The project investigates islanding conditions and the monitoring of electrical parameters to improve system reliability.',
      categories: ['Electrical Engineering', 'Research'],
      thumbnail: '../frontend/assets/projects/microgrid-ems.svg',
      tech_stack: ['MATLAB Simulink', 'Simscape Electrical', 'MATLAB', 'Power Systems', 'Control Systems'],
      github_url: null,
      demo_url: null,
      problem_statement: 'Distributed generation units must rapidly detect disconnection from the main utility grid (islanding) to protect line maintenance personnel, avoid out-of-phase reclosing, and preserve equipment safety per IEEE 1547 standards.',
      objective: 'Model a comprehensive campus microgrid incorporating solar PV arrays, battery storage, and dynamic loads in MATLAB Simulink, formulating passive islanding detection criteria based on voltage and frequency deviations.',
      proposed_solution: 'Integrated Simscape Electrical components to simulate continuous power flow under grid-connected and islanded modes, deploying a rule-based Energy Management System (EMS) for battery state-of-charge (SOC) balancing and frequency shift detection.',
      technologies_used: 'MATLAB R2023b, Simulink, Simscape Electrical, Power System Blockset, Discrete Solvers, Control System Toolbox.',
      system_architecture: 'PV Array with MPPT + Battery Energy Storage (Bidirectional Buck-Boost DC-DC) -> DC-AC Three-Phase Inverter -> Point of Common Coupling (PCC) Circuit Breaker -> Grid & Local Priority Loads -> Real-time Parameter Monitoring Logic.',
      development_methodology: 'Mathematical modeling of solar irradiance and PV I-V characteristics, tuning PI controllers for inverter synchronization with grid voltage, followed by controlled breaker opening to evaluate islanding detection time.',
      my_contribution: 'Built the Simulink electrical circuit model, configured inverter synchronization controllers, implemented islanding detection thresholds (under/over-voltage and under/over-frequency relay logic), and analyzed waveform transients.',
      results: 'Confirmed rapid islanding detection within permissible IEEE 1547 time limits (< 2 seconds), with clean transition to autonomous battery support for critical local loads.',
      challenges: 'Mitigating Non-Detection Zones (NDZ) where load closely matches generation power, and preventing nuisance tripping during normal grid transients.',
      future_scope: 'Implement active islanding detection techniques (such as active frequency drift) and interface hardware-in-the-loop (HIL) with digital signal processors.'
    },
    {
      id: 'ev-charging-demand-forecasting',
      title: 'EV Charging Demand Forecasting',
      tagline: 'Data-driven machine learning models for forecasting electric vehicle charging load',
      short_description: 'A data-driven project exploring electric vehicle charging demand and the prediction of charging requirements using historical or modeled data.',
      categories: ['Data Science', 'AI/ML'],
      thumbnail: '../frontend/assets/projects/ev-charging.svg',
      tech_stack: ['Python', 'Data Analytics', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy', 'XGBoost', 'Matplotlib'],
      github_url: null,
      demo_url: null,
      problem_statement: 'Rapid proliferation of electric vehicles creates localized transformer stress and uncoordinated peak charging surges on the electrical distribution network, threatening grid stability.',
      objective: 'Forecast charging station power demand and session durations using machine learning to support smart charging scheduling, grid capacity planning, and dynamic energy pricing.',
      proposed_solution: 'Formulated a multivariate regression and time-series model utilizing temporal patterns, traffic arrival rates, battery state, and historical charging records to predict aggregate station kW load.',
      technologies_used: 'Python, Pandas, NumPy, XGBoost, Scikit-learn, Matplotlib, Seaborn, Jupyter Notebook.',
      system_architecture: 'Charging Event Ingestion -> Data Cleaning & Outlier Removal -> Feature Engineering (Time-of-day, Day-type, Peak tariff intervals, Cumulative arrival rates) -> Model Training (XGBoost & Gradient Boosting) -> Demand Curve Output & Peak Analysis.',
      development_methodology: 'Conducted rigorous exploratory data analysis identifying arrival and departure probability distributions, engineered time-of-use tariff features, and compared multi-model performance.',
      my_contribution: 'Spearheaded dataset preparation, outlier handling for erroneous charging session durations, model training with Scikit-learn and XGBoost, and creation of actionable demand distribution plots.',
      results: 'Enabled accurate forecasting of peak charging hours, revealing significant correlation with evening commuter return times and highlighting optimal periods for battery energy buffer discharge.',
      challenges: 'High volatility in individual driver dwell times, missing session records, and handling non-uniform charging curves across different EV battery capacities.',
      future_scope: 'Integrate spatial geographic clustering for multi-station urban networks and incorporate vehicle-to-grid (V2G) reverse power flow modeling.'
    },
    {
      id: 'ai-learning-assistant',
      title: 'AI-Powered Learning Assistant',
      tagline: 'Intelligent lecture transcription, RAG knowledge retrieval, and study summarization',
      short_description: 'An intelligent learning application exploring transcription, retrieval-augmented generation, and AI-based data processing to support knowledge retrieval and learning workflows.',
      categories: ['AI/ML', 'Web Development'],
      thumbnail: '../frontend/assets/projects/swift-notes.svg',
      tech_stack: ['Python', 'AI', 'NLP', 'RAG', 'OpenAI API', 'FastAPI', 'JavaScript', 'HTML/CSS'],
      github_url: null,
      demo_url: null,
      problem_statement: 'Students and researchers waste substantial hours manually reviewing lengthy technical lectures and videos to locate specific formulas, derivations, and conceptual explanations.',
      objective: 'Build an automated, interactive learning assistant capable of transcribing multimedia lectures, chunking knowledge segments, and executing semantic retrieval-augmented generation (RAG) queries with contextual citations.',
      proposed_solution: 'Built an end-to-end processing pipeline using Whisper for audio transcription, local embedding generation, vector similarity indexing, and LLM orchestration with structured prompt templates to extract concise revision sheets and formula summaries.',
      technologies_used: 'Python, FastAPI, OpenAI Whisper, OpenAI API, LangChain / RAG utilities, NumPy, HTML5, CSS3, JavaScript.',
      system_architecture: 'Lecture Audio/Video Input -> Audio Preprocessing -> Whisper Transcription Engine -> Text Chunking & Vector Embeddings -> In-Memory Vector Store -> RAG Retrieval Engine -> Context-Grounded LLM Generation -> Frontend Interface.',
      development_methodology: 'Agile prototyping with Python and FastAPI for backend microservices, modular retrieval testing using cosine similarity on semantic vector embeddings, and building a responsive web user interface.',
      my_contribution: 'Engineered the backend audio-to-text pipeline, structured document indexing algorithms, implemented prompt templates preventing hallucinations, and created the API endpoints for real-time querying.',
      results: 'Reduced lecture review time by over 60%, delivering precise formula breakdowns, auto-generated flashcards, and direct timestamp-linked answers to user queries.',
      challenges: 'Processing technical jargon, mathematical nomenclature in transcribed speech, and optimizing vector retrieval latency on lengthy lecture transcripts.',
      future_scope: 'Add localized on-device inference with lightweight open-source models (Gemma/Llama), support handwritten mathematical OCR recognition, and enable interactive spaced-repetition quizzes.'
    },
    {
      id: 'automatic-mixing-plant',
      title: 'Automatic Mixing Process Plant Using PLC, HMI and SCADA',
      tagline: 'Industrial automation control system featuring Delta PLC, HMI sequencing, and SCADA supervision',
      short_description: 'An industrial automation project designed to automate a mixing process using PLC-based control logic, an HMI interface, timers, motors, and process sequencing.',
      categories: ['Automation', 'Electrical Engineering', 'Research'],
      thumbnail: '../frontend/assets/projects/plc-mixing.svg',
      tech_stack: ['Delta PLC', 'PLC Programming', 'HMI', 'SCADA', 'Ignition', 'Industrial Automation'],
      github_url: null,
      demo_url: null,
      problem_statement: 'Traditional manual industrial fluid mixing processes suffer from human operator errors, batch inconsistency, chemical hazards, and lack of real-time telemetry, hindering Industry 4.0 modernization.',
      objective: 'Engineer a dependable automated liquid batch mixing control system utilizing programmable logic controllers (PLC), human-machine interfaces (HMI), and SCADA telemetry for recipe execution, safety interlocks, and sensor monitoring.',
      proposed_solution: 'Developed ladder logic on Delta PLC featuring multi-stage sequencing (inlet valve staging, high-torque agitator motor timer control, temperature threshold management, and drain pump actuation), integrated with an intuitive HMI touchscreen and SCADA dashboard.',
      technologies_used: 'Delta DVP PLC, WPLSoft / ISPSoft Ladder Programming, DOPSoft HMI Designer, SCADA (Ignition), RS-485 Modbus RTU.',
      system_architecture: 'Field Instrumentation (Level Sensors, Solenoid Valves, Temp Transducers) -> Discrete/Analog I/O Modules -> Delta PLC CPU (Ladder Logic Engine) -> RS-485 / Modbus Communication -> SCADA & HMI Graphical Interface.',
      development_methodology: 'Process flow drafting (P&ID), input/output allocation mapping, ladder diagram sequencing with state-machine design, hardware-in-the-loop safety interlock verification, and SCADA animation binding.',
      my_contribution: 'Authored the complete ladder logic program with automatic and manual fail-safe overrides, mapped industrial I/O addresses, configured SCADA real-time telemetry screens, and co-authored the accepted conference research paper.',
      results: 'Validated flawless sequential batch mixing cycle execution with zero overflow faults, accurate motor dwell timings, and immediate visual alarms on critical threshold deviations.',
      challenges: 'Implementing anti-chatter software debounce on noisy mechanical float sensors and ensuring fail-safe emergency stop (E-stop) state recovery without losing batch progress.',
      future_scope: 'Integrate OPC-UA protocols for cloud ERP connectivity, add predictive motor vibration analytics using Edge AI, and implement closed-loop PID temperature regulation.'
    },
    {
      id: 'reguflow-aicte-automation',
      title: 'ReguFlow — Intelligent Regulatory Workflow Automation',
      tagline: 'Centralized platform concept for automated institutional compliance and AICTE approval workflows',
      short_description: 'An AI-enabled platform concept designed to automate AICTE approval workflows, monitor institutional compliance, validate documents, and manage deadline-based alerts through a centralized digital system.',
      categories: ['Web Development', 'AI/ML'],
      thumbnail: '../frontend/assets/projects/reguflow.svg',
      tech_stack: ['Next.js', 'React', 'FastAPI', 'OCR', 'Rule Engine', 'PostgreSQL', 'AI'],
      github_url: null,
      demo_url: null,
      problem_statement: 'Higher education institutions face grueling, error-prone manual compliance procedures to secure annual AICTE regulatory approvals, struggling with fragmented documentation, complex deficiency norms, and missed deadlines.',
      objective: 'Conceive and build an intelligent, centralized web platform to streamline institutional compliance auditing, automate document verification via OCR, and track statutory deadlines with role-based governance.',
      proposed_solution: 'Designed a full-stack digital portal combining Next.js frontend with FastAPI microservices, incorporating an automated document OCR intake pipeline, rule-engine compliance calculator against AICTE Approval Process Handbook (APH) guidelines, and audit trail reporting.',
      technologies_used: 'Next.js 14, React, TypeScript, Tailwind CSS, FastAPI, Python, PostgreSQL, Tesseract OCR / Document Intelligence.',
      system_architecture: 'Client Portal (Admin / Faculty / Auditor Views) -> Next.js / React UI -> RESTful FastAPI Backend -> Rule Validation Engine & OCR Parser -> PostgreSQL Normalized Relational Store -> Notification & Compliance Status Dispatcher.',
      development_methodology: 'Requirements mapping from statutory AICTE norms, database schema normalization for multi-department metrics (faculty-student ratio, lab sq.ft, library volumes), and iterative UI prototyping.',
      my_contribution: 'Architected the system data models, formulated algorithmic rule-checking conditions for infrastructure and cadre ratios, designed responsive dashboard mockups, and structured the REST API endpoints.',
      results: 'Demonstrated automated calculation of institutional compliance percentages, pinpointing specific deficiency clauses before official submission and eliminating manual audit overhead.',
      challenges: 'Handling disparate document formats and scanned stamp artifacts during OCR ingestion, and designing flexible rule schemas to accommodate annual statutory guideline revisions.',
      future_scope: 'Deploy multi-agent validation to cross-verify physical land title deeds and fire-safety certificates, and incorporate automated discrepancy explanation generation for institutional administrators.'
    }
  ];

  // 2. Render Project Cards
  function renderProjects(filterCategory = 'All') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const filtered = projectsData.filter(project => {
      if (filterCategory === 'All') return true;
      return project.categories.some(cat => cat.toLowerCase() === filterCategory.toLowerCase());
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
          <p>No projects currently listed under "${filterCategory}".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(project => {
      const card = createProjectCard(project);
      grid.appendChild(card);
    });
  }

  function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card reveal';
    card.setAttribute('data-id', project.id);

    const primaryCategory = project.categories[0];
    const techTagsHtml = project.tech_stack.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('');

    // Conditionally show GitHub and Live Demo buttons
    let githubBtnHtml = '';
    if (project.github_url && !project.github_url.includes('YOUR_')) {
      githubBtnHtml = `
        <a href="${escapeHtml(project.github_url)}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="View Source on GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
      `;
    }

    let demoBtnHtml = '';
    if (project.demo_url && !project.demo_url.includes('YOUR_')) {
      demoBtnHtml = `
        <a href="${escapeHtml(project.demo_url)}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="Open Live Demonstration">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      `;
    }

    card.innerHTML = `
      <div class="project-thumb-wrapper">
        <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)}" class="project-thumb" loading="lazy">
        <span class="project-category-badge">${escapeHtml(primaryCategory)}</span>
      </div>
      <div class="project-body">
        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.short_description)}</p>
        <div class="project-tech-tags">
          ${techTagsHtml}
        </div>
        <div class="project-footer-actions">
          <button class="btn btn-secondary btn-sm view-details-btn" data-id="${escapeHtml(project.id)}">
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <div class="project-links">
            ${githubBtnHtml}
            ${demoBtnHtml}
          </div>
        </div>
      </div>
    `;

    // Hook up view details button
    const viewBtn = card.querySelector('.view-details-btn');
    viewBtn.addEventListener('click', () => {
      openProjectModal(project.id);
    });

    return card;
  }

  // 3. Project Detail Modal Controller (10 Required Sections)
  function openProjectModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop) return;

    document.getElementById('modal-category').textContent = project.categories.join(' • ');
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-tagline').textContent = project.tagline;

    // Populate all 10 required sections
    document.getElementById('modal-problem').textContent = project.problem_statement;
    document.getElementById('modal-objective').textContent = project.objective;
    document.getElementById('modal-solution').textContent = project.proposed_solution;
    document.getElementById('modal-tech').textContent = project.technologies_used;
    document.getElementById('modal-architecture').textContent = project.system_architecture;
    document.getElementById('modal-methodology').textContent = project.development_methodology;
    document.getElementById('modal-contribution').textContent = project.my_contribution;
    document.getElementById('modal-results').textContent = project.results;
    document.getElementById('modal-challenges').textContent = project.challenges;
    document.getElementById('modal-future').textContent = project.future_scope;

    // Modal Actions (GitHub & Demo)
    const modalGithubBtn = document.getElementById('modal-github-btn');
    const modalDemoBtn = document.getElementById('modal-demo-btn');

    if (modalGithubBtn) {
      if (project.github_url && !project.github_url.includes('YOUR_')) {
        modalGithubBtn.href = project.github_url;
        modalGithubBtn.style.display = 'inline-flex';
      } else {
        modalGithubBtn.style.display = 'none';
      }
    }

    if (modalDemoBtn) {
      if (project.demo_url && !project.demo_url.includes('YOUR_')) {
        modalDemoBtn.href = project.demo_url;
        modalDemoBtn.style.display = 'inline-flex';
      } else {
        modalDemoBtn.style.display = 'none';
      }
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modalBackdrop = document.getElementById('project-modal');
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Helper escape
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 4. Initialize Filters and Events
  document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderProjects('All');

    // Filter bar button clicks
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-filter') || 'All';
        renderProjects(category);

        // Re-trigger scroll observer for new cards
        if (window.portfolioObserver) {
          document.querySelectorAll('.project-card.reveal').forEach(el => {
            window.portfolioObserver.observe(el);
          });
        }
      });
    });

    // Close Modal Events
    const closeBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.getElementById('project-modal');

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', e => {
        if (e.target === modalBackdrop) closeProjectModal();
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
        closeProjectModal();
      }
    });
  });

  window.portfolioProjects = {
    getAll: () => projectsData,
    openModal: openProjectModal,
    closeModal: closeProjectModal,
    render: renderProjects
  };
})();

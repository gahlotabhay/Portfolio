/**
 * Database Configuration & Connection Pool
 * Supports PostgreSQL with graceful fallback to SQLite / Local Store
 */

const path = require('path');
const fs = require('fs');

// Try to load dotenv
try {
  require('dotenv').config({ path: path.join(__dirname, '../../.env') });
} catch (e) {
  // Dotenv optional if env vars are passed directly
}

let pgPool = null;
let dbMode = 'uninitialized';
let localStore = null;

// Initialize Postgres if credentials/packages are available
async function initializeDatabase() {
  const isPostgresConfigured = process.env.DATABASE_URL || (process.env.DB_USER && process.env.DB_NAME);

  if (isPostgresConfigured) {
    try {
      const { Pool } = require('pg');
      const connectionConfig = process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            database: process.env.DB_NAME || 'abhay_portfolio',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || '',
            connectionTimeoutMillis: 3000
          };

      const testPool = new Pool(connectionConfig);
      // Test connectivity
      const client = await testPool.connect();
      await client.query('SELECT NOW()');
      client.release();

      pgPool = testPool;
      dbMode = 'postgres';
      console.log(' Successfully connected to PostgreSQL database.');
      return;
    } catch (err) {
      console.warn('⚠️  PostgreSQL connection unavailable (' + err.message + '). Initializing resilient local store.');
    }
  }

  // Resilient fallback store for out-of-the-box execution
  dbMode = 'local_embedded';
  initLocalStore();
  console.log(' Local database initialized with embedded seed data.');
}

// Fallback in-memory / local JSON database
function initLocalStore() {
  // Read seeds directly from seed.sql or structured projects definition
  localStore = {
    contacts: [],
    projects: [
      {
        id: 'electricity-load-prediction',
        title: 'Electricity Load Demand Prediction Using Random Forest',
        tagline: 'Machine learning time-series regression for national electricity demand forecasting',
        short_description: 'A machine learning project focused on predicting electricity demand using historical Indian electricity consumption data. The project explores temporal features such as year, month, day, and hour to estimate national hourly electricity demand.',
        category: 'AI/ML',
        thumbnail_url: '../frontend/assets/projects/load-forecasting.svg',
        tech_stack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'Matplotlib'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Accurate electricity load forecasting is vital for grid reliability, preventing blackout risks, optimizing fuel utilization, and scheduling power generator dispatch. The temporal nature of consumption varies non-linearly across diurnal and seasonal cycles.',
        objective: 'Design and implement a robust predictive machine learning pipeline using Random Forest Regressor to forecast hourly national power consumption patterns based on historical temporal dynamics.',
        proposed_solution: 'Built a structured feature-engineering framework extracting cyclically transformed temporal indicators (hour of day, day of week, month, holidays) combined with an ensemble Random Forest regression model to capture non-linear relationships.',
        system_architecture: 'Raw Data Ingestion -> Time-Series Preprocessing & Imputation -> Feature Extraction (Temporal Lag, Rolling Statistics) -> Ensemble Training (Random Forest) -> Model Validation & Error Analysis -> Load Curve Visualization.',
        development_methodology: 'Modular exploratory data analysis (EDA) performed in Jupyter; cross-validation utilizing time-series splits to prevent lookahead bias; hyperparameter tuning with GridSearchCV.',
        my_contribution: 'Led the complete data preprocessing, missing value imputation, engineering cyclical time features, training Scikit-learn regressors, and generating comparative visual plots.',
        results: 'Successfully achieved low root mean squared error (RMSE) on historical test sets, accurately modeling midday and evening peak electricity demands across seasonal transitions.',
        challenges: 'Managing seasonal variance, unannounced load shedding anomalies in historical logs, and tuning ensemble tree depth to mitigate overfitting.',
        future_scope: 'Incorporate real-time meteorological features (ambient temperature, humidity, solar irradiance index) and test hybrid architectures pairing Random Forest with LSTM/XGBoost.',
        featured: true,
        display_order: 1
      },
      {
        id: 'microgrid-energy-management',
        title: 'Microgrid Energy Management and Islanding Detection',
        tagline: 'Simulated microgrid incorporating solar PV, battery energy storage, and IEEE 1547 islanding protection',
        short_description: 'A simulated microgrid system involving solar PV, battery energy storage, a utility grid, and local loads. The project investigates islanding conditions and the monitoring of electrical parameters to improve system reliability.',
        category: 'Electrical Engineering',
        thumbnail_url: '../frontend/assets/projects/microgrid-ems.svg',
        tech_stack: ['MATLAB Simulink', 'Simscape Electrical', 'MATLAB', 'Power Systems'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Distributed generation units must rapidly detect disconnection from the main utility grid (islanding) to protect line maintenance personnel, avoid out-of-phase reclosing, and preserve equipment safety per IEEE 1547 standards.',
        objective: 'Model a comprehensive campus microgrid incorporating solar PV arrays, battery storage, and dynamic loads in MATLAB Simulink, formulating passive islanding detection criteria based on voltage and frequency deviations.',
        proposed_solution: 'Integrated Simscape Electrical components to simulate continuous power flow under grid-connected and islanded modes, deploying a rule-based Energy Management System (EMS) for battery state-of-charge (SOC) balancing and frequency shift detection.',
        system_architecture: 'PV Array (MPPT) + Battery Energy Storage (Bidirectional Buck-Boost DC-DC) -> DC-AC Three-Phase Inverter -> Point of Common Coupling (PCC) Circuit Breaker -> Grid & Local Priority Loads -> Real-time Parameter Monitoring Logic.',
        development_methodology: 'Mathematical modeling of solar irradiance and PV I-V characteristics, tuning PI controllers for inverter synchronization with grid voltage, followed by controlled breaker opening to evaluate islanding detection time.',
        my_contribution: 'Built the Simulink electrical circuit model, configured inverter synchronization controllers, implemented islanding detection thresholds (under/over-voltage and under/over-frequency relay logic), and analyzed waveform transients.',
        results: 'Confirmed rapid islanding detection within permissible IEEE 1547 time limits (< 2 seconds), with clean transition to autonomous battery support for critical local loads.',
        challenges: 'Mitigating Non-Detection Zones (NDZ) where load closely matches generation power, and preventing nuisance tripping during normal grid transients.',
        future_scope: 'Implement active islanding detection techniques (such as active frequency drift) and interface hardware-in-the-loop (HIL) with digital signal processors.',
        featured: true,
        display_order: 2
      },
      {
        id: 'ev-charging-demand-forecasting',
        title: 'EV Charging Demand Forecasting',
        tagline: 'Data-driven machine learning models for forecasting electric vehicle charging load',
        short_description: 'A data-driven project exploring electric vehicle charging demand and the prediction of charging requirements using historical or modeled data.',
        category: 'Data Science',
        thumbnail_url: '../frontend/assets/projects/ev-charging.svg',
        tech_stack: ['Python', 'Data Analytics', 'Machine Learning', 'Data Visualization', 'Pandas', 'NumPy', 'XGBoost', 'Matplotlib'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Rapid proliferation of electric vehicles creates localized transformer stress and uncoordinated peak charging surges on the electrical distribution network, threatening grid stability.',
        objective: 'Forecast charging station power demand and session durations using machine learning to support smart charging scheduling, grid capacity planning, and dynamic energy pricing.',
        proposed_solution: 'Formulated a multivariate regression and time-series model utilizing temporal patterns, traffic arrival rates, battery state, and historical charging records to predict aggregate station kW load.',
        system_architecture: 'Charging Event Ingestion -> Data Cleaning & Outlier Removal -> Feature Engineering (Time-of-day, Day-type, Peak tariff intervals, Cumulative arrival rates) -> Model Training (XGBoost & Gradient Boosting) -> Demand Curve Output & Peak Analysis.',
        development_methodology: 'Conducted rigorous exploratory data analysis identifying arrival and departure probability distributions, engineered time-of-use tariff features, and compared multi-model performance.',
        my_contribution: 'Spearheaded dataset preparation, outlier handling for erroneous charging session durations, model training with Scikit-learn and XGBoost, and creation of actionable demand distribution plots.',
        results: 'Enabled accurate forecasting of peak charging hours, revealing significant correlation with evening commuter return times and highlighting optimal periods for battery energy buffer discharge.',
        challenges: 'High volatility in individual driver dwell times, missing session records, and handling non-uniform charging curves across different EV battery capacities.',
        future_scope: 'Integrate spatial geographic clustering for multi-station urban networks and incorporate vehicle-to-grid (V2G) reverse power flow modeling.',
        featured: true,
        display_order: 3
      },
      {
        id: 'ai-learning-assistant',
        title: 'AI-Powered Learning Assistant',
        tagline: 'Intelligent lecture transcription, RAG knowledge retrieval, and study summarization',
        short_description: 'An intelligent learning application exploring transcription, retrieval-augmented generation, and AI-based data processing to support knowledge retrieval and learning workflows.',
        category: 'AI/ML',
        thumbnail_url: '../frontend/assets/projects/swift-notes.svg',
        tech_stack: ['Python', 'AI', 'NLP', 'RAG', 'OpenAI API', 'FastAPI', 'JavaScript', 'HTML/CSS'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Students and researchers waste substantial hours manually reviewing lengthy technical lectures and videos to locate specific formulas, derivations, and conceptual explanations.',
        objective: 'Build an automated, interactive learning assistant capable of transcribing multimedia lectures, chunking knowledge segments, and executing semantic retrieval-augmented generation (RAG) queries with contextual citations.',
        proposed_solution: 'Built an end-to-end processing pipeline using Whisper for audio transcription, local embedding generation, vector similarity indexing, and LLM orchestration with structured prompt templates to extract concise revision sheets and formula summaries.',
        system_architecture: 'Lecture Audio/Video Input -> Audio Preprocessing -> Whisper Transcription Engine -> Text Chunking & Vector Embeddings -> In-Memory Vector Store -> RAG Retrieval Engine -> Context-Grounded LLM Generation -> Frontend Interface.',
        development_methodology: 'Agile prototyping with Python and FastAPI for backend microservices, modular retrieval testing using cosine similarity on semantic vector embeddings, and building a responsive web user interface.',
        my_contribution: 'Engineered the backend audio-to-text pipeline, structured document indexing algorithms, implemented prompt templates preventing hallucinations, and created the API endpoints for real-time querying.',
        results: 'Reduced lecture review time by over 60%, delivering precise formula breakdowns, auto-generated flashcards, and direct timestamp-linked answers to user queries.',
        challenges: 'Processing technical jargon, mathematical nomenclature in transcribed speech, and optimizing vector retrieval latency on lengthy lecture transcripts.',
        future_scope: 'Add localized on-device inference with lightweight open-source models (Gemma/Llama), support handwritten mathematical OCR recognition, and enable interactive spaced-repetition quizzes.',
        featured: true,
        display_order: 4
      },
      {
        id: 'automatic-mixing-plant',
        title: 'Automatic Mixing Process Plant Using PLC, HMI and SCADA',
        tagline: 'Industrial automation control system featuring Delta PLC, HMI sequencing, and SCADA supervision',
        short_description: 'An industrial automation project designed to automate a mixing process using PLC-based control logic, an HMI interface, timers, motors, and process sequencing.',
        category: 'Automation',
        thumbnail_url: '../frontend/assets/projects/plc-mixing.svg',
        tech_stack: ['Delta PLC', 'PLC Programming', 'HMI', 'SCADA', 'Ignition', 'Industrial Automation'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Traditional manual industrial fluid mixing processes suffer from human operator errors, batch inconsistency, chemical hazards, and lack of real-time telemetry, hindering Industry 4.0 modernization.',
        objective: 'Engineer a dependable automated liquid batch mixing control system utilizing programmable logic controllers (PLC), human-machine interfaces (HMI), and SCADA telemetry for recipe execution, safety interlocks, and sensor monitoring.',
        proposed_solution: 'Developed ladder logic on Delta PLC featuring multi-stage sequencing (inlet valve staging, high-torque agitator motor timer control, temperature threshold management, and drain pump actuation), integrated with an intuitive HMI touchscreen and SCADA dashboard.',
        system_architecture: 'Field Instrumentation (Level Sensors, Solenoid Valves, Temp Transducers) -> Discrete/Analog I/O Modules -> Delta PLC CPU (Ladder Logic Engine) -> RS-485 / Modbus Communication -> SCADA & HMI Graphical Interface.',
        development_methodology: 'Process flow drafting (P&ID), input/output allocation mapping, ladder diagram sequencing with state-machine design, hardware-in-the-loop safety interlock verification, and SCADA animation binding.',
        my_contribution: 'Authored the complete ladder logic program with automatic and manual fail-safe overrides, mapped industrial I/O addresses, configured SCADA real-time telemetry screens, and co-authored the accepted conference research paper.',
        results: 'Validated flawless sequential batch mixing cycle execution with zero overflow faults, accurate motor dwell timings, and immediate visual alarms on critical threshold deviations.',
        challenges: 'Implementing anti-chatter software debounce on noisy mechanical float sensors and ensuring fail-safe emergency stop (E-stop) state recovery without losing batch progress.',
        future_scope: 'Integrate OPC-UA protocols for cloud ERP connectivity, add predictive motor vibration analytics using Edge AI, and implement closed-loop PID temperature regulation.',
        featured: true,
        display_order: 5
      },
      {
        id: 'reguflow-aicte-automation',
        title: 'ReguFlow — Intelligent Regulatory Workflow Automation',
        tagline: 'Centralized platform concept for automated institutional compliance and AICTE approval workflows',
        short_description: 'An AI-enabled platform concept designed to automate AICTE approval workflows, monitor institutional compliance, validate documents, and manage deadline-based alerts through a centralized digital system.',
        category: 'Web Development',
        thumbnail_url: '../frontend/assets/projects/reguflow.svg',
        tech_stack: ['Next.js', 'React', 'FastAPI', 'OCR', 'Rule Engine', 'PostgreSQL', 'AI'],
        github_url: 'https://github.com/YOUR_GITHUB_URL',
        demo_url: null,
        problem_statement: 'Higher education institutions face grueling, error-prone manual compliance procedures to secure annual AICTE regulatory approvals, struggling with fragmented documentation, complex deficiency norms, and missed deadlines.',
        objective: 'Conceive and build an intelligent, centralized web platform to streamline institutional compliance auditing, automate document verification via OCR, and track statutory deadlines with role-based governance.',
        proposed_solution: 'Designed a full-stack digital portal combining Next.js frontend with FastAPI microservices, incorporating an automated document OCR intake pipeline, rule-engine compliance calculator against AICTE Approval Process Handbook (APH) guidelines, and audit trail reporting.',
        system_architecture: 'Client Portal (Admin / Faculty / Auditor Views) -> Next.js / React UI -> RESTful FastAPI Backend -> Rule Validation Engine & OCR Parser -> PostgreSQL Normalized Relational Store -> Notification & Compliance Status Dispatcher.',
        development_methodology: 'Requirements mapping from statutory AICTE norms, database schema normalization for multi-department metrics (faculty-student ratio, lab sq.ft, library volumes), and iterative UI prototyping.',
        my_contribution: 'Architected the system data models, formulated algorithmic rule-checking conditions for infrastructure and cadre ratios, designed responsive dashboard mockups, and structured the REST API endpoints.',
        results: 'Demonstrated automated calculation of institutional compliance percentages, pinpointing specific deficiency clauses before official submission and eliminating manual audit overhead.',
        challenges: 'Handling disparate document formats and scanned stamp artifacts during OCR ingestion, and designing flexible rule schemas to accommodate annual statutory guideline revisions.',
        future_scope: 'Deploy multi-agent validation to cross-verify physical land title deeds and fire-safety certificates, and incorporate automated discrepancy explanation generation for institutional administrators.',
        featured: true,
        display_order: 6
      }
    ]
  };
}

// Database helper functions
async function getProjects(category = null) {
  if (dbMode === 'postgres' && pgPool) {
    try {
      let queryText = 'SELECT * FROM projects WHERE 1=1';
      const params = [];
      if (category && category.toLowerCase() !== 'all') {
        params.push(category);
        queryText += ' AND category ILIKE $' + params.length;
      }
      queryText += ' ORDER BY display_order ASC';
      const res = await pgPool.query(queryText, params);
      return res.rows;
    } catch (e) {
      console.warn('Postgres query error, falling back to local store:', e.message);
    }
  }

  // Local fallback
  if (!localStore) initLocalStore();
  let list = localStore.projects;
  if (category && category.toLowerCase() !== 'all') {
    const catLower = category.toLowerCase().trim();
    list = list.filter(p => p.category.toLowerCase().includes(catLower));
  }
  return list;
}

async function getProjectById(id) {
  if (dbMode === 'postgres' && pgPool) {
    try {
      const res = await pgPool.query('SELECT * FROM projects WHERE id = $1', [id]);
      if (res.rows.length > 0) return res.rows[0];
    } catch (e) {
      console.warn('Postgres query error:', e.message);
    }
  }

  if (!localStore) initLocalStore();
  return localStore.projects.find(p => p.id === id) || null;
}

async function saveContactMessage(contactData) {
  const { name, email, subject, message, ipAddress } = contactData;

  if (dbMode === 'postgres' && pgPool) {
    try {
      const queryText = `
        INSERT INTO contacts (name, email, subject, message, ip_address, status)
        VALUES ($1, $2, $3, $4, $5, 'new')
        RETURNING id, name, email, subject, created_at
      `;
      const res = await pgPool.query(queryText, [name, email, subject, message, ipAddress || null]);
      return res.rows[0];
    } catch (e) {
      console.warn('Postgres contact save error, saving to local store:', e.message);
    }
  }

  if (!localStore) initLocalStore();
  const newContact = {
    id: localStore.contacts.length + 1,
    name,
    email,
    subject,
    message,
    ip_address: ipAddress || '127.0.0.1',
    status: 'new',
    created_at: new Date().toISOString()
  };
  localStore.contacts.push(newContact);
  return newContact;
}

function getDatabaseStatus() {
  return {
    mode: dbMode,
    isPostgres: dbMode === 'postgres',
    activeConnections: pgPool ? pgPool.totalCount || 1 : 0
  };
}

module.exports = {
  initializeDatabase,
  getProjects,
  getProjectById,
  saveContactMessage,
  getDatabaseStatus
};

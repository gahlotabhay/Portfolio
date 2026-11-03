-- ==============================================================================
-- Portfolio Initial Seed Data for Abhay Gahlot
-- ==============================================================================

-- 1. Projects Seed Data
INSERT INTO projects (
    id, title, tagline, short_description, category, thumbnail_url,
    tech_stack, github_url, demo_url, problem_statement, objective,
    proposed_solution, system_architecture, development_methodology,
    my_contribution, results, challenges, future_scope, featured, display_order
) VALUES 
(
    'electricity-load-prediction',
    'Electricity Load Demand Prediction Using Random Forest',
    'Machine learning time-series regression for national electricity demand forecasting',
    'A machine learning project focused on predicting electricity demand using historical Indian electricity consumption data. The project explores temporal features such as year, month, day, and hour to estimate national hourly electricity demand.',
    'AI/ML',
    '../frontend/assets/projects/load-forecasting.svg',
    '["Python", "Pandas", "NumPy", "Scikit-learn", "Random Forest", "Matplotlib"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Accurate electricity load forecasting is vital for grid reliability, preventing blackout risks, optimizing fuel utilization, and scheduling power generator dispatch. The temporal nature of consumption varies non-linearly across diurnal and seasonal cycles.',
    'Design and implement a robust predictive machine learning pipeline using Random Forest Regressor to forecast hourly national power consumption patterns based on historical temporal dynamics.',
    'Built a structured feature-engineering framework extracting cyclically transformed temporal indicators (hour of day, day of week, month, holidays) combined with an ensemble Random Forest regression model to capture complex non-linear relationships without parametric assumptions.',
    'Raw Data Ingestion -> Time-Series Preprocessing & Imputation -> Feature Extraction (Temporal Cyclical Lags, Rolling Averages) -> Ensemble Training (Random Forest Regressor) -> Model Validation & Error Analysis -> Actual vs Predicted Load Visualizations.',
    'Modular exploratory data analysis (EDA) performed in Jupyter environment; cross-validation utilizing time-series splits to prevent lookahead data leakage; hyperparameter optimization (n_estimators, max_depth, min_samples_split) via Grid Search.',
    'Spearheaded the complete data preprocessing, missing value handling, temporal feature engineering, model training with Scikit-learn regressors, and generation of comparative diagnostic visualizations.',
    'Successfully achieved low root mean squared error (RMSE) and high variance explanation on historical evaluation sets, accurately capturing midday and evening peak electricity demands across seasonal shifts.',
    'Addressing irregular seasonal anomalies, sudden load drops due to unannounced grid shedding in historical logs, and tuning ensemble tree depth to balance generalization against overfitting.',
    'Integrate meteorological features (ambient temperature, humidity, solar irradiance index) and test hybrid architectures pairing Random Forest with LSTM/XGBoost.',
    true,
    1
),
(
    'microgrid-energy-management',
    'Microgrid Energy Management and Islanding Detection',
    'Dynamic MATLAB/Simulink simulation of solar PV, BESS, and IEEE 1547 islanding protection',
    'A simulated microgrid system involving solar PV, battery energy storage, a utility grid, and local loads. The project investigates islanding conditions and the monitoring of electrical parameters to improve system reliability.',
    'Electrical Engineering',
    '../frontend/assets/projects/microgrid-ems.svg',
    '["MATLAB Simulink", "Simscape Electrical", "MATLAB", "Power Systems", "Control Systems"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Distributed generation units must rapidly detect disconnection from the main utility grid (islanding) to protect line maintenance personnel, avoid out-of-phase reclosing, and preserve equipment safety per IEEE 1547 standards.',
    'Model a comprehensive campus microgrid incorporating solar PV arrays, battery storage, and dynamic loads in MATLAB Simulink, formulating passive islanding detection criteria based on voltage and frequency deviations.',
    'Integrated Simscape Electrical components to simulate continuous power flow under grid-connected and islanded modes, deploying a rule-based Energy Management System (EMS) for battery state-of-charge (SOC) balancing and frequency shift detection.',
    'PV Array with MPPT + Battery Energy Storage (Bidirectional Buck-Boost DC-DC) -> DC-AC Three-Phase Inverter -> Point of Common Coupling (PCC) Circuit Breaker -> Grid & Local Priority Loads -> Real-time Parameter Monitoring Logic.',
    'Mathematical modeling of solar irradiance and PV I-V characteristics, tuning PI controllers for inverter synchronization with grid voltage, followed by controlled breaker opening to evaluate islanding detection time and voltage stability.',
    'Constructed the Simulink electrical circuit model, configured inverter synchronization controllers, implemented islanding detection thresholds (under/over-voltage and under/over-frequency relay logic), and analyzed waveform transients.',
    'Confirmed rapid islanding detection within permissible IEEE 1547 time limits (< 2 seconds), with clean transition to autonomous battery support for critical local loads.',
    'Mitigating Non-Detection Zones (NDZ) where load closely matches generation power, and preventing nuisance tripping during normal grid transients.',
    'Implement active islanding detection techniques (such as active frequency drift) and interface hardware-in-the-loop (HIL) with digital signal processors.',
    true,
    2
),
(
    'ev-charging-demand-forecasting',
    'EV Charging Demand Forecasting',
    'Data-driven machine learning models for forecasting electric vehicle charging load',
    'A data-driven project exploring electric vehicle charging demand and the prediction of charging requirements using historical or modeled data.',
    'Data Science',
    '../frontend/assets/projects/ev-charging.svg',
    '["Python", "Data Analytics", "Machine Learning", "Data Visualization", "Pandas", "NumPy", "XGBoost", "Matplotlib"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Rapid proliferation of electric vehicles creates localized transformer stress and uncoordinated peak charging surges on the electrical distribution network, threatening grid stability.',
    'Forecast charging station power demand and session durations using machine learning to support smart charging scheduling, grid capacity planning, and dynamic energy pricing.',
    'Formulated a multivariate regression and time-series model utilizing temporal patterns, traffic arrival rates, battery state, and historical charging records to predict aggregate station kW load.',
    'Charging Event Ingestion -> Data Cleaning & Outlier Removal -> Feature Engineering (Time-of-day, Day-type, Peak tariff intervals, Cumulative arrival rates) -> Model Training (XGBoost & Gradient Boosting) -> Demand Curve Output & Peak Analysis.',
    'Conducted rigorous exploratory data analysis identifying arrival and departure probability distributions, engineered time-of-use tariff features, and compared multi-model performance across error metrics.',
    'Spearheaded dataset preparation, outlier handling for erroneous charging session durations, model training with Scikit-learn and XGBoost, and creation of actionable demand distribution plots.',
    'Enabled accurate forecasting of peak charging hours, revealing significant correlation with evening commuter return times and highlighting optimal periods for battery energy buffer discharge.',
    'High volatility in individual driver dwell times, missing session records, and handling non-uniform charging curves across different EV battery capacities.',
    'Integrate spatial geographic clustering for multi-station urban networks and incorporate vehicle-to-grid (V2G) reverse power flow modeling.',
    true,
    3
),
(
    'ai-learning-assistant',
    'AI-Powered Learning Assistant',
    'Intelligent lecture transcription, RAG knowledge retrieval, and study summarization',
    'An intelligent learning application exploring transcription, retrieval-augmented generation, and AI-based data processing to support knowledge retrieval and learning workflows.',
    'AI/ML',
    '../frontend/assets/projects/swift-notes.svg',
    '["Python", "AI", "NLP", "RAG", "OpenAI API", "FastAPI", "JavaScript", "HTML/CSS"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Students and researchers waste substantial hours manually reviewing lengthy technical lectures and videos to locate specific formulas, derivations, and conceptual explanations.',
    'Build an automated, interactive learning assistant capable of transcribing multimedia lectures, chunking knowledge segments, and executing semantic retrieval-augmented generation (RAG) queries with contextual citations.',
    'Built an end-to-end processing pipeline using Whisper for audio transcription, local embedding generation, vector similarity indexing, and LLM orchestration with structured prompt templates to extract concise revision sheets and formula summaries.',
    'Lecture Audio/Video Input -> Audio Preprocessing -> Whisper Transcription Engine -> Text Chunking & Vector Embeddings -> In-Memory Vector Store -> RAG Retrieval Engine -> Context-Grounded LLM Generation -> Frontend Interface.',
    'Agile prototyping with Python and FastAPI for backend microservices, modular retrieval testing using cosine similarity on semantic vector embeddings, and building a responsive web user interface.',
    'Engineered the backend audio-to-text pipeline, structured document indexing algorithms, implemented prompt templates preventing hallucinations, and created the API endpoints for real-time querying.',
    'Reduced lecture review time by over 60%, delivering precise formula breakdowns, auto-generated flashcards, and direct timestamp-linked answers to user queries.',
    'Processing technical jargon, mathematical nomenclature in transcribed speech, and optimizing vector retrieval latency on lengthy lecture transcripts.',
    'Add localized on-device inference with lightweight open-source models (Gemma/Llama), support handwritten mathematical OCR recognition, and enable interactive spaced-repetition quizzes.',
    true,
    4
),
(
    'automatic-mixing-plant',
    'Automatic Mixing Process Plant Using PLC, HMI and SCADA',
    'Industrial automation control system featuring Delta PLC, HMI sequencing, and SCADA supervision',
    'An industrial automation project designed to automate a mixing process using PLC-based control logic, an HMI interface, timers, motors, and process sequencing.',
    'Automation',
    '../frontend/assets/projects/plc-mixing.svg',
    '["Delta PLC", "PLC Programming", "HMI", "SCADA", "Ignition", "Industrial Automation"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Traditional manual industrial fluid mixing processes suffer from human operator errors, batch inconsistency, chemical hazards, and lack of real-time telemetry, hindering Industry 4.0 modernization.',
    'Engineer a dependable automated liquid batch mixing control system utilizing programmable logic controllers (PLC), human-machine interfaces (HMI), and SCADA telemetry for recipe execution, safety interlocks, and sensor monitoring.',
    'Developed ladder logic on Delta PLC featuring multi-stage sequencing (inlet valve staging, high-torque agitator motor timer control, temperature threshold management, and drain pump actuation), integrated with an intuitive HMI touchscreen and SCADA dashboard.',
    'Field Instrumentation (Level Sensors, Solenoid Valves, Temp Transducers) -> Discrete/Analog I/O Modules -> Delta PLC CPU (Ladder Logic Engine) -> RS-485 / Modbus Communication -> SCADA & HMI Graphical Interface.',
    'Process flow drafting (P&ID), input/output allocation mapping, ladder diagram sequencing with state-machine design, hardware-in-the-loop safety interlock verification, and SCADA animation binding.',
    'Authored the complete ladder logic program with automatic and manual fail-safe overrides, mapped industrial I/O addresses, configured SCADA real-time telemetry screens, and co-authored the accepted conference research paper.',
    'Validated flawless sequential batch mixing cycle execution with zero overflow faults, accurate motor dwell timings, and immediate visual alarms on critical threshold deviations.',
    'Implementing anti-chatter software debounce on noisy mechanical float sensors and ensuring fail-safe emergency stop (E-stop) state recovery without losing batch progress.',
    'Integrate OPC-UA protocols for cloud ERP connectivity, add predictive motor vibration analytics using Edge AI, and implement closed-loop PID temperature regulation.',
    true,
    5
),
(
    'reguflow-aicte-automation',
    'ReguFlow — Intelligent Regulatory Workflow Automation',
    'Centralized platform concept for automated institutional compliance and AICTE approval workflows',
    'An AI-enabled platform concept designed to automate AICTE approval workflows, monitor institutional compliance, validate documents, and manage deadline-based alerts through a centralized digital system.',
    'Web Development',
    '../frontend/assets/projects/reguflow.svg',
    '["Next.js", "React", "FastAPI", "OCR", "Rule Engine", "PostgreSQL", "AI"]'::jsonb,
    'https://github.com/YOUR_GITHUB_URL',
    NULL,
    'Higher education institutions face grueling, error-prone manual compliance procedures to secure annual AICTE regulatory approvals, struggling with fragmented documentation, complex deficiency norms, and missed deadlines.',
    'Conceive and build an intelligent, centralized web platform to streamline institutional compliance auditing, automate document verification via OCR, and track statutory deadlines with role-based governance.',
    'Designed a full-stack digital portal combining Next.js frontend with FastAPI microservices, incorporating an automated document OCR intake pipeline, rule-engine compliance calculator against AICTE Approval Process Handbook (APH) guidelines, and audit trail reporting.',
    'Client Portal (Admin / Faculty / Auditor Views) -> Next.js / React UI -> RESTful FastAPI Backend -> Rule Validation Engine & OCR Parser -> PostgreSQL Normalized Relational Store -> Notification & Compliance Status Dispatcher.',
    'Requirements mapping from statutory AICTE norms, database schema normalization for multi-department metrics (faculty-student ratio, lab sq.ft, library volumes), and iterative UI prototyping.',
    'Architected the system data models, formulated algorithmic rule-checking conditions for infrastructure and cadre ratios, designed responsive dashboard mockups, and structured the REST API endpoints.',
    'Demonstrated automated calculation of institutional compliance percentages, pinpointing specific deficiency clauses before official submission and eliminating manual audit overhead.',
    'Handling disparate document formats and scanned stamp artifacts during OCR ingestion, and designing flexible rule schemas to accommodate annual statutory guideline revisions.',
    'Deploy multi-agent validation to cross-verify physical land title deeds and fire-safety certificates, and incorporate automated discrepancy explanation generation for institutional administrators.',
    true,
    6
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    short_description = EXCLUDED.short_description,
    category = EXCLUDED.category,
    tech_stack = EXCLUDED.tech_stack,
    problem_statement = EXCLUDED.problem_statement,
    objective = EXCLUDED.objective,
    proposed_solution = EXCLUDED.proposed_solution,
    system_architecture = EXCLUDED.system_architecture,
    development_methodology = EXCLUDED.development_methodology,
    my_contribution = EXCLUDED.my_contribution,
    results = EXCLUDED.results,
    challenges = EXCLUDED.challenges,
    future_scope = EXCLUDED.future_scope;

-- 2. Skills Seed Data
INSERT INTO skills (category, name, proficiency_level, icon_name, display_order) VALUES
-- Programming Languages
('Programming Languages', 'Python', 'Proficient', 'python', 1),
('Programming Languages', 'C', 'Proficient', 'c', 2),
('Programming Languages', 'C++', 'Proficient', 'cpp', 3),
('Programming Languages', 'Java', 'Familiar', 'java', 4),
('Programming Languages', 'JavaScript', 'Proficient', 'javascript', 5),
('Programming Languages', 'SQL', 'Proficient', 'database', 6),

-- Web Development
('Web Development', 'HTML5', 'Proficient', 'html', 1),
('Web Development', 'CSS3', 'Proficient', 'css', 2),
('Web Development', 'JavaScript (ES6+)', 'Proficient', 'javascript', 3),
('Web Development', 'React', 'Familiar', 'react', 4),
('Web Development', 'Next.js', 'Familiar', 'nextjs', 5),
('Web Development', 'Tailwind CSS', 'Proficient', 'tailwind', 6),

-- Data Science and Machine Learning
('Data Science and Machine Learning', 'NumPy', 'Proficient', 'numpy', 1),
('Data Science and Machine Learning', 'Pandas', 'Proficient', 'pandas', 2),
('Data Science and Machine Learning', 'Matplotlib', 'Proficient', 'chart', 3),
('Data Science and Machine Learning', 'Scikit-learn', 'Proficient', 'scikit', 4),
('Data Science and Machine Learning', 'Random Forest', 'Proficient', 'trees', 5),
('Data Science and Machine Learning', 'Data Preprocessing', 'Proficient', 'filter', 6),
('Data Science and Machine Learning', 'Data Visualization', 'Proficient', 'bar-chart', 7),
('Data Science and Machine Learning', 'Machine Learning Fundamentals', 'Proficient', 'cpu', 8),

-- Electrical Engineering and Automation
('Electrical Engineering and Automation', 'MATLAB', 'Proficient', 'matlab', 1),
('Electrical Engineering and Automation', 'MATLAB Simulink', 'Proficient', 'simulink', 2),
('Electrical Engineering and Automation', 'Arduino', 'Proficient', 'arduino', 3),
('Electrical Engineering and Automation', 'ESP32-CAM', 'Familiar', 'microchip', 4),
('Electrical Engineering and Automation', 'Delta PLC Programming', 'Proficient', 'terminal', 5),
('Electrical Engineering and Automation', 'HMI Designing', 'Proficient', 'screen', 6),
('Electrical Engineering and Automation', 'SCADA (Ignition)', 'Proficient', 'gauge', 7),
('Electrical Engineering and Automation', 'Power System Simulation', 'Proficient', 'zap', 8),
('Electrical Engineering and Automation', 'Renewable Energy Systems', 'Proficient', 'sun', 9),

-- Tools and Platforms
('Tools and Platforms', 'Git', 'Proficient', 'git', 1),
('Tools and Platforms', 'GitHub', 'Proficient', 'github', 2),
('Tools and Platforms', 'VS Code', 'Proficient', 'code', 3),
('Tools and Platforms', 'Power BI', 'Familiar', 'pie-chart', 4),
('Tools and Platforms', 'LeetCode (150+ DSA)', 'Active Practice', 'terminal', 5);

-- 3. Research Publications Seed Data
INSERT INTO research_publications (
    title, authors, conference_name, institution, conference_dates,
    abstract, keywords, paper_pdf_url, doi_url, status
) VALUES (
    'Automatic Mixing Process Plant Using PLC, HMI and SCADA for Industry 4.0 Automation',
    'Abhay Gahlot et al.',
    '3rd International Conference on Advancements & Key Challenges in Green Energy and Computing (AKGEC 2026)',
    'Ajay Kumar Garg Engineering College, Ghaziabad',
    '26–28 February 2026',
    'This research paper presents the design, development, and implementation of an automated industrial batch mixing process plant leveraging programmable logic controller (PLC) sequencing, human-machine interface (HMI), and supervisory control and data acquisition (SCADA) telemetry. The proposed architecture eliminates operator manual handling variance, guarantees reproducible batch proportions, incorporates fail-safe interlocks, and provides real-time diagnostic event logging aligned with modern Industry 4.0 manufacturing paradigms.',
    '["PLC", "HMI", "SCADA", "Industrial Automation", "Industry 4.0", "Process Control", "State Sequencing"]'::jsonb,
    '../frontend/assets/resume/ABHAY_RESUME.pdf',
    NULL,
    'Accepted for Publication'
);

-- 4. Education Seed Data
INSERT INTO education (
    degree, branch, institution, location, cgpa, duration, academic_level, coursework
) VALUES (
    'Bachelor of Technology (B.Tech)',
    'Electrical and Computer Engineering (ELCE)',
    'KIET Group of Institutions',
    'Ghaziabad, Uttar Pradesh, India',
    7.23,
    '2024 – 2028',
    'Second-year undergraduate engineering student',
    '["Data Structures and Algorithms", "Object-Oriented Programming", "Database Management Systems", "Mathematics", "Electrical Engineering Fundamentals", "Computer Networks", "Machine Learning Fundamentals"]'::jsonb
);

-- 5. Experience & Leadership Seed Data
INSERT INTO experience_leadership (organization, role, description, display_order) VALUES
(
    'IEEE Student Branch',
    'Graphics Head',
    'Contributing to the visual identity and creative communication of technical activities, workshops, and student initiatives across the engineering chapter.',
    1
),
(
    'Ek Prayas Social Service Club',
    'Public Speaker Domain Member',
    'Participating in communication-oriented initiatives, community outreach programs, and social service activities benefiting student welfare.',
    2
),
(
    'Centre of Power and Energy',
    'Member',
    'Engaging with technical seminars, hands-on experimentation, and collaborative academic activities related to power systems and energy engineering.',
    3
),
(
    'KIET Chess Club',
    'Member',
    'Participating in strategic student club tournaments and collaborative campus activities fostering tactical problem-solving.',
    4
);

-- 6. Achievements Seed Data
INSERT INTO achievements (title, organization, date, description, verification_url, display_order) VALUES
(
    'Research Paper Presentation',
    'AKGEC 2026 International Conference',
    'February 2026',
    'Accepted research paper on "Automatic Mixing Process Plant Using PLC, HMI and SCADA for Industry 4.0 Automation" at the 3rd International Conference on Advancements & Key Challenges in Green Energy and Computing.',
    '#research',
    1
),
(
    'Developers Night Hackathon Finalist',
    'KIET Group of Institutions',
    '2024 / 2025',
    'Recognized as a finalist in the competitive Developers Night Hackathon at KIET for innovative engineering problem solving and rapid prototype development.',
    NULL,
    2
),
(
    '150+ DSA Problems Solved',
    'LeetCode, GeeksforGeeks & HackerRank',
    'Ongoing',
    'Consistently solved over 150 algorithmic problem sets covering arrays, recursion, trees, dynamic programming, and graphs to sharpen computational thinking.',
    'https://leetcode.com/YOUR_GITHUB_URL',
    3
),
(
    'Technical Workshops & Presentations',
    'Engineering & Technical Forums',
    '2024 – 2026',
    'Active participation and project demonstrations in technical workshops spanning industrial control, microgrid modeling, and modern AI pipelines.',
    NULL,
    4
);

-- 7. Certifications Seed Data
INSERT INTO certifications (
    title, issuing_organization, issue_date, skills_acquired,
    credential_url, badge_image, display_order
) VALUES
(
    'Tata Data Analytics Virtual Experience',
    'Forage',
    'Verified Credential',
    '["Data Analytics", "Data Cleaning", "Business Insights", "Data Visualization", "Executive Presentation"]'::jsonb,
    'https://www.theforage.com',
    '../frontend/assets/certificates/tata-analytics.svg',
    1
),
(
    'Google Solution Challenge Participation',
    'Google Developer Student Clubs',
    'Verified Participation',
    '["Problem Solving", "Sustainable Development Goals", "Team Collaboration", "Solution Prototyping"]'::jsonb,
    'https://developers.google.com/community/gdsc-solution-challenge',
    '../frontend/assets/certificates/google-solution.svg',
    2
),
(
    'Dashboard Development Workshop',
    'GeeksforGeeks',
    'Workshop Completion',
    '["Dashboard Architecture", "Data Pipeline", "Metric KPIs", "Frontend Data Visualization"]'::jsonb,
    'https://www.geeksforgeeks.org',
    '../frontend/assets/certificates/gfg-dashboard.svg',
    3
),
(
    'Programming in C++ (8-Week Course)',
    'NPTEL Online Certification',
    'Course Certification',
    '["C++", "Object-Oriented Programming", "Memory Management", "Standard Template Library (STL)"]'::jsonb,
    'https://nptel.ac.in',
    '../frontend/assets/certificates/nptel-cpp.svg',
    4
),
(
    'Simulink Onramp — System Modeling & Simulation',
    'MathWorks (MATLAB Certified)',
    'Certified Training',
    '["MATLAB", "Simulink", "System Modeling", "Control Simulation", "Dynamic Signal Analysis"]'::jsonb,
    'https://matlabacademy.mathworks.com',
    '../frontend/assets/certificates/matlab-simulink.svg',
    5
);

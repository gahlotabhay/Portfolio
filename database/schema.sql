-- ==============================================================================
-- Portfolio Database Schema for Abhay Gahlot
-- Target: PostgreSQL / MySQL compatible DDL
-- ==============================================================================

-- 1. Contacts Table (Form Submissions)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    status VARCHAR(20) DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(80) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    short_description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'AI/ML', 'Data Science', 'Web Development', 'Electrical Engineering', 'Automation', 'Research'
    thumbnail_url VARCHAR(255),
    tech_stack JSONB NOT NULL DEFAULT '[]',
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    problem_statement TEXT,
    objective TEXT,
    proposed_solution TEXT,
    system_architecture TEXT,
    development_methodology TEXT,
    my_contribution TEXT,
    results TEXT,
    challenges TEXT,
    future_scope TEXT,
    featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    category VARCHAR(60) NOT NULL, -- 'Programming Languages', 'Web Development', 'Data Science and Machine Learning', 'Electrical Engineering and Automation', 'Tools and Platforms'
    name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(40) DEFAULT 'Proficient', -- 'Proficient', 'Familiar', 'Advanced'
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0
);

-- 4. Research Publications Table
CREATE TABLE IF NOT EXISTS research_publications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    authors VARCHAR(255) NOT NULL,
    conference_name VARCHAR(300) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    conference_dates VARCHAR(100) NOT NULL,
    abstract TEXT NOT NULL,
    keywords JSONB DEFAULT '[]',
    paper_pdf_url VARCHAR(255),
    doi_url VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Accepted for Publication',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Education Table
CREATE TABLE IF NOT EXISTS education (
    id SERIAL PRIMARY KEY,
    degree VARCHAR(100) NOT NULL,
    branch VARCHAR(150) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(150) NOT NULL,
    cgpa NUMERIC(3, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    academic_level VARCHAR(100) NOT NULL,
    coursework JSONB DEFAULT '[]'
);

-- 6. Experience & Leadership Table
CREATE TABLE IF NOT EXISTS experience_leadership (
    id SERIAL PRIMARY KEY,
    organization VARCHAR(150) NOT NULL,
    role VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 7. Achievements Table
CREATE TABLE IF NOT EXISTS achievements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    date VARCHAR(50),
    description TEXT NOT NULL,
    verification_url VARCHAR(255),
    display_order INT DEFAULT 0
);

-- 8. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    issuing_organization VARCHAR(150) NOT NULL,
    issue_date VARCHAR(50),
    skills_acquired JSONB DEFAULT '[]',
    credential_url VARCHAR(255),
    badge_image VARCHAR(255),
    display_order INT DEFAULT 0
);

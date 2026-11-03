/**
 * Backend Server for Abhay Gahlot's Professional Portfolio
 * Express.js + PostgreSQL / Local Database
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase, getDatabaseStatus } = require('./config/database-config');

const contactRouter = require('./routes/contact');
const projectsRouter = require('./routes/projects');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve static frontend assets
const frontendPath = path.join(__dirname, '../frontend');
const htmlPath = path.join(__dirname, '../html');

app.use('/frontend', express.static(frontendPath));
app.use('/html', express.static(htmlPath));

// API Routes
app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);

// Health & System Info API
app.get('/api/health', (req, res) => {
  const dbStatus = getDatabaseStatus();
  res.json({
    status: 'online',
    service: 'Abhay Gahlot Portfolio API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: dbStatus
  });
});

// Root Route: Serve Portfolio Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(htmlPath, 'index.html'));
});

// Initialize database and start server
async function startServer() {
  await initializeDatabase();

  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Portfolio Server running at http://localhost:${PORT}`);
    console.log(` Static frontend served from: ${frontendPath}`);
    console.log(` API Endpoints:`);
    console.log(`   - POST http://localhost:${PORT}/api/contact`);
    console.log(`   - GET  http://localhost:${PORT}/api/projects`);
    console.log(`   - GET  http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });

  return server;
}

// Auto-run if executed directly
if (require.main === module) {
  startServer().catch(err => {
    console.error('Fatal startup error:', err);
    process.exit(1);
  });
}

module.exports = { app, startServer };

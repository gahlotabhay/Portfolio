/**
 * Projects Routes
 */

const express = require('express');
const router = express.Router();
const { getProjects, getProjectById } = require('../config/database-config');

// GET /api/projects - Retrieve all projects, optionally filtered by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const projects = await getProjects(category);
    res.json({
      success: true,
      count: projects.length,
      category: category || 'all',
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects list.'
    });
  }
});

// GET /api/projects/:id - Retrieve detailed project information
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project detail:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.'
    });
  }
});

module.exports = router;

/**
 * Contact Form Controller
 */

const { saveContactMessage } = require('../config/database-config');

async function handleContactSubmission(req, res) {
  try {
    const contactData = req.sanitizedBody;

    // Save message to database
    const saved = await saveContactMessage(contactData);

    return res.status(201).json({
      success: true,
      message: 'Thank you, Abhay has received your message and will respond shortly!',
      data: {
        id: saved.id,
        name: saved.name,
        subject: saved.subject,
        timestamp: saved.created_at
      }
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while saving your message. Please try emailing directly at abhaygahlot100@gmail.com.'
    });
  }
}

module.exports = {
  handleContactSubmission
};

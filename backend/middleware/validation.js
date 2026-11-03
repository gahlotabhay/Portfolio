/**
 * Request Validation & Anti-Spam Middleware
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// In-memory rate limiting map (IP -> timestamps)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function validateContactSubmission(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  // 1. Rate Limiting Check
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a minute before sending another message.'
    });
  }
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);

  // 2. Honeypot check (hidden spam trap)
  const { website_hp, form_bot_check } = req.body;
  if (website_hp || form_bot_check) {
    // Spam bot detected - fake success to fool bot without saving spam
    return res.status(200).json({
      success: true,
      message: 'Your message has been received successfully.'
    });
  }

  // 3. Extract and sanitize fields
  let { name, email, subject, message } = req.body;

  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Please provide your name (at least 2 characters).');
  } else if (name.trim().length > 100) {
    errors.push('Name cannot exceed 100 characters.');
  }

  // Email validation
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    errors.push('Please provide a valid email address.');
  } else if (email.trim().length > 255) {
    errors.push('Email address is too long.');
  }

  // Subject validation
  if (!subject || typeof subject !== 'string' || subject.trim().length < 3) {
    errors.push('Please provide a subject (at least 3 characters).');
  } else if (subject.trim().length > 150) {
    errors.push('Subject cannot exceed 150 characters.');
  }

  // Message validation
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Please write a message with at least 10 characters.');
  } else if (message.trim().length > 3000) {
    errors.push('Message cannot exceed 3000 characters.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
      message: errors[0]
    });
  }

  // Attach sanitized fields to req.sanitizedBody
  req.sanitizedBody = {
    name: name.trim().replace(/<[^>]*>?/gm, ''),
    email: email.trim().toLowerCase(),
    subject: subject.trim().replace(/<[^>]*>?/gm, ''),
    message: message.trim().replace(/<[^>]*>?/gm, ''),
    ipAddress: ip
  };

  next();
}

module.exports = {
  validateContactSubmission
};

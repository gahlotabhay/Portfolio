/**
 * Contact Form Module
 * Handles client-side validation, honeypot anti-spam, and API submission
 */

(function () {
  'use strict';

  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const statusAlert = document.getElementById('form-status-alert');

    // Honeypot spam trap
    const hpInput = document.getElementById('website_hp');

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Clear previous error messages
      clearErrors();

      // Client-side validations
      let isValid = true;

      // 1. Name validation
      if (!nameInput.value || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      // 2. Email validation
      if (!emailInput.value || !EMAIL_REGEX.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address.');
        isValid = false;
      }

      // 3. Subject validation
      if (!subjectInput.value || subjectInput.value.trim().length < 3) {
        showFieldError(subjectInput, 'Please enter a subject (at least 3 characters).');
        isValid = false;
      }

      // 4. Message validation
      if (!messageInput.value || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Please write a message of at least 10 characters.');
        isValid = false;
      }

      if (!isValid) return;

      // Anti-spam check
      if (hpInput && hpInput.value.trim() !== '') {
        showAlert('success', 'Thank you! Your message has been received.');
        contactForm.reset();
        return;
      }

      // Set Loading State
      setLoading(true);

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        website_hp: hpInput ? hpInput.value : ''
      };

      try {
        // Submit to Backend API (supports both same-host and local Express server on port 5000)
        let apiUrl = '/api/contact';
        if (window.location.protocol === 'file:') {
          apiUrl = 'http://localhost:5000/api/contact';
        }

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showAlert('success', result.message || 'Thank you! Your message has been sent to Abhay.');
          contactForm.reset();
        } else {
          showAlert('error', result.message || 'Unable to deliver message. Please contact abhaygahlot100@gmail.com.');
        }
      } catch (err) {
        console.warn('API submission error:', err);
        // Resilient message explaining backend connection
        showAlert('error', 'Cannot connect to backend server right now. You can email Abhay directly at abhaygahlot100@gmail.com.');
      } finally {
        setLoading(false);
      }
    });

    function showFieldError(inputEl, message) {
      inputEl.classList.add('error');
      const errorMsgEl = inputEl.parentElement.querySelector('.field-error-msg');
      if (errorMsgEl) {
        errorMsgEl.textContent = message;
        errorMsgEl.classList.add('visible');
      }
    }

    function clearErrors() {
      const inputs = [nameInput, emailInput, subjectInput, messageInput];
      inputs.forEach(input => {
        if (input) {
          input.classList.remove('error');
          const err = input.parentElement.querySelector('.field-error-msg');
          if (err) err.classList.remove('visible');
        }
      });
      if (statusAlert) {
        statusAlert.className = 'form-status-alert';
        statusAlert.style.display = 'none';
      }
    }

    function showAlert(type, message) {
      if (!statusAlert) return;
      statusAlert.className = `form-status-alert ${type}`;
      statusAlert.innerHTML = `
        <span class="alert-icon">${type === 'success' ? '✓' : '⚠️'}</span>
        <span class="alert-text">${escapeHtml(message)}</span>
      `;
      statusAlert.style.display = 'flex';
      statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function setLoading(isLoading) {
      if (!submitBtn) return;
      if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="btn-spinner"></span>
          <span>Transmitting Message...</span>
        `;
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        `;
      }
    }

    function escapeHtml(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  });
})();

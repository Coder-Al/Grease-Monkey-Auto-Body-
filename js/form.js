/**
 * quote-form.js - Handles the quote request form on quote.html
 * 
 * Dependencies: utils.js (escapeHtml, isValidEmail, isValidPhone, showMessage)
 */

(function() {
  document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('estimateForm');
    if (!form) return;
    
    // Get all form fields for validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const damageTypeSelect = document.getElementById('damageType');
    const messageTextarea = document.getElementById('message');
    const agreeCheckbox = document.getElementById('agreeTerms');
    
    // Helper to show error under a field
    function showFieldError(field, message) {
      // Remove existing error
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();
      
      // Add error class to field
      field.classList.add('error');
      
      // Add error message
      const errorDiv = document.createElement('span');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      field.parentElement.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
      field.classList.remove('error');
      const existingError = field.parentElement.querySelector('.error-message');
      if (existingError) existingError.remove();
    }
    
    function clearAllErrors() {
      [nameInput, emailInput, phoneInput, damageTypeSelect, messageTextarea].forEach(field => {
        if (field) clearFieldError(field);
      });
    }
    
    // Real-time validation (clear errors as user types)
    if (nameInput) nameInput.addEventListener('input', () => clearFieldError(nameInput));
    if (emailInput) emailInput.addEventListener('input', () => clearFieldError(emailInput));
    if (phoneInput) phoneInput.addEventListener('input', () => clearFieldError(phoneInput));
    if (damageTypeSelect) damageTypeSelect.addEventListener('change', () => clearFieldError(damageTypeSelect));
    if (messageTextarea) messageTextarea.addEventListener('input', () => clearFieldError(messageTextarea));
    
    // Form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      clearAllErrors();
      
      let isValid = true;
      
      // Get values
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const damageType = damageTypeSelect.value;
      const message = messageTextarea.value.trim();
      const carModel = document.getElementById('carModel').value.trim();
      const preferredContact = document.querySelector('input[name="preferredContact"]:checked')?.value || 'phone';
      const agreed = agreeCheckbox.checked;
      
      // Validate name
      if (!name) {
        showFieldError(nameInput, 'Please enter your full name');
        isValid = false;
      }
      
      // Validate email
      if (!email) {
        showFieldError(emailInput, 'Please enter your email address');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address (e.g., name@example.com)');
        isValid = false;
      }
      
      // Validate phone
      if (!phone) {
        showFieldError(phoneInput, 'Please enter your phone number');
        isValid = false;
      } else if (!isValidPhone(phone)) {
        showFieldError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
      }
      
      // Validate damage type
      if (!damageType) {
        showFieldError(damageTypeSelect, 'Please select the type of damage');
        isValid = false;
      }
      
      // Validate message
      if (!message) {
        showFieldError(messageTextarea, 'Please describe the damage or service needed');
        isValid = false;
      } else if (message.length < 10) {
        showFieldError(messageTextarea, 'Please provide more detail (at least 10 characters)');
        isValid = false;
      }
      
      // Validate agreement
      if (!agreed) {
        alert('Please agree to be contacted regarding your estimate request');
        isValid = false;
      }
      
      if (!isValid) return;
      
      // Collect form data
      const formData = {
        name: name,
        email: email,
        phone: phone,
        carModel: carModel,
        damageType: damageType,
        message: message,
        preferredContact: preferredContact,
        timestamp: new Date().toLocaleString()
      };
      
      // Save to localStorage for thank-you page
      localStorage.setItem('estimateRequest', JSON.stringify(formData));
      
      // Visual feedback on button
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending... ✓';
      submitBtn.classList.add('success');
      submitBtn.disabled = true;
      
      // Simulate sending (in production, replace with actual fetch)
      setTimeout(() => {
        console.log('Form data saved:', formData);
        window.location.href = 'thank-you.html';
      }, 500);
    });
    
  });
})();
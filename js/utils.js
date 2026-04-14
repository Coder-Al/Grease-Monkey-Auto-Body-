/**
 * utils.js - Shared utility functions used across multiple scripts
 */

// Prevent XSS attacks by escaping HTML special characters
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Show alert message (can be customized later for better UI)
function showMessage(message, isError = true) {
  alert(message); // Simple for now, can upgrade to toast notifications
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (Bahamas-friendly)
function isValidPhone(phone) {
  const phoneRegex = /^[0-9\-\+\(\)\s]{7,20}$/;
  return phoneRegex.test(phone);
}
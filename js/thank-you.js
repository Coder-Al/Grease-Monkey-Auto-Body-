/**
 * thankyou.js - Displays submitted form data on thank-you page
 * 
 * Dependencies: utils.js (escapeHtml)
 */

document.addEventListener('DOMContentLoaded', () => {
  const savedData = localStorage.getItem('estimateRequest');
  const summaryDiv = document.getElementById('requestSummary');
  
  if (savedData && summaryDiv) {
    const formData = JSON.parse(savedData);
    
    // Map damage type to readable format
    const damageTypeMap = {
      'collision': 'Collision / Accident',
      'dent': 'Dent / Ding',
      'scratch': 'Scratch / Paint damage',
      'bumper': 'Bumper damage',
      'frame': 'Frame damage',
      'other': 'Other / Not sure'
    };
    
    const damageTypeReadable = damageTypeMap[formData.damageType] || formData.damageType;
    const preferredContactMap = {
      'phone': '📞 Phone call',
      'whatsapp': '💬 WhatsApp',
      'email': '✉️ Email'
    };
    const preferredContactReadable = preferredContactMap[formData.preferredContact] || formData.preferredContact;
    
    summaryDiv.innerHTML = `
      <p><strong>📋 Request summary:</strong></p>
      <p><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(formData.phone)}</p>
      ${formData.carModel ? `<p><strong>Car:</strong> ${escapeHtml(formData.carModel)}</p>` : ''}
      <p><strong>Damage type:</strong> ${escapeHtml(damageTypeReadable)}</p>
      <p><strong>Message:</strong> ${escapeHtml(formData.message)}</p>
      <p><strong>Preferred contact:</strong> ${escapeHtml(preferredContactReadable)}</p>
      <p><strong>Submitted:</strong> ${escapeHtml(formData.timestamp)}</p>
    `;
    
    // Optional: Clear localStorage after displaying
    // localStorage.removeItem('estimateRequest');
    
  } else if (summaryDiv) {
    summaryDiv.innerHTML = `
      <p>⚠️ We didn't receive any request details. Please go back and submit the form.</p>
      <p style="margin-top: 12px;"><a href="quote.html" class="btn btn-primary" style="display: inline-block;">← Request a quote</a></p>
    `;
  }
});
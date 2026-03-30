const API_URL = 'http://localhost:5000';

let selectedService = null;

// Handle package selection
document.addEventListener('DOMContentLoaded', () => {
  const selectButtons = document.querySelectorAll('.select-package-btn');
  selectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.package-card');
      selectedService = card.dataset.package;
      updateSelectedPackageInfo(selectedService, card.querySelector('h3').textContent);
      goToStep(2);
      const notesField = document.getElementById('bookingNotes');
      if (notesField) {
        notesField.focus();
      }
    });
  });
});

function updateSelectedPackageInfo(service, name) {
  const infoDiv = document.getElementById('selectedPackageInfo');
  if (infoDiv) {
    infoDiv.innerHTML = `<p><strong>Selected Package:</strong> ${name}</p>`;
  }
}

function submitBooking() {
    alert('Booking functionality is disabled.');
}

function showBookingMessage(msg, type) {
    const msgDiv = document.getElementById('bookingMessage');
    if (msgDiv) {
        msgDiv.textContent = msg;
        msgDiv.className = `message ${type}`;
        msgDiv.style.display = 'block';
    }
}

// Add CSS for message and form styles
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 5px;
      font-size: 14px;
      font-family: inherit;
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group textarea {
      min-height: 120px;
      resize: vertical;
    }

    .message {
      padding: 12px;
      margin-bottom: 20px;
      border-radius: 5px;
      display: none;
    }

    .message.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .confirmation-box {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }

    .confirmation-box h3 {
      font-size: 24px;
      color: #28a745;
      margin-bottom: 20px;
    }

    .confirmation-box p {
      font-size: 16px;
      color: #666;
      margin-bottom: 30px;
    }

    .button-group {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .button-group button {
      padding: 12px 24px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .next-btn, .pay-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .next-btn:hover, .pay-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .next-btn:disabled, .pay-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .back-btn {
      background: #6c757d;
      color: white;
    }

    .back-btn:hover {
      background: #5a6268;
    }
  `;
  document.head.appendChild(style);
});

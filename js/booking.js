// ============================================
// Booking Page - Multi-Step Form
// ============================================

let selectedPackage = {
    name: '',
    price: 0
};

// Step Navigation
function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.booking-section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected step
    document.getElementById(`step${stepNumber}`).classList.remove('hidden');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index < stepNumber) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Package Selection

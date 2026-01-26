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
document.addEventListener('DOMContentLoaded', function() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        const selectBtn = card.querySelector('.select-package-btn');
        
        if (selectBtn) {
            selectBtn.addEventListener('click', function() {
                const packageName = card.dataset.package;
                const packagePrice = card.dataset.price;
                const packageTitle = card.querySelector('h3').textContent;
                
                // Store selected package
                selectedPackage = {
                    name: packageName,
                    title: packageTitle,
                    price: parseFloat(packagePrice)
                };
                
                // Update selected package info
                updateSelectedPackageInfo();
                
                // Update payment summary
                updatePaymentSummary();
                
                // Move to step 2
                goToStep(2);
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });
    

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
    
    // Initialize first step
    goToStep(1);
});

// Update Selected Package Info
function updateSelectedPackageInfo() {
    const infoDiv = document.getElementById('selectedPackageInfo');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <h3>Selected Package</h3>
            <p><strong>${selectedPackage.title}</strong> - $${selectedPackage.price.toFixed(2)}</p>
        `;
    }
}

// Update Payment Summary
function updatePaymentSummary() {
    const summaryPackage = document.getElementById('summaryPackage');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryTotal = document.getElementById('summaryTotal');
    
    if (summaryPackage && summaryAmount && summaryTotal) {
        summaryPackage.textContent = selectedPackage.title;
        summaryAmount.textContent = `$${selectedPackage.price.toFixed(2)}`;
        summaryTotal.textContent = `$${selectedPackage.price.toFixed(2)}`;
    }
}

// ============================================
// Stripe Payment Integration (Demo)
// ============================================

// Initialize Stripe (you need to add your publishable key)
// const stripe = Stripe('your_publishable_key_here');

document.addEventListener('DOMContentLoaded', function() {
    const payButton = document.getElementById('payButton');
    
    if (payButton) {
        payButton.addEventListener('click', async function() {
            const paymentMessage = document.getElementById('payment-message');
            
            // Validate form fields (demo validation)
            const cardName = document.getElementById('cardName')?.value;
            const cardNumber = document.getElementById('cardNumber')?.value;
            const expiry = document.getElementById('expiry')?.value;
            const cvc = document.getElementById('cvc')?.value;
            
            if (!cardName || !cardNumber || !expiry || !cvc) {
                paymentMessage.textContent = 'Please fill in all payment details.';
                paymentMessage.className = 'payment-message error';
                return;
            }
            
            // Show processing state
            payButton.disabled = true;
            payButton.textContent = 'Processing...';
            
            // Simulate payment processing (2 seconds)
            setTimeout(() => {
                // This is where you would normally process the payment with Stripe
                // For demo purposes, we'll just show a success message
                
                paymentMessage.innerHTML = `
                    <strong>✓ Payment Successful!</strong><br>
                    Your booking has been confirmed. You will receive a confirmation email shortly.
                    <br><br>
                    <strong>Note:</strong> This is a demo. To process real payments, integrate with Stripe API:
                    <br>1. Add your Stripe publishable key
                    <br>2. Create a server endpoint to handle payment intents
                    <br>3. Use Stripe Elements for secure card input
                `;
                paymentMessage.className = 'payment-message success';
                
                payButton.textContent = 'Payment Complete';
                
                // Redirect to home page after 5 seconds
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 5000);
            }, 2000);
        });
    }
});

// ============================================
// Calendly Integration Helper
// ============================================

// Calendly will automatically initialize if you have the correct data-url
// You can listen to Calendly events like this:

function isCalendlyEvent(e) {
    return e.data.event && e.data.event.indexOf('calendly') === 0;
}

window.addEventListener('message', function(e) {
    if (isCalendlyEvent(e)) {
        // Calendly event detected
        if (e.data.event === 'calendly.event_scheduled') {
            console.log('Event scheduled:', e.data);
            
            // Show a success message or move to next step
            const selectedInfo = document.getElementById('selectedPackageInfo');
            if (selectedInfo) {
                selectedInfo.innerHTML += `
                    <div style="margin-top: 1rem; padding: 1rem; background-color: #d4edda; color: #155724; border-radius: 5px;">
                        <strong>✓ Session Scheduled!</strong> Please proceed to payment.
                    </div>
                `;
            }
        }
    }
});

// ============================================
// Form Validation Helpers
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

function validateCardNumber(number) {
    const re = /^\d{13,19}$/;
    return re.test(number.replace(/\s/g, ''));
}

function validateExpiry(expiry) {
    const re = /^\d{2}\/\d{2}$/;
    return re.test(expiry);
}

function validateCVC(cvc) {
    const re = /^\d{3,4}$/;
    return re.test(cvc);
}

// ============================================
// Auto-format Card Number Input
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
    
    // Auto-format expiry date
    const expiryInput = document.getElementById('expiry');
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }
});

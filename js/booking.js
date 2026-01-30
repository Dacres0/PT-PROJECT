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
    
    // Initialize Stripe Elements when payment step is shown
    if (stepNumber === 3) {
        console.log('Step 3 shown, initializing Stripe Elements...');
        setTimeout(() => {
            initializeStripeElements();
        }, 100); // Small delay to ensure DOM is ready
    }
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
// Stripe Payment Integration
// ============================================

// Initialize Stripe with your publishable key
let stripe, elements;

function initializeStripe() {
    if (typeof Stripe === 'undefined') {
        console.error('Stripe.js not loaded');
        return false;
    }
    
    if (!stripe) {
        stripe = Stripe('pk_test_51SvEz32fcEfe23Qiz4yDdvTfuHhNZm4Q8EBrR7Xnn98LDuntj3XS9zqC4oN4gZ1YSrekvt1PnNk4ZiaODQeS1n7100UeD3FkhB');
        elements = stripe.elements();
    }
    return true;
}

// Initialize Stripe Elements
function initializeStripeElements() {
    // Ensure Stripe is initialized
    if (!initializeStripe()) {
        console.error('Cannot initialize Stripe Elements - Stripe.js not available');
        return;
    }
    
    const paymentElement = document.getElementById('payment-element');
    if (!paymentElement) {
        console.error('Payment element not found');
        return;
    }
    
    // Check if already initialized
    if (window.paymentElement) {
        return; // Already initialized
    }
    
    try {
        // Create and mount the Card Element
        const cardElement = elements.create('card');
        cardElement.mount('#payment-element');
        
        // Store reference for later use
        window.paymentElement = cardElement;
        
        console.log('Stripe Elements initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Stripe Elements:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if step 3 is currently visible (in case of page refresh)
    const step3 = document.getElementById('step3');
    if (step3 && !step3.classList.contains('hidden')) {
        setTimeout(() => {
            initializeStripeElements();
        }, 100);
    }
    
    const payButton = document.getElementById('payButton');
    
    if (payButton) {
        payButton.addEventListener('click', async function() {
            const paymentMessage = document.getElementById('payment-message');
            
            // Check if Stripe Elements is initialized, if not, try to initialize
            if (!window.paymentElement) {
                if (!initializeStripe()) {
                    paymentMessage.textContent = 'Stripe.js not loaded. Please check your internet connection.';
                    paymentMessage.className = 'payment-message error';
                    return;
                }
                
                initializeStripeElements();
                
                // Wait a bit for initialization
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (!window.paymentElement) {
                    paymentMessage.textContent = 'Payment system failed to initialize. Please refresh the page.';
                    paymentMessage.className = 'payment-message error';
                    return;
                }
            }
            
            // Show processing state
            payButton.disabled = true;
            payButton.textContent = 'Processing...';
            
            try {
                // In a real implementation, you would create a payment intent on your server
                // For demo purposes, we'll simulate the process
                
                paymentMessage.innerHTML = `
                    <strong>✓ Stripe Integration Active!</strong><br>
                    Your Stripe key has been successfully added.<br><br>
                    <strong>Next Steps for Full Integration:</strong><br>
                    1. Set up a server-side endpoint to create payment intents<br>
                    2. Handle the payment confirmation on the server<br>
                    3. Process the payment securely<br><br>
                    For testing, you can use Stripe's test card numbers:<br>
                    • 4242 4242 4242 4242 (success)<br>
                    • 4000 0000 0000 0002 (decline)
                `;
                paymentMessage.className = 'payment-message success';
                
                payButton.textContent = 'Integration Complete';
                
            } catch (error) {
                paymentMessage.textContent = `Payment failed: ${error.message}`;
                paymentMessage.className = 'payment-message error';
                payButton.disabled = false;
                payButton.textContent = 'Complete Payment';
            }
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

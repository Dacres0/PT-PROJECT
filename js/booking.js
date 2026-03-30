// ============================================
// Booking Page - Multi-Step Form
// ============================================

let selectedPackage = {
    name: '',
    price: 0,
    title: ''
};

const STRIPE_PAYMENT_LINKS = {
    'single-session': 'https://buy.stripe.com/test_9B69AMeZu2uc0gu7uJb3q01',
    '4-pack': 'https://buy.stripe.com/test_28E9AM9Fa1q8bZc3etb3q00',
    '8-pack': 'https://buy.stripe.com/test_9B600c9Fagl2fbo2apb3q02',
    '12-pack': 'https://buy.stripe.com/test_4gM6oA2cI4Ck9R45mBb3q03'
};

const STRIPE_PAYMENT_LINKS_BY_PRICE = {
    '60': 'https://buy.stripe.com/test_9B69AMeZu2uc0gu7uJb3q01',
    '220': 'https://buy.stripe.com/test_28E9AM9Fa1q8bZc3etb3q00',
    '380': 'https://buy.stripe.com/test_9B600c9Fagl2fbo2apb3q02',
    '540': 'https://buy.stripe.com/test_4gM6oA2cI4Ck9R45mBb3q03'
};

const BOOKING_NOTES_STORAGE_KEY = 'ptparksBookingNotes';

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
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index === stepNumber - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
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
                // Check if user is logged in
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                
                if (!currentUser) {
                    // User not logged in - show info message only
                    alert('To book a session, you need login credentials.\n\nPlease email Jack to request a username and password.');
                    window.location.href = 'contact.html';
                    return;
                }

                // User is logged in, proceed with booking
                const packageName = card.dataset.package;
                const packagePrice = card.dataset.price;
                const packageTitle = card.querySelector('h3').textContent;

                // Store selected package
                selectedPackage = {
                    name: packageName,
                    title: packageTitle,
                    price: parseFloat(packagePrice)
                };

                console.log('Package selected:', selectedPackage);

                // Update selected package info
                updateSelectedPackageInfo();

                // Move to step 2
                goToStep(2);

                // Show Calendly widget
                showCalendlyWidget();

                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    });
});

// Update selected package info display
function updateSelectedPackageInfo() {
    const infoDiv = document.getElementById('selectedPackageInfo');
    if (infoDiv && selectedPackage.title) {
        infoDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 30px; text-align: center;">
                <h3 style="margin: 0 0 10px 0; font-size: 24px;">Selected Package: ${selectedPackage.title}</h3>
                <p style="margin: 0; font-size: 28px; font-weight: 600;">Â£${selectedPackage.price}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Schedule your session using the calendar below</p>
            </div>
        `;
    }

    restoreBookingNotes();
}

function getNotesField() {
    return document.getElementById('bookingNotes');
}

function getStoredBookingNotes() {
    return sessionStorage.getItem(BOOKING_NOTES_STORAGE_KEY) || '';
}

function saveBookingNotes(showMessage = true) {
    const notesField = getNotesField();
    const messageDiv = document.getElementById('bookingMessage');

    if (!notesField) {
        return;
    }

    const notesValue = notesField.value.trim();
    sessionStorage.setItem(BOOKING_NOTES_STORAGE_KEY, notesValue);

    if (messageDiv && showMessage) {
        if (notesValue) {
            showBookingMessage('Additional notes saved successfully.', 'success');
        } else {
            showBookingMessage('Notes cleared.', 'success');
        }
    }
}

function restoreBookingNotes() {
    const notesField = getNotesField();
    if (!notesField) {
        return;
    }

    notesField.value = getStoredBookingNotes();
}

// Show Calendly Widget
function showCalendlyWidget() {
    console.log('showCalendlyWidget called');
    
    // Calendly URL for PT Parkes
    const calendlyUrl = 'https://calendly.com/danielacres-dev/30min';
    
    // Get or create Calendly container
    let calendlyContainer = document.getElementById('calendly-widget-container');
    
    if (!calendlyContainer) {
        console.log('Creating Calendly container');
        // Create container in step2
        const step2Container = document.querySelector('#step2 .container');
        if (step2Container) {
            calendlyContainer = document.createElement('div');
            calendlyContainer.id = 'calendly-widget-container';
            calendlyContainer.style.cssText = 'min-width:320px;height:700px;margin: 30px auto;max-width:900px;background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);';
            
            // Insert after the selected package info
            const packageInfo = document.getElementById('selectedPackageInfo');
            if (packageInfo) {
                packageInfo.parentNode.insertBefore(calendlyContainer, packageInfo.nextSibling);
            } else {
                step2Container.appendChild(calendlyContainer);
            }
        } else {
            console.error('step2 container not found');
            return;
        }
    }
    
    // Clear any existing content
    calendlyContainer.innerHTML = '';
    
    // Initialize Calendly widget
    if (typeof Calendly !== 'undefined') {
        console.log('Initializing Calendly widget');
        Calendly.initInlineWidget({
            url: calendlyUrl,
            parentElement: calendlyContainer,
            prefill: {},
            utm: {
                utmSource: 'PT Parkes Website',
                utmMedium: 'Booking Page',
                utmCampaign: selectedPackage.name
            }
        });
        console.log('Calendly widget initialized successfully');
    } else {
        console.error('Calendly is not loaded yet. Retrying in 1 second...');
        setTimeout(showCalendlyWidget, 1000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const saveNotesBtn = document.getElementById('saveNotesBtn');
    const notesField = getNotesField();

    if (notesField) {
        restoreBookingNotes();
        notesField.addEventListener('input', function() {
            const messageDiv = document.getElementById('bookingMessage');
            if (messageDiv) {
                messageDiv.style.display = 'none';
            }
        });
    }

    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', function() {
            saveBookingNotes(true);
        });
    }
});

// User Login Dropdown Functions
function toggleUserLogin() {
    const overlay = document.getElementById('userLoginOverlay');
    const dropdown = document.getElementById('userLoginDropdown');
    const isActive = dropdown.classList.contains('active');

    if (isActive) {
        overlay.classList.remove('active');
        dropdown.classList.remove('active');
    } else {
        overlay.classList.add('active');
        dropdown.classList.add('active');
        document.getElementById('userUsername').focus();
    }
}

function closeUserLogin() {
    document.getElementById('userLoginOverlay').classList.remove('active');
    document.getElementById('userLoginDropdown').classList.remove('active');
    document.getElementById('userError').style.display = 'none';
}

function userLogin() {
    const username = document.getElementById('userUsername').value.trim();
    const password = document.getElementById('userPassword').value;
    const errorDiv = document.getElementById('userError');

    errorDiv.style.display = 'none';

    const usersStr = localStorage.getItem('users');
    if (!usersStr) {
        errorDiv.textContent = 'No users found.';
        errorDiv.style.display = 'block';
        return;
    }

    const users = JSON.parse(usersStr);
    const user = users.find(u => u.username === username && u.role === 'user');

    if (!user || user.password !== password) {
        errorDiv.textContent = 'Invalid credentials';
        errorDiv.style.display = 'block';
        return;
    }

    const token = btoa(user.id + ':' + Date.now());
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }));

    closeUserLogin();
    document.getElementById('loginNotice').style.display = 'none';
    alert('Welcome back, ' + user.username + '!');
}

function submitBooking() {
    if (!selectedPackage.name) {
        alert('Please select a package first.');
        goToStep(1);
        return;
    }

    saveBookingNotes(false);

    const notes = getStoredBookingNotes() || 'None';
    const bookingDetails = document.getElementById('bookingDetails');

    if (bookingDetails) {
        bookingDetails.innerHTML = `
            <div class="booking-details-card">
                <div class="booking-details-row">
                    <span>Package</span>
                    <strong>${selectedPackage.title}</strong>
                </div>
                <div class="booking-details-row booking-details-total">
                    <span>Amount</span>
                    <strong>£${selectedPackage.price}</strong>
                </div>
                <div class="booking-details-notes">
                    <span>Additional Notes</span>
                    <p>${notes}</p>
                </div>
            </div>
        `;
    }

    goToStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startStripeCheckout() {
    if (!selectedPackage.name) {
        alert('Please select a package first.');
        goToStep(1);
        return;
    }

    const packageKey = String(selectedPackage.name || '').trim().toLowerCase();
    const priceKey = String(selectedPackage.price || '').trim();
    const paymentLink = STRIPE_PAYMENT_LINKS[packageKey] || STRIPE_PAYMENT_LINKS_BY_PRICE[priceKey];

    if (paymentLink) {
        window.location.href = paymentLink;
        return;
    }

    alert('Stripe payment link is not configured for this package yet. Please check package key: ' + packageKey + ' and price: ' + priceKey + '.');
}

// ============================================
// Navigation - Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ============================================
// Carousel Functionality
// ============================================
let currentSlideIndex = 0;
let autoSlideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slides.length) return;
    
    // Wrap around
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide and indicator
    slides[currentSlideIndex].classList.add('active');
    if (indicators[currentSlideIndex]) {
        indicators[currentSlideIndex].classList.add('active');
    }
}

function moveSlide(direction) {
    clearInterval(autoSlideInterval);
    showSlide(currentSlideIndex + direction);
    startAutoSlide();
}

function currentSlide(index) {
    clearInterval(autoSlideInterval);
    showSlide(index);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showSlide(currentSlideIndex + 1);
    }, 6000); // Change slide every 6 seconds
}

// Initialize carousel if it exists on the page
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        showSlide(0);
        startAutoSlide();
        
        // Pause auto-slide on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});

// ============================================
// Contact Form Handling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            const formMessage = document.getElementById('formMessage');
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }, 5000);
        });
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Scroll to Top Button (Optional Enhancement)
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// Home Page AI Chatbot - Jack Parkes
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (!chatbotToggle || !chatbotPanel || !chatbotForm || !chatbotInput || !chatbotMessages) {
        return;
    }

    const assistantName = 'Jack Parkes';

    function addMessage(sender, text) {
        const message = document.createElement('div');
        message.className = `chatbot-message ${sender}`;
        message.textContent = text;
        chatbotMessages.appendChild(message);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function openChat() {
        chatbotPanel.hidden = false;
        chatbotToggle.setAttribute('aria-expanded', 'true');
        chatbotInput.focus();
    }

    function closeChat() {
        chatbotPanel.hidden = true;
        chatbotToggle.setAttribute('aria-expanded', 'false');
    }

    function generateResponse(userText) {
        const q = userText.toLowerCase().trim();

        if (/(hi|hello|hey|good morning|good afternoon|good evening)/.test(q)) {
            return `Hey! I'm ${assistantName}. Ask me anything about training, nutrition, recovery, or booking your sessions.`;
        }

        if (/(book|booking|session|appointment)/.test(q)) {
            return 'You can book directly from the Book Now page. Pick your preferred session and submit your details, and the team will confirm with you quickly.';
        }

        if (/(price|cost|package|fee|how much)/.test(q)) {
            return 'Pricing depends on your goal, session frequency, and whether you choose 1-to-1 or a package. Use the contact or booking page for a tailored quote.';
        }

        if (/(calorie|nutrition|diet|meal|protein|macro)/.test(q)) {
            return 'For fat loss or muscle gain, focus on calorie targets, protein intake, and consistency. The Calorie Calculator page is a good place to start your daily target.';
        }

        if (/(lose weight|loose weight|weight loss|fat loss|burn fat|slim|slimming|drop weight)/.test(q)) {
            return 'If your goal is weight loss, focus on 3 things: a small calorie deficit, regular strength training, and hitting a daily step target. Keep protein high, avoid extreme diets, and aim to lose weight steadily rather than fast.';
        }

        if (/(muscle|bulk|strength|stronger|hypertrophy)/.test(q)) {
            return 'For muscle and strength, prioritize progressive overload, quality sleep, and protein across the day. Track your lifts weekly and increase gradually.';
        }

        if (/(home workout|train at home|no gym)/.test(q)) {
            return 'Home training can be highly effective. Focus on bodyweight patterns (squat, push, hinge, core), tempo control, and progressive reps/sets each week.';
        }

        if (/(injury|pain|hurt|rehab)/.test(q)) {
            return 'If you have pain or an injury, get medical advice first. Then training can be adapted with safe movement patterns, controlled load, and smart progression.';
        }

        if (/(contact|phone|email|reach)/.test(q)) {
            return 'You can reach PT PARKES through the Contact page. Current details on the site include email info@ptparks.com and phone 07881634160.';
        }

        if (/(thanks|thank you|cheers)/.test(q)) {
            return 'You are very welcome. If you want, I can help you build a simple weekly training plan right now.';
        }

        return `Great question. Here's a practical answer: keep your plan simple, measurable, and consistent for 6-8 weeks, then adjust based on progress. If you want, tell me your goal and I'll suggest a starter plan.`;
    }

    chatbotToggle.addEventListener('click', function() {
        if (chatbotPanel.hidden) {
            openChat();
        } else {
            closeChat();
        }
    });

    if (chatbotClose) {
        chatbotClose.addEventListener('click', closeChat);
    }

    chatbotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userText = chatbotInput.value.trim();
        if (!userText) return;

        addMessage('user', userText);
        chatbotInput.value = '';

        setTimeout(() => {
            const response = generateResponse(userText);
            addMessage('bot', response);
        }, 350);
    });

    addMessage('bot', `Hi, I'm ${assistantName}, your AI fitness assistant. Ask me anything and I'll help you get started.`);
});

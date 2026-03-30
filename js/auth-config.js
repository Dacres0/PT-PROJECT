// Authentication system using localStorage
const AUTH_CONFIG = {};

function isLoggedIn() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');
    return !!(token && user);
}

function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

function getAuthToken() {
    return localStorage.getItem('authToken');
}

function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    window.location.reload();
}

function protectPage() {
    // Allow viewing but require login for booking actions
    // This is handled in booking.js
}

function protectAdminPage() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        alert('Admin access required');
        window.location.reload();
    }
}

// Add logout button to navbar if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    const navMenu = document.querySelector('.nav-menu');
    
    if (user && navMenu) {
        // Remove "Book Now" if user needs to be authenticated
        // Add logout button
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" id="logoutLink" style="color: #e74c3c; font-weight: 600;">Logout (${user.username})</a>`;
        navMenu.appendChild(logoutLi);
        
        document.getElementById('logoutLink').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});



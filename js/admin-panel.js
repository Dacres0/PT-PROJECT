// Admin Panel - Local Storage Based
// This version works without a backend server

// Initialize sample data if not exists
function initializeSampleData() {
    if (!localStorage.getItem('bookings')) {
        const sampleBookings = [
            {
                id: '1',
                username: 'John Doe',
                email: 'john@example.com',
                service: 'Single Session',
                date: '2026-03-20',
                time: '10:00 AM',
                status: 'confirmed',
                price: 60,
                createdAt: new Date('2026-03-10').toISOString()
            },
            {
                id: '2',
                username: 'Jane Smith',
                email: 'jane@example.com',
                service: '5 Session Package',
                date: '2026-03-22',
                time: '2:00 PM',
                status: 'pending',
                price: 275,
                createdAt: new Date('2026-03-12').toISOString()
            },
            {
                id: '3',
                username: 'Mike Johnson',
                email: 'mike@example.com',
                service: '10 Session Package',
                date: '2026-03-25',
                time: '4:00 PM',
                status: 'confirmed',
                price: 500,
                createdAt: new Date('2026-03-13').toISOString()
            }
        ];
        localStorage.setItem('bookings', JSON.stringify(sampleBookings));
    }

    if (!localStorage.getItem('users')) {
        const sampleUsers = [
            {
                id: '1',
                username: 'john_doe',
                password: 'password123',
                email: 'john@example.com',
                role: 'user',
                createdAt: new Date('2026-01-15').toISOString()
            },
            {
                id: '2',
                username: 'jane_smith',
                password: 'password123',
                email: 'jane@example.com',
                role: 'user',
                createdAt: new Date('2026-02-20').toISOString()
            },
            {
                id: '3',
                username: 'admin',
                password: 'admin123',
                email: 'admin@ptparkes.com',
                role: 'admin',
                createdAt: new Date('2026-01-01').toISOString()
            }
        ];
        localStorage.setItem('users', JSON.stringify(sampleUsers));
    }
}

// Get bookings from localStorage
function getBookings() {
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
}

// Get users from localStorage
function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save bookings to localStorage
function saveBookings(bookings) {
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Save users to localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Load bookings into table
function loadBookingsTable() {
    const tbody = document.getElementById('bookingsTableBody');
    const loading = document.getElementById('bookingsLoading');
    
    if (loading) loading.style.display = 'block';
    
    setTimeout(() => {
        const bookings = getBookings();
        
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (bookings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px; color: #999;">No bookings found</td></tr>';
        } else {
            bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            bookings.forEach(booking => {
                const row = document.createElement('tr');
                const statusColor = booking.status === 'confirmed' ? '#28a745' : booking.status === 'pending' ? '#ffc107' : '#dc3545';
                
                row.innerHTML = `
                    <td>${booking.username}</td>
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td><span style="background: ${statusColor}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">${booking.status.toUpperCase()}</span></td>
                    <td>£${booking.price}</td>
                    <td>
                        <div class="action-btns">
                            ${booking.status === 'pending' ? `<button class="btn btn-small btn-success" onclick="confirmBooking('${booking.id}')">Confirm</button>` : ''}
                            <button class="btn btn-small btn-danger" onclick="deleteBooking('${booking.id}')">Delete</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        if (loading) loading.style.display = 'none';
    }, 300);
}

// Load users into table
function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const loading = document.getElementById('usersLoading');
    
    if (loading) loading.style.display = 'block';
    
    setTimeout(() => {
        const users = getUsers();
        
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 30px; color: #999;">No users found</td></tr>';
        } else {
            users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td><span style="background: ${user.role === 'admin' ? '#667eea' : '#6c757d'}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">${user.role.toUpperCase()}</span></td>
                    <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                        <div class="action-btns">
                            ${user.role !== 'admin' ? `<button class="btn btn-small btn-danger" onclick="deleteUser('${user.id}', '${user.username}')">Delete</button>` : '<span style="color: #999;">Protected</span>'}
                        </div>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
        
        if (loading) loading.style.display = 'none';
    }, 300);
}

// Load statistics
function loadStatistics() {
    const bookings = getBookings();
    const users = getUsers();
    
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0);
    const totalUsers = users.filter(u => u.role !== 'admin').length;
    
    document.getElementById('statTotalBookings').textContent = totalBookings;
    document.getElementById('statConfirmedBookings').textContent = confirmedBookings;
    document.getElementById('statPendingBookings').textContent = pendingBookings;
    document.getElementById('statTotalRevenue').textContent = `£${totalRevenue}`;
    document.getElementById('statTotalUsers').textContent = totalUsers;
}

// Confirm booking
function confirmBooking(bookingId) {
    const bookings = getBookings();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = 'confirmed';
        saveBookings(bookings);
        showNotification('Booking confirmed successfully!', 'success');
        loadBookingsTable();
        loadStatistics();
    }
}

// Delete booking
function deleteBooking(bookingId) {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    const bookings = getBookings();
    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    saveBookings(updatedBookings);
    
    showNotification('Booking deleted successfully!', 'success');
    loadBookingsTable();
    loadStatistics();
}

// Delete user
function deleteUser(userId, username) {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;
    
    const users = getUsers();
    const updatedUsers = users.filter(u => u.id !== userId);
    saveUsers(updatedUsers);
    
    showNotification('User deleted successfully!', 'success');
    loadUsersTable();
    loadStatistics();
}

// Create new user
function createNewUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    
    if (!username || !email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    const users = getUsers();
    
    // Check if username or email already exists
    if (users.some(u => u.username === username)) {
        showNotification('Username already exists', 'error');
        return;
    }
    
    if (users.some(u => u.email === email)) {
        showNotification('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now().toString(),
        username: username,
        password: password,
        email: email,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    showNotification(`User "${username}" created successfully! Password: ${password}`, 'success');
    document.getElementById('createUserForm').reset();
    loadStatistics();
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .btn-success {
        background: #28a745 !important;
    }
    
    .btn-success:hover {
        background: #218838 !important;
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleData();
    loadStatistics();
    loadBookingsTable();
    loadDashboardBookings();
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            
            // Update active states
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            document.getElementById(section).classList.add('active');
            e.target.classList.add('active');
            
            // Load data for the section
            if (section === 'manage-users') {
                loadUsersTable();
            } else if (section === 'view-bookings') {
                loadBookingsTable();
            }
        });
    });
    
    // Create user form
    const createUserForm = document.getElementById('createUserForm');
    if (createUserForm) {
        createUserForm.addEventListener('submit', createNewUser);
    }
    
    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = '../index.html';
            }
        });
    }
});

// Load dashboard recent bookings
function loadDashboardBookings() {
    const tbody = document.getElementById('dashboardTableBody');
    const loading = document.getElementById('dashboardLoading');
    const table = document.getElementById('dashboardTable');
    
    if (loading) loading.style.display = 'block';
    if (table) table.style.display = 'none';
    
    setTimeout(() => {
        const bookings = getBookings();
        const recentBookings = bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        recentBookings.forEach(booking => {
            const row = document.createElement('tr');
            const statusColor = booking.status === 'confirmed' ? '#28a745' : booking.status === 'pending' ? '#ffc107' : '#dc3545';
            
            row.innerHTML = `"
                <td>${booking.username}</td>
                <td>${booking.service}</td>
                <td>${booking.date}</td>
                <td><span style="background: ${statusColor}; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">${booking.status.toUpperCase()}</span></td>
                <td>�${booking.price}</td>
            `;
            tbody.appendChild(row);
        });
        
        if (loading) loading.style.display = 'none';
        if (table) table.style.display = 'table';
    }, 300);
}


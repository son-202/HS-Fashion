document.addEventListener('DOMContentLoaded', () => {
/*---------- UI ELEMENTS ----------*/
    const loggedOutView = document.getElementById('auth-logged-out');
    const loggedInView = document.getElementById('auth-logged-in');
    const logoutBtn = document.getElementById('logout-btn');

/*---------- STATE MANAGEMENT USING LOCALSTORAGE ----------*/
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (isLoggedIn && loggedInView && loggedOutView) {
            loggedOutView.classList.add('hidden');
            loggedInView.classList.remove('hidden');
            loggedInView.classList.add('flex');
        } else if (loggedOutView && loggedInView) {
            loggedOutView.classList.remove('hidden');
            loggedInView.classList.add('hidden');
            loggedInView.classList.remove('flex');
        }
        
/*---------- UPDATE PROFILE DASHBOARD IF ON PROFILE PAGE ----------*/
        if (isLoggedIn && currentUser && window.location.pathname.includes('profile.html')) {
             updateProfileDashboard(currentUser);
        }

/*---------- PROTECT ROUTES ----------*/
        const protectedPages = ['profile.html', 'cart.html'];
        const currentPage = window.location.pathname.split('/').pop();
        if (protectedPages.includes(currentPage) && !isLoggedIn) {
            window.location.href = 'logIn.html';
        }
    }
    
    function updateProfileDashboard(user) {
        const nameEl = document.getElementById('profile-dashboard-name');
        const emailEl = document.getElementById('profile-dashboard-email');
        const welcomeEl = document.getElementById('profile-welcome-name');
        if (nameEl && emailEl && welcomeEl) {
            nameEl.innerText = user.name;
            emailEl.innerText = user.email;
            welcomeEl.innerText = user.name;
        }
    }

/*---------- EVENT LISTENERS ----------*/
    /*---------- LOG OUT ----------*/
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            window.location.href = 'home.html';
        });
    }

    /*---------- PAGE-SPECIFIC LOGIC ----------*/
    const currentPage = window.location.pathname.split('/').pop();

    /*---------- LOGIC FOR HOME.HTML ----------*/
    if (currentPage === 'home.html' || currentPage === '') {
        // Slideshow Logic
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(home) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === home);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        if (slides.length > 0 && prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideShow();
                startSlideShow();
            });
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            });
            
            startSlideShow();
        }

        // Countdown Timer Logic
        const countdownTimer = document.getElementById('countdown-timer');
        if(countdownTimer) {
            // Set the date for the end of the sale (e.g., 3 days from now)
            const countdownDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

            const countdownInterval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownDate - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('days').innerText = days.toString().padStart(2, '0');
                document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
                document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

                if (distance < 0) {
                    clearInterval(countdownInterval);
                    countdownTimer.innerHTML = "<span class='text-red-600 font-bold'>Flash Sale is Over!</span>";
                }
            }, 1000);
        }

        // Category Tabs Logic
        const categoryTabs = document.querySelectorAll('.category-tab-button');
        const categoryContents = document.querySelectorAll('.category-tab-content');

        if (categoryTabs.length > 0) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Deactivate all tabs and content
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    categoryContents.forEach(c => c.classList.remove('active'));

                    // Activate clicked tab and corresponding content
                    tab.classList.add('active');
                    const targetId = `category-${tab.dataset.target}`;
                    const targetContent = document.getElementById(targetId);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }
    }

// Logic for logIn.html
    if (currentPage === 'logIn.html') {
        const loginView = document.getElementById('login-view');
        const registerView = document.getElementById('register-view');
        const showRegisterBtn = document.getElementById('show-register-btn');
        const showLoginBtn = document.getElementById('show-login-btn');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if(showRegisterBtn && showLoginBtn) {
            showRegisterBtn.addEventListener('click', () => {
                loginView.classList.add('hidden');
                registerView.classList.remove('hidden');
            });

            showLoginBtn.addEventListener('click', () => {
                registerView.classList.add('hidden');
                loginView.classList.remove('hidden');
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const errorEl = document.getElementById('login-error');
                errorEl.innerText = ''; // Clear previous errors

                // Validation checks
                if (!email || !password) {
                    errorEl.innerText = 'Please enter both email and password.';
                    return;
                }
                if (!isValidEmail(email)) {
                    errorEl.innerText = 'Please enter a valid email address.';
                    return;
                }
                
                // SIMULATE SUCCESSFUL LOGIN
                const user = { name: 'Nguyen Hoang Son', email: email };
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'profile.html';
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                const errorEl = document.getElementById('register-error');
                errorEl.innerText = ''; // Clear previous errors

                // Validation checks
                if (!name || !email || !password || !confirmPassword) {
                    errorEl.innerText = 'Please fill in all fields.';
                    return;
                }
                if (!isValidEmail(email)) {
                    errorEl.innerText = 'Please enter a valid email address.';
                    return;
                }
                if (password.length <= 6) {
                    errorEl.innerText = 'Password must be longer than 6 characters.';
                    return;
                }
                if (password !== confirmPassword) {
                    errorEl.innerText = 'Passwords do not match.';
                    return;
                }

                // SIMULATE SUCCESSFUL REGISTRATION & LOGIN
                const user = { name: name, email: email };
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'profile.html';
            });
        }
    }
    // --- Initial Load ---
    checkLoginState();

/*---------- LOGIC FOR PROFILE PAGE ----------*/
    if (currentPage === 'profile.html') {
        const profileNav = document.getElementById('profile-nav');
        const navLinks = profileNav.querySelectorAll('.dashboard-nav-link');
        const views = document.querySelectorAll('.profile-view-container');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = link.getAttribute('data-target');
                if (!targetId) return;
                
                navLinks.forEach(l => l.classList.remove('active'));
                views.forEach(v => v.classList.remove('active'));

                link.classList.add('active');
                const targetView = document.getElementById(targetId);
                if (targetView) {
                    targetView.classList.add('active');
                }
            });
        });
    }
});
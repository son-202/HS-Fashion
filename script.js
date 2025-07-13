/*---------- EVENT LISTENERS ----------*/
    /*---------- PAGE-SPECIFIC LOGIC ----------*/
    const currentPage = window.location.pathname.split('/').pop();

    /*---------- LOGIC FOR HOME.HTML ----------*/
    if (currentPage === 'home.html' || currentPage === '') {
        /*---------- SLIDESHOW LOGIC ----------*/
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

        /*---------- COUNTDOWN TIMER LOGIC ----------*/
        const countdownTimer = document.getElementById('countdown-timer');
        if(countdownTimer) {
            /*---------- SET THE DATE FOR THE END OF THE SALE (E.G., 3 DAYS FROM NOW) ----------*/
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
                    countdownTimer.innerHTML = "<span class='text-red-600 font-bold'>Flash Sale is over!</span>";
                }
            }, 1000);
        }

        /*---------- CATEGORY TABS LOGIC ----------*/
        const categoryTabs = document.querySelectorAll('.category-tab-button');
        const categoryContents = document.querySelectorAll('.category-tab-content');

        if (categoryTabs.length > 0) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {     
                    /*---------- DEACTIVE ALL TABS AND CONTENT----------*/
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    categoryContents.forEach(c => c.classList.remove('active'));

                    /*---------- ACTIVE CLICKED TABS AND CONTENT----------*/
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


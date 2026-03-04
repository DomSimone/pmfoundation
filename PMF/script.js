document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    if (carouselSlide) {
        const carouselImages = document.querySelectorAll('.carousel-slide img');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        let counter = 0;
        const size = carouselImages.length > 0 ? carouselImages[0].clientWidth : 0;

        const showImage = (index) => {
            if (carouselImages.length === 0) return;
            carouselSlide.style.transform = 'translateX(' + (-size * index) + 'px)';
        };

        nextBtn.addEventListener('click', () => {
            if (carouselImages.length === 0) return;
            counter++;
            if (counter >= carouselImages.length) {
                counter = 0;
            }
            showImage(counter);
        });

        prevBtn.addEventListener('click', () => {
            if (carouselImages.length === 0) return;
            counter--;
            if (counter < 0) {
                counter = carouselImages.length - 1;
            }
            showImage(counter);
        });

        // Auto-advance the carousel
        setInterval(() => {
            nextBtn.click();
        }, 5000); // Change image every 5 seconds

        // Recalculate size on window resize
        window.addEventListener('resize', () => {
            if (carouselImages.length > 0) {
                size = carouselImages[0].clientWidth;
                showImage(counter);
            }
        });

        // Initial display
        showImage(counter);
    }
});

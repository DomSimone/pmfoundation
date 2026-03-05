document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const carouselSlide = carouselContainer.querySelector('.carousel-slide');
        const carouselImages = carouselContainer.querySelectorAll('.carousel-slide img');
        const prevBtn = carouselContainer.querySelector('.carousel-prev');
        const nextBtn = carouselContainer.querySelector('.carousel-next');

        let counter = 0;
        let size = carouselContainer.clientWidth;

        const showImage = (index) => {
            if (carouselImages.length === 0) return;
            carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            carouselSlide.style.transform = 'translateX(' + (-size * index) + 'px)';
        };

        const updateSize = () => {
            size = carouselContainer.clientWidth;
            // Disable transition for instant resize, then re-enable
            carouselSlide.style.transition = 'none';
            showImage(counter);
            // A small delay before re-enabling transition can prevent glitches
            setTimeout(() => {
                carouselSlide.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
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
        window.addEventListener('resize', updateSize);

        // Initial display
        updateSize();
    }
});

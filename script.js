document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
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
            carouselSlide.style.transition = 'none';
            showImage(counter);
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

        setInterval(() => {
            nextBtn.click();
        }, 5000);

        window.addEventListener('resize', updateSize);
        updateSize();
    }

    // Video grid randomization
    const videoGrid = document.getElementById('videoGrid');
    if (videoGrid) {
        const videos = Array.from(videoGrid.getElementsByClassName('video-item'));

        // Fisher-Yates (aka Knuth) Shuffle
        for (let i = videos.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [videos[i], videos[j]] = [videos[j], videos[i]];
        }

        // Clear the grid and append the shuffled videos
        videoGrid.innerHTML = '';
        videos.forEach(video => videoGrid.appendChild(video));
    }
});

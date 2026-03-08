document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        const carouselSlide = carouselContainer.querySelector('.carousel-slide');
        const carouselImages = carouselContainer.querySelectorAll('.carousel-slide img');
        const prevBtn = carouselContainer.querySelector('.carousel-prev');
        const nextBtn = carouselContainer.querySelector('.carousel-next');
        const fullViewBtn = carouselContainer.querySelector('.carousel-full-view');
        const fullViewModal = document.getElementById('full-view-modal');
        const fullViewImage = document.getElementById('full-view-image');
        const closeBtn = fullViewModal.querySelector('.close-btn');

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

        fullViewBtn.addEventListener('click', () => {
            if (carouselImages.length > 0) {
                fullViewImage.src = carouselImages[counter].src;
                fullViewImage.alt = carouselImages[counter].alt;
                fullViewModal.style.display = 'block';
            }
        });

        closeBtn.addEventListener('click', () => {
            fullViewModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == fullViewModal) {
                fullViewModal.style.display = 'none';
            }
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

    // Article Modal Functionality
    const modal = document.getElementById('article-modal');
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        const closeBtn = modal.querySelector('.close-btn');
        const readMoreBtns = document.querySelectorAll('.read-more-btn');

        readMoreBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const articleItem = e.target.closest('.article-item');
                const title = articleItem.querySelector('h3').textContent;
                const fullContent = articleItem.querySelector('.full-content').innerHTML;

                modalTitle.textContent = title;
                modalBody.innerHTML = fullContent;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});

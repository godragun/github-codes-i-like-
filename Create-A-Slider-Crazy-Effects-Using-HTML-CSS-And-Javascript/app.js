const slides = Array.from(document.querySelectorAll('.carousel .list .item'));
const thumbnails = Array.from(document.querySelectorAll('.carousel .thumbnail .item'));

let currentIndex = 0;
let autoPlayId = null;

const renderSlide = (index) => {
	slides.forEach((slide, i) => {
		slide.classList.toggle('active', i === index);
	});

	thumbnails.forEach((thumb, i) => {
		thumb.classList.toggle('active', i === index);
	});
};

const goToSlide = (index) => {
	currentIndex = (index + slides.length) % slides.length;
	renderSlide(currentIndex);
};

const startAutoplay = () => {
	if (autoPlayId) {
		clearInterval(autoPlayId);
	}

	autoPlayId = setInterval(() => {
		goToSlide(currentIndex + 1);
	}, 4000);
};

thumbnails.forEach((thumb, index) => {
	thumb.addEventListener('click', () => {
		goToSlide(index);
		startAutoplay();
	});
});

renderSlide(currentIndex);
startAutoplay();

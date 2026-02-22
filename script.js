// Main gallery photos (46 images)
const photos = Array.from({ length: 46 }, (_, i) => `${i + 1}.jpg`);
// Slideshow photos (1-4 images in the subfolder)
const featuredPhotos = Array.from({ length: 4 }, (_, i) => `${i + 1}.jpg`);

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Create stacked slideshow container
const featuredDiv = document.createElement('div');
featuredDiv.className = 'featured-photo';

const imgLayerA = document.createElement('img');
const imgLayerB = document.createElement('img');

// Initial state - Pointing to the NEW subfolder
imgLayerA.src = `images/featured-photo/${featuredPhotos[0]}`;
imgLayerA.style.opacity = 1;
imgLayerA.style.zIndex = 2;

imgLayerB.style.opacity = 0;
imgLayerB.style.zIndex = 1;

featuredDiv.appendChild(imgLayerA);
featuredDiv.appendChild(imgLayerB);
const mainTitle = document.querySelector('.main-title');
if (mainTitle) {
    mainTitle.parentNode.insertBefore(featuredDiv, mainTitle.nextSibling);
}

// Tracking variables for slideshow
let currentIndex = 0;
let activeLayer = imgLayerA;
let hiddenLayer = imgLayerB;

// Crossfade Slideshow Logic
setInterval(() => {
    currentIndex = (currentIndex + 1) % featuredPhotos.length;
    const nextSrc = `images/featured-photo/${featuredPhotos[currentIndex]}`;

    hiddenLayer.src = nextSrc;

    hiddenLayer.onload = () => {
        hiddenLayer.style.opacity = 1;
        activeLayer.style.opacity = 0;
        hiddenLayer.style.zIndex = 2;
        activeLayer.style.zIndex = 1;

        [activeLayer, hiddenLayer] = [hiddenLayer, activeLayer];
    };
}, 4000); 

// Slideshow Lightbox
featuredDiv.onclick = () => {
    lightbox.style.display = "block";
    lightboxImg.src = activeLayer.src; 
};

// Render gallery photos (remains in the main images folder)
photos.forEach(fileName => {
    const div = document.createElement('div');
    div.className = 'photo-item';
    
    const img = document.createElement('img');
    img.src = `images/${fileName}`; 
    img.alt = "Portfolio Image";
    img.loading = "lazy";

    img.onclick = () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    };

    div.appendChild(img);
    gallery.appendChild(div);
});

// Lightbox handlers
closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
};

// Close contact card function
function closeContactCard() {
    const card = document.getElementById('floatingCard');
    card.style.display = 'none';
}

// Before and After Slider Logic
const sliderInput = document.querySelector('.slider-input');
const imgBefore = document.querySelector('.img-before');
const sliderHandle = document.querySelector('.slider-handle');

sliderInput.addEventListener('input', (e) => {
    const value = e.target.value + "%";
    
    // Move the clipping layer
    imgBefore.style.width = value;
    
    // Move the white line handle
    sliderHandle.style.left = value;
});

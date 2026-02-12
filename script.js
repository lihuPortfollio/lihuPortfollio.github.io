// Generates ['1.jpg', '2.jpg', ..., '26.jpg']
const photos = Array.from({ length: 26 }, (_, i) => `${i + 1}.jpg`);

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Preload images for smoother slideshow transitions
photos.forEach(src => {
    const img = new Image();
    img.src = `images/${src}`;
});

// Create stacked slideshow container
const featuredDiv = document.createElement('div');
featuredDiv.className = 'photo-item featured-photo';

// Create two layers for the crossfade
const imgLayerA = document.createElement('img');
const imgLayerB = document.createElement('img');

// Initial state
imgLayerA.src = `images/${photos[0]}`;
imgLayerA.style.opacity = 1;
imgLayerA.style.zIndex = 2;

imgLayerB.style.opacity = 0;
imgLayerB.style.zIndex = 1;

featuredDiv.appendChild(imgLayerA);
featuredDiv.appendChild(imgLayerB);
gallery.parentNode.insertBefore(featuredDiv, gallery);

// Tracking variables
let currentIndex = 0;
let activeLayer = imgLayerA;
let hiddenLayer = imgLayerB;

// Crossfade Slideshow Logic
setInterval(() => {
    currentIndex = (currentIndex + 1) % photos.length;
    const nextSrc = `images/${photos[currentIndex]}`;

    hiddenLayer.src = nextSrc;

    hiddenLayer.onload = () => {
        hiddenLayer.style.opacity = 1;
        activeLayer.style.opacity = 0;

        hiddenLayer.style.zIndex = 2;
        activeLayer.style.zIndex = 1;

        [activeLayer, hiddenLayer] = [hiddenLayer, activeLayer];
    };
}, 4000); 

// Lightbox for the slideshow
featuredDiv.onclick = () => {
    lightbox.style.display = "block";
    lightboxImg.src = activeLayer.src; 
};

// Render the rest of the photos in the gallery
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

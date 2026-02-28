// Main gallery photos (13 images in subfolder)
const photosCount = 13;
// Slideshow photos (1-4 images)
const featuredPhotos = Array.from({ length: 4 }, (_, i) => `${i + 1}.jpg`);

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

/* --- Slideshow Logic --- */
const featuredDiv = document.createElement('div');
featuredDiv.className = 'featured-photo';

const imgLayerA = document.createElement('img');
const imgLayerB = document.createElement('img');

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

let currentIndex = 0;
let activeLayer = imgLayerA;
let hiddenLayer = imgLayerB;

setInterval(() => {
    currentIndex = (currentIndex + 1) % featuredPhotos.length;
    hiddenLayer.src = `images/featured-photo/${featuredPhotos[currentIndex]}`;
    hiddenLayer.onload = () => {
        hiddenLayer.style.opacity = 1;
        activeLayer.style.opacity = 0;
        hiddenLayer.style.zIndex = 2;
        activeLayer.style.zIndex = 1;
        [activeLayer, hiddenLayer] = [hiddenLayer, activeLayer];
    };
}, 4000);

featuredDiv.onclick = () => {
    lightbox.style.display = "block";
    lightboxImg.src = activeLayer.src; 
};

/* --- Scattered Gallery Logic --- */
const layoutClasses = [
    ['medium', 'left', 'push-up'], // 1
    ['small', 'right', 'push-down'], // 2
    ['tall', 'center'],         // 3
    ['medium', 'right'],          // 4
    ['small', 'left', 'push-down'], // 5
    ['tall', 'right', 'push-up'],          // 6
    ['diptych-member'], // 7
    ['diptych-member'], // 8 
    ['small', 'right'],           // 9
    ['medium', 'right', 'push-down'],           // 10
    ['small', 'left', 'push-up'],         // 11
    ['wide', 'center', 'stacked-pair'], // 12 
    ['wide', 'center', 'stacked-pair']  // 13 
];

// This loop generates the items and injects them into the empty #gallery
let diptychContainer = null;
let stackedContainer = null;
for (let i = 1; i <= photosCount; i++) {
    const div = document.createElement('div');
    div.classList.add('photo-item', ...layoutClasses[i - 1]);
    
    const img = document.createElement('img');
    
    // Logic for photo 5 from the 'edited' folder
    if (i === 5) {
        img.src = `images/edited/1.jpg`; 
    } else {
        img.src = `images/gallery-photos/${i}.jpg`; 
    }

    img.alt = `Gallery Image ${i}`;
    img.loading = "lazy";
    img.onclick = () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
    };

    div.appendChild(img);

    // Side-by-side pair (7 & 8)
    if (i === 7 || i === 8) {
        if (!diptychContainer) {
            diptychContainer = document.createElement('div');
            diptychContainer.className = 'diptych-row';
            gallery.appendChild(diptychContainer);
        }
        diptychContainer.appendChild(div);
    } 
    // Vertical stacked pair (12 & 13)
    else if (i === 12 || i === 13) {
        if (!stackedContainer) {
            stackedContainer = document.createElement('div');
            stackedContainer.className = 'stacked-column'; 
            gallery.appendChild(stackedContainer);
        }
        stackedContainer.appendChild(div);
    } 
    else {
        gallery.appendChild(div);
    }
}

/* --- UI Handlers --- */
closeBtn.onclick = () => lightbox.style.display = "none";
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = "none";
};

function closeContactCard() {
    document.getElementById('floatingCard').style.display = 'none';
}

/* --- Comparison Slider --- */
const sliderInput = document.querySelector('.slider-input');
const imgBefore = document.querySelector('.img-before');
const sliderHandle = document.querySelector('.slider-handle');

if (sliderInput) {
    sliderInput.addEventListener('input', (e) => {
        const value = e.target.value + "%";
        imgBefore.style.width = value;
        sliderHandle.style.left = value;
    });
}

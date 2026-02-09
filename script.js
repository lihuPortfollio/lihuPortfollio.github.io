const photos = [
    'img1.webp',
    'img2.webp',
    'img3.webp',
    'img4.webp',
    'img5.webp'
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Create the Slideshow Featured Photo
const featuredDiv = document.createElement('div');
featuredDiv.className = 'photo-item featured-photo';
const featuredImg = document.createElement('img');
featuredImg.onclick = () => {
    lightbox.style.display = "block";
    lightboxImg.src = featuredImg.src; 
};
featuredImg.src = `images/${photos[0]}`;
featuredDiv.appendChild(featuredImg);
gallery.parentNode.insertBefore(featuredDiv, gallery);

// Slideshow Timer
let currentIndex = 0;
setInterval(() => {
    currentIndex = (currentIndex + 1) % photos.length;
    featuredImg.style.opacity = 0; 
    
    setTimeout(() => {
        featuredImg.src = `images/${photos[currentIndex]}`;
        featuredImg.style.opacity = 1;
    }, 500); 
}, 3000); 

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

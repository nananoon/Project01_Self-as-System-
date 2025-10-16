// array of image paths
const images = [ 
    'trail/img-1.jpg',
    'trail/img-2.jpg',
    'trail/img-3.jpg',
    'trail/img-4.jpg',
    'trail/img-5.jpg',
    'trail/img-6.jpg',
    'trail/img-7.jpg',
    'trail/img-8.jpg',
    'trail/img-9.jpg',
    'trail/img-10.jpg',
    'trail/img-1.jpg',
    'trail/img-2.jpg',
    'trail/img-3.jpg',
    'trail/img-4.jpg',
    'trail/img-5.jpg',
    'trail/img-6.jpg',
    'trail/img-7.jpg',
    'trail/img-8.jpg',
    'trail/img-9.jpg',
    'trail/img-10.jpg',
];

const container = document.getElementById('container'); 

// track image index and last mouse position
let currentImageIndex = 0;
let lastX = 0;
let lastY = 0;
let distanceThreshold = window.innerWidth < 10 ? 10: 180;  // set distance between images

window.addEventListener("resize", () => {
    distanceThreshold = window.innerWidth < 10 ? 10: 180; 
})
window.addEventListener('mousemove', (e) => {
    // calculate distance change from last pos (x & y)
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > distanceThreshold) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

function createTrail(x, y) {
    const img = document.createElement('img');
    img.classList.add('image-trail');
    img.src = images[currentImageIndex];
    container.appendChild(img);

    currentImageIndex = (currentImageIndex + 1) % images.length;

    gsap.set(img, {
        x: x,
        y: y,
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-20, 20),
    });

    gsap.to(img, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
    });

    gsap.to(img, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power2.in',
        onComplete: () => {
            img.remove();
        },
    });

    
}
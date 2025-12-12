// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Image Slider Functionality - Only on index.html
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (sliderContainer && slides.length > 0) {
    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    // Initialize slider
    function initSlider() {
        updateSlider();
        
        // Auto slide every 5 seconds
        slideInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 25}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Event listeners for slider controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            currentSlide = index;
            updateSlider();
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        });
    });

    // Initialize the slider when page loads
    window.addEventListener('DOMContentLoaded', initSlider);
}

// Data Storage
let courses = JSON.parse(localStorage.getItem('fashionCourses')) || [
    {
        id: 1,
        name: "Fashion Design",
        duration: "12 Months",
        level: "Advanced",
        description: "Master the art of fashion design from concept to creation with our comprehensive program.",
        image: "https://images.unsplash.com/photo-1558769132-cb1f96b8d050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
    },
    {
        id: 2,
        name: "Tailoring & Pattern Making",
        duration: "9 Months",
        level: "Intermediate",
        description: "Learn precision tailoring and pattern making techniques for custom garment creation.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    },
    {
        id: 3,
        name: "Fashion Styling",
        duration: "6 Months",
        level: "Beginner",
        description: "Develop your eye for style and learn to create compelling fashion narratives.",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    }
];

let galleryItems = JSON.parse(localStorage.getItem('fashionGallery')) || [
    {
        id: 1,
        title: "Student Fashion Show 2023",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
        date: "15 Oct 2023"
    },
    {
        id: 2,
        title: "Graduate Collection",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
        date: "10 Sep 2023"
    }
];

// Save data to localStorage
function saveData() {
    localStorage.setItem('fashionCourses', JSON.stringify(courses));
    localStorage.setItem('fashionGallery', JSON.stringify(galleryItems));
}

// Render Courses - Only on index.html
function renderCourses() {
    const container = document.getElementById('dynamic-courses-container');
    if (!container) return; // Exit if container doesn't exist
    
    container.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-img" style="background-image: url('${course.image}')"></div>
            <div class="course-content">
                <h3>${course.name}</h3>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${course.duration}</span>
                    <span><i class="fas fa-user-graduate"></i> ${course.level}</span>
                </div>
                <p>${course.description}</p>
                <a href="#" class="btn">Register Now</a>
            </div>
        `;
        container.appendChild(courseCard);
    });
}

// Render Gallery - Only on index.html
function renderGallery() {
    const container = document.getElementById('dynamic-gallery-container');
    if (!container) return; // Exit if container doesn't exist
    
    container.innerHTML = '';
    
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.date}</p>
            </div>
        `;
        container.appendChild(galleryItem);
    });
}

// Render Admin Courses List - Only in admin panel
function renderAdminCourses() {
    const container = document.querySelector('#courses-tab .admin-list');
    if (!container) return; // Exit if container doesn't exist
    
    container.innerHTML = '<h3>Current Courses</h3>';
    
    courses.forEach(course => {
        const adminItem = document.createElement('div');
        adminItem.className = 'admin-item';
        adminItem.innerHTML = `
            <div>
                <h4>${course.name}</h4>
                <p>Duration: ${course.duration} | Level: ${course.level}</p>
            </div>
            <div class="admin-actions">
                <button class="admin-action edit-btn" data-id="${course.id}">Edit</button>
                <button class="admin-action delete-btn" data-id="${course.id}">Delete</button>
            </div>
        `;
        container.appendChild(adminItem);
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('#courses-tab .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this course?')) {
                courses = courses.filter(course => course.id !== courseId);
                saveData();
                renderCourses();
                renderAdminCourses();
            }
        });
    });
}

// Render Admin Gallery List - Only in admin panel
function renderAdminGallery() {
    const container = document.querySelector('#gallery-tab .admin-list');
    if (!container) return; // Exit if container doesn't exist
    
    container.innerHTML = '<h3>Gallery Images</h3>';
    
    galleryItems.forEach(item => {
        const adminItem = document.createElement('div');
        adminItem.className = 'admin-item';
        adminItem.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <p>Uploaded: ${item.date}</p>
            </div>
            <div class="admin-actions">
                <button class="admin-action delete-btn" data-id="${item.id}">Delete</button>
            </div>
        `;
        container.appendChild(adminItem);
    });
    
    // Add event listeners for delete buttons
    document.querySelectorAll('#gallery-tab .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this image?')) {
                galleryItems = galleryItems.filter(item => item.id !== itemId);
                saveData();
                renderGallery();
                renderAdminGallery();
            }
        });
    });
}

// Admin Panel Toggle
const adminLoginBtn = document.getElementById('admin-login-btn');
const adminPanel = document.getElementById('adminPanel');
const loginPanel = document.getElementById('loginPanel');
const closeAdmin = document.getElementById('closeAdmin');

if (adminLoginBtn) {
    adminLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (loginPanel) loginPanel.style.display = 'block';
    });
}

if (closeAdmin) {
    closeAdmin.addEventListener('click', () => {
        if (adminPanel) adminPanel.style.display = 'none';
    });
}

// Admin Login
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple authentication
        if (username === 'admin' && password === 'password') {
            if (loginPanel) loginPanel.style.display = 'none';
            if (adminPanel) adminPanel.style.display = 'block';
            renderAdminCourses();
            renderAdminGallery();
        } else {
            alert('Invalid credentials. Try: admin / password');
        }
    });
}

// Admin Tabs
const adminTabs = document.querySelectorAll('.admin-tab');

if (adminTabs.length > 0) {
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and content
            adminTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) tabContent.classList.add('active');
        });
    });
}

// Add Course Form
const addCourseForm = document.getElementById('addCourseForm');
if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const courseName = document.getElementById('courseName').value;
        const courseDuration = document.getElementById('courseDuration').value;
        const courseLevel = document.getElementById('courseLevel').value;
        const courseDescription = document.getElementById('courseDescription').value;
        
        const newCourse = {
            id: Date.now(),
            name: courseName,
            duration: courseDuration,
            level: courseLevel,
            description: courseDescription,
            image: "https://images.unsplash.com/photo-1558769132-cb1f96b8d050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80" // Default image
        };
        
        courses.push(newCourse);
        saveData();
        renderCourses();
        renderAdminCourses();
        
        alert('Course added successfully!');
        e.target.reset();
    });
}

// Upload Image Form
const uploadImageForm = document.getElementById('uploadImageForm');
if (uploadImageForm) {
    uploadImageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const imageTitle = document.getElementById('imageTitle').value;
        const imageFile = document.getElementById('imageFile').files[0];
        
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newGalleryItem = {
                    id: Date.now(),
                    title: imageTitle,
                    image: e.target.result,
                    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                };
                
                galleryItems.push(newGalleryItem);
                saveData();
                renderGallery();
                renderAdminGallery();
                
                alert('Image uploaded successfully!');
                e.target.reset();
            };
            reader.readAsDataURL(imageFile);
        } else {
            // If no file selected, use a default image URL
            const newGalleryItem = {
                id: Date.now(),
                title: imageTitle,
                image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            };
            
            galleryItems.push(newGalleryItem);
            saveData();
            renderGallery();
            renderAdminGallery();
            
            alert('Gallery item added successfully!');
            e.target.reset();
        }
    });
}

// Add Announcement Form
const addAnnouncementForm = document.getElementById('addAnnouncementForm');
if (addAnnouncementForm) {
    addAnnouncementForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Announcement added successfully!');
        e.target.reset();
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Only initialize these on index.html
    if (document.getElementById('dynamic-courses-container')) {
        renderCourses();
    }
    if (document.getElementById('dynamic-gallery-container')) {
        renderGallery();
    }
    
    // Check if we're on the index page and initialize slider
    if (sliderContainer && slides.length > 0) {
        initSlider();
    }
});

// Add this function to handle page-specific initializations
function initializePage() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('index.html') || currentPage === '/') {
        // Index page specific initializations
        renderCourses();
        renderGallery();
        if (sliderContainer && slides.length > 0) {
            initSlider();
        }
    } else if (currentPage.includes('about.html')) {
        // About page specific initializations
        console.log('About page loaded');
        // Add any about page specific JS here
    }
}

// Call initializePage when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);
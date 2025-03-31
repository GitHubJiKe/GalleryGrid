
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const sortSelect = document.getElementById('sortSelect');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');

    let currentPage = 1;
    let isLoading = false;
    let images = [];
    let url = "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    // Sample image data with different categories
    const imageData = [
        { id: 1, url: url, title: 'Beautiful Nature', category: 'nature' },
        { id: 2, url:url, title: 'Modern Architecture', category: 'architecture' },
        { id: 3, url: url, title: 'Portrait Photography', category: 'people' },
        { id: 4, url:url, title: 'Wildlife', category: 'animals' },
        { id: 5, url: url, title: 'Mountain View', category: 'nature' },
        { id: 6, url: url, title: 'City Skyline', category: 'architecture' },
        { id: 7, url: url, title: 'Cute Dog', category: 'animals' },
        { id: 8, url: url, title: 'Tropical Beach', category: 'nature' },
        { id: 9, url: url, title: 'Sleeping Cat', category: 'animals' },
        { id: 10, url:url, title: 'Happy Family', category: 'people' },
        { id: 11, url: url, title: 'Waterfall', category: 'nature' },
        { id: 12, url: url, title: 'Historic Bridge', category: 'architecture' }
    ];

    // Initialize gallery
    function initGallery() {
        images = [...imageData];
        renderGallery(images);
        setupEventListeners();
    }

    // Render gallery items
    function renderGallery(imagesToRender) {
        galleryGrid.innerHTML = '';
        
        imagesToRender.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = image.category;
            
            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.title;
            img.className = 'gallery-img';
            img.loading = 'lazy';
            
            const caption = document.createElement('div');
            caption.className = 'gallery-caption';
            caption.textContent = image.title;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(caption);
            galleryGrid.appendChild(galleryItem);
            
            // Add click event to open lightbox
            galleryItem.addEventListener('click', () => openLightbox(image.url, image.title));
        });
    }

    // Filter images based on category
    function filterImages() {
        const category = filterSelect.value;
        let filteredImages = [...imageData];
        
        if (category !== 'all') {
            filteredImages = imageData.filter(image => image.category === category);
        }
        
        images = filteredImages;
        renderGallery(images);
    }

    // Sort images
    function sortImages() {
        const sortBy = sortSelect.value;
        let sortedImages = [...images];
        
        switch(sortBy) {
            case 'random':
                sortedImages = sortedImages.sort(() => Math.random() - 0.5);
                break;
            case 'popular':
                // In a real app, this would sort by actual popularity metrics
                sortedImages = sortedImages.sort(() => Math.random() - 0.5);
                break;
            default:
                // Default sort (by ID)
                sortedImages = sortedImages.sort((a, b) => a.id - b.id);
        }
        
        renderGallery(sortedImages);
    }

    // Search images
    function searchImages() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            renderGallery(images);
            return;
        }
        
        const searchedImages = images.filter(image => 
            image.title.toLowerCase().includes(searchTerm) || 
            image.category.toLowerCase().includes(searchTerm)
        );
        
        renderGallery(searchedImages);
    }

    // Load more images
    function loadMoreImages() {
        if (isLoading) return;
        
        isLoading = true;
        loadingSpinner.style.display = 'block';
        loadMoreBtn.style.display = 'none';
        
        // Simulate API call with timeout
        setTimeout(() => {
            currentPage++;
            const newImages = [
                { id: 13, url: 'https://source.unsplash.com/random/800x600/?forest', title: 'Misty Forest', category: 'nature' },
                { id: 14, url: 'https://source.unsplash.com/random/800x600/?skyscraper', title: 'Tall Skyscraper', category: 'architecture' },
                { id: 15, url: 'https://source.unsplash.com/random/800x600/?bird', title: 'Colorful Bird', category: 'animals' },
                { id: 16, url: 'https://source.unsplash.com/random/800x600/?couple', title: 'Romantic Couple', category: 'people' }
            ];
            
            images = [...images, ...newImages];
            renderGallery(images);
            
            isLoading = false;
            loadingSpinner.style.display = 'none';
            loadMoreBtn.style.display = 'block';
        }, 1000);
    }

    // Open lightbox
    function openLightbox(imgSrc, caption) {
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Setup event listeners
    function setupEventListeners() {
        filterSelect.addEventListener('change', filterImages);
        sortSelect.addEventListener('change', sortImages);
        searchInput.addEventListener('input', searchImages);
        loadMoreBtn.addEventListener('click', loadMoreImages);
        closeBtn.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Close lightbox with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // Initialize the gallery
    initGallery();
});

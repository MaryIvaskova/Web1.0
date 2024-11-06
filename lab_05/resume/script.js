// Function to toggle between dark and light themes
function toggleTheme() {
    const theme = document.getElementById('theme-style');
    const newTheme = theme.getAttribute('href') === 'dark.css' ? 'light.css' : 'dark.css';
    theme.href = newTheme;
    localStorage.setItem('theme', newTheme);
}

// Set theme on load based on saved preference
window.onload = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark.css';
    document.getElementById('theme-style').href = savedTheme;
    setActiveOnLoad();
};

// Update and preview photos
function updatePhotos() {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    if (files.length >= 2) {
        const photo1 = document.getElementById('photo1');
        const photo2 = document.getElementById('photo2');
        const previewContainer = document.getElementById('photoPreview');
        previewContainer.innerHTML = '';

        photo1.src = URL.createObjectURL(files[0]);
        photo2.src = URL.createObjectURL(files[1]);

        showNotification('Photos updated successfully!');
        for (let i = 0; i < 2; i++) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(files[i]);
            img.classList.add('preview-img');
            previewContainer.appendChild(img);
        }
    } else {
        alert('Please select two photos to update both.');
    }
}

// Show a notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Set active navigation item on click
function setActive(event) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
    localStorage.setItem('activeNav', event.currentTarget.innerText);
}

// Load active navigation item from localStorage
function setActiveOnLoad() {
    const activeNav = localStorage.getItem('activeNav');
    if (activeNav) {
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.innerText === activeNav) {
                link.classList.add('active');
            }
        });
    }
}
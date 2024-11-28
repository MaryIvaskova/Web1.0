document.addEventListener("DOMContentLoaded", () => {
    const jobData = [
        {
            company: "Photosnap",
            position: "Senior Frontend Developer",
            posted: "1d ago",
            contract: "Full Time",
            location: "USA only",
            tags: ["Frontend", "Senior", "HTML", "CSS", "JavaScript"],
            featured: true,
            new: true,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Manage",
            position: "Fullstack Developer",
            posted: "1d ago",
            contract: "Part Time",
            location: "Remote",
            tags: ["Fullstack", "Midweight", "Python", "React"],
            featured: true,
            new: true,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Account",
            position: "Junior Frontend Developer",
            posted: "2d ago",
            contract: "Part Time",
            location: "USA only",
            tags: ["Frontend", "Junior", "React", "Sass", "JavaScript"],
            featured: false,
            new: true,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "MyHome",
            position: "Junior Frontend Developer",
            posted: "5d ago",
            contract: "Contract",
            location: "USA only",
            tags: ["Frontend", "Junior", "CSS", "JavaScript"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Loop Studios",
            position: "Software Engineer",
            posted: "1w ago",
            contract: "Full Time",
            location: "Worldwide",
            tags: ["Fullstack", "Midweight", "JavaScript", "Sass", "Ruby"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "FaceIt",
            position: "Junior Backend Developer",
            posted: "2w ago",
            contract: "Full Time",
            location: "UK only",
            tags: ["Backend", "Junior", "Ruby", "RoR"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Shortly",
            position: "Junior Developer",
            posted: "2w ago",
            contract: "Full Time",
            location: "Worldwide",
            tags: ["Frontend", "Junior", "HTML", "Sass", "JavaScript"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Insure",
            position: "Junior Frontend Developer",
            posted: "2w ago",
            contract: "Full Time",
            location: "USA only",
            tags: ["Frontend", "Junior", "Vue", "JavaScript", "Sass"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "Eyecam Co.",
            position: "Full Stack Engineer",
            posted: "3w ago",
            contract: "Full Time",
            location: "Worldwide",
            tags: ["Fullstack", "Midweight", "JavaScript", "Django", "Python"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        },
        {
            company: "The Air Filter Company",
            position: "Front-end Dev",
            posted: "1mo ago",
            contract: "Part Time",
            location: "Worldwide",
            tags: ["Frontend", "Junior", "React", "Sass", "JavaScript"],
            featured: false,
            new: false,
            logo: "https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png"
        }
        // Інші вакансії...
    ];

    let selectedTags = [];

    // Відображення вакансій
    function displayJobs(jobs) {
        const jobListings = document.getElementById('jobListings');
        jobListings.innerHTML = '';

        const filteredJobs = jobs.filter(job => {
            if (selectedTags.length === 0) return true;
            return selectedTags.every(tag => job.tags.includes(tag));
        });

        filteredJobs.forEach(job => {
            const jobElement = document.createElement('div');
            jobElement.classList.add('job');
            if (job.featured) jobElement.classList.add('featured');

            jobElement.innerHTML = `
                <img src="${job.logo || 'https://e7.pngegg.com/pngimages/551/875/png-clipart-anonymous-blog-anonymity-computer-icons-avatar-anonymous-logo-glasses-thumbnail.png'}" alt="${job.company} logo" class="company-logo">
                <div class="job-content">
                    <div class="job-header">
                        <span class="company-name">${job.company}</span>
                        <h3 class="job-title">${job.position}</h3>
                        ${job.new ? `<span class="badge new">NEW!</span>` : ""}
                        ${job.featured ? `<span class="badge featured">FEATURED</span>` : ""}
                    </div>
                    <p>${job.posted} • ${job.contract} • ${job.location}</p>
                    <div class="tags">${job.tags.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join('')}</div>
                </div>
            `;

            jobListings.appendChild(jobElement);
        });

        addTagEventListeners();
    }

    // Функція для додавання нової вакансії
    document.getElementById('jobForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const newJob = {
            company: document.getElementById('company').value,
            position: document.getElementById('position').value,
            posted: document.getElementById('posted').value,
            contract: document.getElementById('contract').value,
            location: document.getElementById('location').value,
            tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()),
            new: document.getElementById('new').checked,
            featured: document.getElementById('featured').checked,
            logo: document.getElementById('logo').value || null
        };

        jobData.unshift(newJob); // Додаємо нову вакансію на початок списку
        displayJobs(jobData); // Оновлюємо відображення вакансій
        event.target.reset(); // Очищаємо форму
    });

    function addTag(tag) {
        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
            updateFilterBar();
            displayJobs(jobData);
        }
    }

    function removeTag(tag) {
        selectedTags = selectedTags.filter(t => t !== tag);
        updateFilterBar();
        displayJobs(jobData);
    }

    function updateFilterBar() {
        const filterBar = document.getElementById('selectedFilters');
        filterBar.innerHTML = selectedTags.map(tag => `
            <span class="filter-tag">
                ${tag} <span class="remove-tag" data-tag="${tag}">x</span>
            </span>
        `).join('');

        document.getElementById('filterBar').classList.toggle('hidden', selectedTags.length === 0);
        addRemoveTagEventListeners();
    }

    function addTagEventListeners() {
        document.querySelectorAll('.tag').forEach(tagElement => {
            tagElement.addEventListener('click', (event) => {
                addTag(event.target.getAttribute('data-tag'));
            });
        });
    }

    function addRemoveTagEventListeners() {
        document.querySelectorAll('.remove-tag').forEach(removeTagElement => {
            removeTagElement.addEventListener('click', (event) => {
                removeTag(event.target.getAttribute('data-tag'));
            });
        });
    }

    document.getElementById('clearFilters').addEventListener('click', () => {
        selectedTags = [];
        updateFilterBar();
        displayJobs(jobData);
    });

    displayJobs(jobData);
});
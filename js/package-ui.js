class PackageUI {
    constructor(config) {
        this.data = config.data;
        this.containerId = config.containerId;
        this.searchId = config.searchId;
        this.filterId = config.filterId;
        this.init();
    }

    init() {
        this.renderSearch();
        this.renderGrid(this.data);
        this.setupListeners();
    }

    renderSearch() {
        const searchContainer = document.getElementById(this.searchId);
        if (!searchContainer) return;

        // Get unique tags for filters
        const tags = ["All", ...new Set(this.data.map((item) => item.tag))];

        searchContainer.innerHTML = `
            <div class="search-hero-container">
                <div class="modern-search-bar">
                    <div class="search-icon-wrapper">
                        <i class="fas fa-search"></i>
                    </div>
                    <input type="text" class="search-input" id="pkg-search-input" placeholder="Search for adventures, courses, or locations...">
                </div>
                <div class="filter-tags" id="pkg-filter-tags">
                   ${tags
                .map(
                    (tag) =>
                        `<button class="filter-tag ${tag === "All" ? "active" : ""
                        }" data-filter="${tag}">${tag}</button>`
                )
                .join("")}
                </div>
            </div>
        `;
    }

    renderGrid(items) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding: 40px; grid-column: 1/-1;">
                <h3 style="color:#666;">No results found</h3>
                <p>Try changing your search terms.</p>
            </div>`;
            return;
        }

        container.className = "modern-grid"; // Ensure grid class is applied
        container.innerHTML = items
            .map(
                (item) => `
            <div class="modern-card">
                <div class="card-image-wrapper">
                    <img src="${item.image}" class="card-image" alt="${item.title
                    }" loading="lazy">
                    <div class="card-overlay">
                        <span class="card-tag">${item.tag}</span>
                    </div>
                </div>
                <div class="card-content">
                    <h5 class="card-title">${item.title}</h5>
                    <div class="card-meta">
                        <div class="meta-item">
                            <i class="far fa-clock"></i>
                            <span>${item.duration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${item.location}</span>
                        </div>
                    </div>
                    
                    <div class="card-price-row">
                        <div class="price-block">
                            <span class="label">Start From</span>
                            <span class="amount">${item.price}</span>
                        </div>
                        <div class="card-actions">
                             <button class="btn-icon" onclick="sendWhatsAppBooking('${item.title}', '${item.price}', '${item.duration}', '${item.location}', '${item.url}')" title="Book via WhatsApp">
                                <i class="fab fa-whatsapp"></i>
                            </button>
                            <a href="${item.url}" class="btn-primary-sm">
                                View Details <i class="fas fa-arrow-right" style="margin-left: 8px;"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
            )
            .join("");
    }

    setupListeners() {
        const searchInput = document.getElementById("pkg-search-input");
        const filterTags = document.querySelectorAll(".filter-tag");

        let currentSearch = "";
        let currentFilter = "All";

        const filterData = () => {
            const filtered = this.data.filter((item) => {
                const matchesSearch =
                    item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                    item.location.toLowerCase().includes(currentSearch.toLowerCase());
                const matchesTag =
                    currentFilter === "All" || item.tag === currentFilter;
                return matchesSearch && matchesTag;
            });
            this.renderGrid(filtered);
        };

        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                currentSearch = e.target.value;
                filterData();
            });
        }

        if (filterTags) {
            filterTags.forEach((tag) => {
                tag.addEventListener("click", () => {
                    // Remove active class from all
                    filterTags.forEach((t) => t.classList.remove("active"));
                    // Add to clicked
                    tag.classList.add("active");
                    currentFilter = tag.dataset.filter;
                    filterData();
                });
            });
        }
    }
}

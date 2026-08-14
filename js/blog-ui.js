class BlogUI {
    constructor(config) {
        this.data = config.data;
        this.containerId = config.containerId;
        this.searchId = config.searchId;
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

        searchContainer.innerHTML = `
            <div class="search-hero-container">
                <div class="modern-search-bar" style="background:white; border: 1px solid #eee;">
                    <div class="search-icon-wrapper">
                        <!-- Use SVG for reliability -->
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input type="text" class="search-input" id="blog-search-input" placeholder="Search articles...">
                </div>
            </div>
        `;
    }

    renderGrid(items) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        if (items.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding: 40px; grid-column: 1/-1;">
                  <h3 style="color:#666;">No articles found</h3>
              </div>`;
            return;
        }

        container.className = "modern-grid";
        container.innerHTML = items
            .map(
                (item) => `
              <article class="modern-card">
                  <div class="card-image-wrapper">
                      <a href="${item.url}">
                        <img src="${item.image}" class="card-image" alt="${item.title}" loading="lazy">
                      </a>
                      <div class="card-overlay">
                        <span class="card-tag">${item.tag || 'Guide'}</span>
                      </div>
                  </div>
                  <div class="card-content">
                      <h3 class="card-title" style="font-size: 22px;">
                          <a href="${item.url}" style="color: inherit; text-decoration: none;">${item.title}</a>
                      </h3>
                      <p style="font-size: 15px; color: #555; line-height: 1.6; margin-bottom: 20px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">
                          ${item.excerpt}
                      </p>
                      <div class="card-actions">
                          <a href="${item.url}" class="btn-primary-sm" style="width: 100%; justify-content: center;">
                            Read Article <i class="fa fa-arrow-right" style="margin-left: 8px;"></i>
                          </a>
                      </div>
                  </div>
              </article>
          `
            )
            .join("");
    }

    setupListeners() {
        const searchInput = document.getElementById("blog-search-input");

        const filterData = () => {
            const query = searchInput.value.toLowerCase();
            const filtered = this.data.filter((item) => {
                return (
                    item.title.toLowerCase().includes(query) ||
                    item.excerpt.toLowerCase().includes(query)
                );
            });
            this.renderGrid(filtered);
        };

        if (searchInput) {
            searchInput.addEventListener("input", filterData);
        }
    }
}


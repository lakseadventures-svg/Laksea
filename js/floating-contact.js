(function () {
    document.addEventListener('DOMContentLoaded', function () {
        // 1. Remove legacy floating icons if they exist
        var legacy = document.querySelectorAll('.contact-floating-icons');
        legacy.forEach(function (el) {
            el.remove();
        });

        // 2. check if glass fab exists
        if (document.querySelector('.glass-fab-container')) return;

        // 3. Create the Glass FAB structure
        var fabContainer = document.createElement('div');
        fabContainer.className = 'glass-fab-container';

        // Main Trigger Button
        var triggerBtn = document.createElement('div');
        triggerBtn.className = 'glass-fab-trigger';
        triggerBtn.innerHTML = '<i class="fa fa-comment-dots"></i>'; // Changed to fa for consistency with FA4
        // Note: If FontAwesome 5 is used, fa-comment-dots might work or fas fa-comment-dots.
        // The codebase uses FA4 (fa class). 'fa-comment' is safe. 'fa-comments' is better.
        // Let's check font-awesome.css content in step 712.
        // It has fa-comments (f086) and fa-comment (f075). It does NOT have fa-comment-dots.
        // I will use fa-comments.
        triggerBtn.innerHTML = '<i class="fa fa-comments"></i>';

        // Actions Container
        var actionsDiv = document.createElement('div');
        actionsDiv.className = 'glass-fab-actions';

        // WhatsApp
        var waLink = document.createElement('a');
        waLink.href = 'https://wa.me/917994471129';
        waLink.target = '_blank';
        waLink.className = 'glass-fab-item whatsapp';
        waLink.title = 'WhatsApp';
        waLink.innerHTML = '<i class="fab fa-whatsapp"></i>';
        // Wait, fa class uses "fa fa-whatsapp". "fab" is FA5 brand.
        // Check step 754: <i class="fab fa-whatsapp"></i> was used in trip-planner.
        // But font-awesome.css in step 712 has ".fa-whatsapp:before{content:"\f232"}"
        // So "fa fa-whatsapp" is correct for FA4. "fab" might be supported by `all.css` (FA5 compatibility?)
        // Step 754 imports `css/all.css` (id="fa6-css") AND `css/font-awesome.css`.
        // Safe bet is to use classes that work. The user corrected us to use "fa" instead of "fas" elsewhere.
        // I will use "fab fa-whatsapp" if it was working, or "fa fa-whatsapp".
        // I will use "fa fa-whatsapp" to be consistent with my previous fixes.
        waLink.innerHTML = '<i class="fa fa-whatsapp"></i>';

        // Phone
        var phoneLink = document.createElement('a');
        phoneLink.href = 'tel:+917994471129';
        phoneLink.className = 'glass-fab-item phone';
        phoneLink.title = 'Call Us';
        phoneLink.innerHTML = '<i class="fa fa-phone"></i>';

        // Email
        var mailLink = document.createElement('a');
        mailLink.href = 'mailto:divewithlaksea@gmail.com';
        mailLink.className = 'glass-fab-item mail';
        mailLink.title = 'Email Us';
        mailLink.innerHTML = '<i class="fa fa-envelope"></i>';

        // Append items
        actionsDiv.appendChild(waLink);
        actionsDiv.appendChild(phoneLink);
        actionsDiv.appendChild(mailLink);

        // Append to container
        fabContainer.appendChild(actionsDiv);
        fabContainer.appendChild(triggerBtn);

        // Append to body
        document.body.appendChild(fabContainer);

        // Toggle on click for mobile mainly (hover handles desktop)
        triggerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            fabContainer.classList.toggle('active');
        });

        // Close on click outside
        document.addEventListener('click', function (e) {
            if (!fabContainer.contains(e.target)) {
                fabContainer.classList.remove('active');
            }
        });
    });
})();

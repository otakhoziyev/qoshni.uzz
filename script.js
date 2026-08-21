/* =====================================================
   QOSHNI UZZ — BOSH SAHIFA (index.html)
   Vanilla JavaScript
   Yangi: localStorage'dan mahsulotlarni yuklash,
   karusel, va dinamik card qo'llab-quvvatlash
===================================================== */


/* ================= ELEMENTS ================= */

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productsGrid = document.getElementById("productsGrid");
const categories = document.querySelectorAll(".category-card");
const searchBtn = document.getElementById("searchBtn");

initLanguageSwitcher();
initThemeSwitcher();


/* ================= HELPER: SAFE JSON PARSE ================= */

function safeJSONParse(raw, fallback) {
    if (!raw) return fallback;
    try {
        const parsed = JSON.parse(raw);
        return parsed === null || parsed === undefined ? fallback : parsed;
    } catch (err) {
        return fallback;
    }
}

function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* ================= LOAD USER LISTINGS FROM LOCALSTORAGE ================= */

function loadUserListings() {
    var userListings = safeJSONParse(localStorage.getItem("qoshni_listings"), []);
    if (userListings.length === 0) return;

    userListings.forEach(function(item) {
        var article = document.createElement("article");
        article.className = "product-card";
        article.dataset.name = item.title;
        article.dataset.category = item.category;

        var priceFormatted = (item.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        var periodText = item.period === "soat" ? "/ soat" : "/ kun";
        var location = "Toshkent";

        var imageHTML = "";
        if (item.image) {
            imageHTML = '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title) + '" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">';
        } else {
            var visual = item.visual || "box";
            if (visual === "drill") {
                imageHTML = '<div class="drill-mini" style="width:80px;height:80px;"></div>';
            } else if (visual === "bicycle") {
                imageHTML = '<div class="bicycle-mini" style="width:80px;height:80px;"></div>';
            } else if (visual === "laptop") {
                imageHTML = '<div class="laptop-mini" style="width:80px;height:80px;"></div>';
            } else if (visual === "camera") {
                imageHTML = '<div class="camera-mini" style="width:80px;height:80px;"></div>';
            } else {
                imageHTML = '<div class="box-mini" style="width:80px;height:80px;"></div>';
            }
        }

        article.innerHTML =
            '<button class="favorite-btn" aria-label="Sevimlilarga qo\'shish">\u2661</button>' +
            '<div class="product-image">' + imageHTML + '</div>' +
            '<div class="product-info">' +
                '<h3>' + escapeHTML(item.title) + '</h3>' +
                '<strong class="product-price">' + priceFormatted + ' so\'m <small>' + periodText + '</small></strong>' +
                '<div class="product-meta">' +
                    '<svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">' +
                        '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>' +
                        '<circle cx="12" cy="10" r="3"></circle>' +
                    '</svg>' +
                    '<span>' + location + '</span>' +
                '</div>' +
                '<div class="rating">' +
                    '<svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">' +
                        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>' +
                    '</svg>' +
                    '<span>5.0</span>' +
                    '<small>(1)</small>' +
                '</div>' +
            '</div>';

        productsGrid.appendChild(article);
    });
}

loadUserListings();


/* ================= DYNAMIC PRODUCTS REFERENCE ================= */

function getAllProducts() {
    return document.querySelectorAll(".product-card");
}


/* ================= SEARCH ================= */

function searchProducts(query) {
    var value = query.trim().toLowerCase();
    var allProducts = getAllProducts();
    var found = 0;
    allProducts.forEach(function(product) {
        var name = product.dataset.name.toLowerCase();
        var category = product.dataset.category.toLowerCase();
        var matches = value === "" || name.includes(value) || category.includes(value);
        if (matches) { product.classList.remove("hidden"); found++; } else { product.classList.add("hidden"); }
    });
    updateNoResults(found);
}


/* ================= NO RESULTS ================= */

function updateNoResults(found) {
    var message = document.querySelector(".no-results");
    if (!message) {
        message = document.createElement("div");
        message.className = "no-results";
        message.textContent = "Bu narsani hozircha topa olmadik.";
        productsGrid.appendChild(message);
    }
    message.classList.toggle("show", found === 0);
}


/* ================= SEARCH FORM ================= */

searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchProducts(searchInput.value);
    document.querySelector(".popular-section").scrollIntoView({ behavior: "smooth" });
});


/* ================= LIVE SEARCH ================= */

searchInput.addEventListener("input", function () { searchProducts(this.value); });


/* ================= HEADER SEARCH ================= */

searchBtn.addEventListener("click", function () {
    searchInput.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ================= CATEGORIES ================= */

categories.forEach(function(category) {
    category.addEventListener("click", function () {
        categories.forEach(function(item) { item.classList.remove("active"); });
        category.classList.add("active");
        var selectedCategory = category.dataset.category.toLowerCase();
        var allProducts = getAllProducts();
        var found = 0;
        allProducts.forEach(function(product) {
            var productCategory = product.dataset.category.toLowerCase();
            if (productCategory === selectedCategory) { product.classList.remove("hidden"); found++; }
            else { product.classList.add("hidden"); }
        });
        updateNoResults(found);
        document.querySelector(".popular-section").scrollIntoView({ behavior: "smooth" });
    });
});


/* ================= FAVORITES ================= */

var userFavorites = safeJSONParse(localStorage.getItem("qoshni_favorites"), []);

function setupFavoriteButton(button) {
    var card = button.closest(".product-card");
    if (!card) return;
    var name = card.dataset.name;
    var isFav = userFavorites.some(function(item) { return item.title === name; });
    button.classList.toggle("active", isFav);
    button.textContent = isFav ? "\u2665" : "\u2661";

    button.addEventListener("click", function (event) {
        event.stopPropagation();
        var card = button.closest(".product-card");
        if (!card) return;
        var name = card.dataset.name;
        var category = card.dataset.category;
        var priceText = card.querySelector(".product-price").textContent;
        var priceVal = parseInt(priceText.replace(/\D/g, "")) || 0;
        var periodText = card.querySelector(".product-price small").textContent;
        var period = periodText.includes("soat") ? "soat" : "kun";
        var visual = card.querySelector(".product-image img") ? "box" : "box";

        button.classList.toggle("active");
        if (button.classList.contains("active")) {
            button.textContent = "\u2665";
            if (!userFavorites.some(function(item) { return item.title === name; })) {
                userFavorites.push({ id: "fav-" + Date.now(), title: name, price: priceVal, period: period, category: category, visual: visual, location: card.querySelector(".product-meta span").textContent });
            }
        } else {
            button.textContent = "\u2661";
            userFavorites = userFavorites.filter(function(item) { return item.title !== name; });
        }
        localStorage.setItem("qoshni_favorites", JSON.stringify(userFavorites));
    });
}

// Setup favorites for all existing product cards
document.querySelectorAll(".favorite-btn").forEach(function(btn) {
    setupFavoriteButton(btn);
});


/* ================= PRODUCT DETAIL MODAL ================= */

var productDescriptions = {
    "MacBook Pro 14": "Apple MacBook Pro 14\" \u2014 M3 Pro protsessor, 18 GB RAM, 512 GB SSD. Professionallar uchun yuqori samarali noutbuk.",
    "PlayStation 5": "Sony PlayStation 5 \u2014 Diskov versiya, DualSense controller bilan. Ultra HD 4K o\u02BByinlar.",
    "Canon EOS R6": "Canon EOS R6 \u2014 Full-frame mirrorless kamera, 20.1 MP, 4K video.",
    "BenQ Proyektor": "BenQ W1070 \u2014 Full HD 1080p proyektor, 2000 ANSI lumen.",
    "default": "Bu mahsulotni ijaraga olish uchun Telegram orqali bog\u02BBlaning."
};

var productRatings = {
    "MacBook Pro 14": { value: "4.9", reviews: "(23 ta baho)" },
    "PlayStation 5": { value: "4.8", reviews: "(18 ta baho)" },
    "Canon EOS R6": { value: "4.9", reviews: "(15 ta baho)" },
    "BenQ Proyektor": { value: "4.7", reviews: "(12 ta baho)" }
};

var modal = document.getElementById("productModal");
var modalCloseBtn = document.getElementById("modalCloseBtn");
var modalImage = document.getElementById("modalImage");
var modalTitle = document.getElementById("modalTitle");
var modalCategory = document.getElementById("modalCategory");
var modalRatingValue = document.getElementById("modalRatingValue");
var modalReviews = document.getElementById("modalReviews");
var modalPrice = document.getElementById("modalPrice");
var modalPeriod = document.getElementById("modalPeriod");
var modalLocation = document.getElementById("modalLocation");
var modalDescription = document.getElementById("modalDescription");
var modalTelegram = document.getElementById("modalTelegram");
var modalFavoriteBtn = document.getElementById("modalFavoriteBtn");

function openProductModal(card) {
    var name = card.dataset.name;
    var category = card.dataset.category;
    var priceText = card.querySelector(".product-price").textContent.trim();
    var priceParts = priceText.split("\n");
    var price = priceParts[0].trim();
    var period = priceParts[1] ? priceParts[1].trim() : "";
    var location = card.querySelector(".product-meta span").textContent;
    var rating = productRatings[name] || { value: "5.0", reviews: "(1 ta baho)" };
    var description = productDescriptions[name] || productDescriptions["default"];
    var productImage = card.querySelector(".product-image").innerHTML;

    modalImage.innerHTML = productImage;
    modalTitle.textContent = name;
    modalCategory.textContent = category;
    modalRatingValue.textContent = rating.value;
    modalReviews.textContent = rating.reviews;
    modalPrice.textContent = price;
    modalPeriod.textContent = period;
    modalLocation.textContent = location;
    modalDescription.textContent = description;

    var tgMessage = encodeURIComponent("Assalomu alaykum! \"" + name + "\" mahsulotini ijaraga olishni xohlayman.");
    modalTelegram.href = "https://t.me/otakoz1yev?text=" + tgMessage;

    var isFav = userFavorites.some(function(item) { return item.title === name; });
    modalFavoriteBtn.textContent = isFav ? "\u2665 Sevimlilardan o\u02BBchirish" : "\u2661 Sevimlilarga qo\u02BBshish";
    modalFavoriteBtn.dataset.productName = name;
    modalFavoriteBtn.dataset.productCategory = category;
    modalFavoriteBtn.dataset.productPrice = price;
    modalFavoriteBtn.dataset.productPeriod = period;
    modalFavoriteBtn.dataset.productLocation = location;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeProductModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

modalCloseBtn.addEventListener("click", closeProductModal);

modal.addEventListener("click", function (e) {
    if (e.target === modal) closeProductModal();
});

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("show")) {
        closeProductModal();
    }
});

// Use event delegation on the grid for product card clicks (works for dynamic cards)
productsGrid.addEventListener("click", function (event) {
    var card = event.target.closest(".product-card");
    if (!card) return;
    if (event.target.closest(".favorite-btn")) return;
    openProductModal(card);
});

modalFavoriteBtn.addEventListener("click", function () {
    var name = this.dataset.productName;
    var category = this.dataset.productCategory;
    var priceText = this.dataset.productPrice;
    var periodText = this.dataset.productPeriod;
    var location = this.dataset.productLocation;
    var priceVal = parseInt(priceText.replace(/\D/g, "")) || 0;
    var period = periodText.includes("soat") ? "soat" : "kun";

    var isFav = userFavorites.some(function(item) { return item.title === name; });
    if (isFav) {
        userFavorites = userFavorites.filter(function(item) { return item.title !== name; });
        this.textContent = "\u2661 Sevimlilarga qo\u02BBshish";
    } else {
        userFavorites.push({ id: "fav-" + Date.now(), title: name, price: priceVal, period: period, category: category, visual: "box", location: location });
        this.textContent = "\u2665 Sevimlilardan o\u02BBchirish";
    }
    localStorage.setItem("qoshni_favorites", JSON.stringify(userFavorites));
});


/* ================= CAROUSEL / BANNER ================= */

(function initCarousel() {
    var carouselTrack = document.getElementById("carouselTrack");
    var carouselPrev = document.getElementById("carouselPrev");
    var carouselNext = document.getElementById("carouselNext");
    var carouselDots = document.getElementById("carouselDots");
    if (!carouselTrack) return;

    var currentLang = localStorage.getItem("qoshni_lang") || "uz";
    var dict = (typeof translations !== "undefined" && translations[currentLang]) || (typeof translations !== "undefined" ? translations.uz : {});

    var slides = [
        {
            badge: dict.slide1_badge || "\uD83D\uDD25 Eng mashhur asboblar",
            title: dict.slide1_title || "Drel va Perforatorlar",
            subtitle: dict.slide1_subtitle || "Drel va perforatorlarni kuniga 50,000 so'mdan ijaraga oling.",
            category: "Asboblar"
        },
        {
            badge: dict.slide2_badge || "\u26A1 Ta'mirlash uchun",
            title: dict.slide2_title || "Balgarka va Silliqlash mashinasi",
            subtitle: dict.slide2_subtitle || "Metall va tosh kesish uchun burchakli uskunalar.",
            category: "Asboblar"
        },
        {
            badge: dict.slide3_badge || "\uD83C\uDFB5 Bayram & Tadbirlar",
            title: dict.slide3_title || "JBL va Partybox Kalonkalar",
            subtitle: dict.slide3_subtitle || "Tug'ilgan kun va pikniklar uchun kuchli kalonkalar.",
            category: "Boshqa"
        },
        {
            badge: dict.slide4_badge || "\uD83D\uDEB2 Faol dam olish",
            title: dict.slide4_title || "Tog' velosipedlari & Samokat",
            subtitle: dict.slide4_subtitle || "Shahar va tabiatda sayr qilish uchun velosipedlar.",
            category: "Transport"
        }
    ];

    var currentSlide = 0;
    var autoPlayInterval = null;

    function renderSlides() {
        carouselTrack.innerHTML = "";
        carouselDots.innerHTML = "";

        slides.forEach(function(slide, index) {
            var slideEl = document.createElement("div");
            slideEl.className = "carousel-slide";
            slideEl.innerHTML =
                '<div class="carousel-slide-content">' +
                    '<span class="carousel-badge">' + slide.badge + '</span>' +
                    '<h2 class="carousel-title">' + slide.title + '</h2>' +
                    '<p class="carousel-subtitle">' + slide.subtitle + '</p>' +
                    '<button class="carousel-cta" data-category="' + slide.category + '">' +
                        (dict.btn_rent_now || "Ijaraga olish") +
                    '</button>' +
                '</div>';
            carouselTrack.appendChild(slideEl);

            var dot = document.createElement("button");
            dot.className = "carousel-dot" + (index === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Slide " + (index + 1));
            dot.addEventListener("click", function () { goToSlide(index); });
            carouselDots.appendChild(dot);
        });

        updateCarouselPosition();

        // CTA buttons navigate to category
        document.querySelectorAll(".carousel-cta").forEach(function(btn) {
            btn.addEventListener("click", function () {
                var cat = this.dataset.category;
                var catBtn = document.querySelector('.category-card[data-category="' + cat + '"]');
                if (catBtn) catBtn.click();
            });
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarouselPosition();
        resetAutoPlay();
    }

    function updateCarouselPosition() {
        var offset = -currentSlide * 100;
        carouselTrack.style.transform = "translateX(" + offset + "%)";
        carouselTrack.style.transition = "transform 0.5s ease";

        var dots = carouselDots.querySelectorAll(".carousel-dot");
        dots.forEach(function(dot, i) {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarouselPosition();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarouselPosition();
    }

    if (carouselNext) carouselNext.addEventListener("click", function () { nextSlide(); resetAutoPlay(); });
    if (carouselPrev) carouselPrev.addEventListener("click", function () { prevSlide(); resetAutoPlay(); });

    function resetAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Touch/swipe support
    var touchStartX = 0;
    var touchEndX = 0;
    var carouselContainer = document.getElementById("carouselContainer");
    if (carouselContainer) {
        carouselContainer.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carouselContainer.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide(); else prevSlide();
                resetAutoPlay();
            }
        }, { passive: true });
    }

    renderSlides();
    resetAutoPlay();
})();


/* ================= INITIAL STATE ================= */

searchProducts("");

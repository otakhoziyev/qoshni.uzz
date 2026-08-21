/* =====================================================
   QOSHNI UZZ — PROFIL SAHIFASI LOGIKASI
   State Management and Interactions
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ================= DOM ELEMENTS =================
    const loginOverlay = document.getElementById("loginOverlay");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginEmailInput = document.getElementById("loginEmail");
    const loginPhoneInput = document.getElementById("loginPhone");
    const loginPasswordInput = document.getElementById("loginPassword");
    const loginError = document.getElementById("loginError");
    const registerError = document.getElementById("registerError");
    const profileMain = document.getElementById("profileMain");

    const loginSection = document.getElementById("loginSection");
    const registerSection = document.getElementById("registerSection");
    const loginNote = document.getElementById("loginNote");
    const registerNote = document.getElementById("registerNote");

    const modeLoginBtn = document.getElementById("modeLoginBtn");
    const modeRegisterBtn = document.getElementById("modeRegisterBtn");
    const switchToRegister = document.getElementById("switchToRegister");
    const switchToLogin = document.getElementById("switchToLogin");

    // Login tabs
    const tabEmail = document.getElementById("tabEmail");
    const tabPhone = document.getElementById("tabPhone");
    const emailGroup = document.getElementById("emailGroup");
    const phoneGroup = document.getElementById("phoneGroup");

    // Register tabs
    const regTabEmail = document.getElementById("regTabEmail");
    const regTabPhone = document.getElementById("regTabPhone");
    const regEmailGroup = document.getElementById("regEmailGroup");
    const regPhoneGroup = document.getElementById("regPhoneGroup");
    const regNameInput = document.getElementById("regName");
    const regEmailInput = document.getElementById("regEmail");
    const regPhoneInput = document.getElementById("regPhone");
    const regPasswordInput = document.getElementById("regPassword");
    const regPasswordConfirmInput = document.getElementById("regPasswordConfirm");

    const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
    const forgotModal = document.getElementById("forgotModal");
    const forgotSendBtn = document.getElementById("forgotSendBtn");
    const forgotBackBtn = document.getElementById("forgotBackBtn");
    const forgotDesc = document.getElementById("forgotDesc");
    const forgotEmailGroup = document.getElementById("forgotEmailGroup");
    const forgotPhoneGroup = document.getElementById("forgotPhoneGroup");
    const forgotEmailInput = document.getElementById("forgotEmail");
    const forgotPhoneInput = document.getElementById("forgotPhone");

    // Profile DOM elements
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const addListingBtn = document.getElementById("addListingBtn");
    const editProfileBtn = document.getElementById("editProfileBtn");
    const cancelAddListingBtn = document.getElementById("cancelAddListingBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const settingsForm = document.getElementById("settingsForm");
    const settingsNameInput = document.getElementById("settingsName");
    const settingsPhoneInput = document.getElementById("settingsPhone");
    const settingsLocationSelect = document.getElementById("settingsLocation");

    const userNameDisplay = document.getElementById("userNameDisplay");
    const userLocationDisplay = document.getElementById("userLocationDisplay");
    const avatarInitials = document.getElementById("avatarInitials");
    const userAvatar = document.getElementById("userAvatar");
    const avatarGlow = document.getElementById("avatarGlow");
    const saveStatus = document.getElementById("saveStatus");

    const myListingsGrid = document.getElementById("myListingsGrid");
    const myRentalsGrid = document.getElementById("myRentalsGrid");
    const myFavoritesGrid = document.getElementById("myFavoritesGrid");
    const addListingForm = document.getElementById("addListingForm");

    // Image Upload Elements
    const listingImageInput = document.getElementById("listingImageInput");
    const imageUploadBox = document.getElementById("imageUploadBox");
    const listingImageUrlInput = document.getElementById("listingImageUrl");
    const imagePreviewContainer = document.getElementById("imagePreviewContainer");
    const imagePreview = document.getElementById("imagePreview");
    const removeImageBtn = document.getElementById("removeImageBtn");

    // ================= STATE =================
    let authMethod = "email";
    let regAuthMethod = "email";
    let uploadedImageData = "";

    let userProfile = safeJSONParse(localStorage.getItem("qoshni_profile"), null) || {
        name: "Ali",
        phone: "+998 (90) 123-45-67",
        location: "Toshkent, Yunusobod",
        color: "purple"
    };

    const defaultListings = [
        { id: "user-l1", title: "Drel Makita 18V", price: 80000, category: "Asboblar", period: "kun", visual: "drill", views: 45, rentals: 3 },
        { id: "user-l2", title: "Tog' velosipedi Kross", price: 120000, category: "Transport", period: "kun", visual: "bicycle", views: 120, rentals: 8 }
    ];

    const defaultRentals = [
        { id: "r1", title: "MacBook Pro 14\"", price: 200000, period: "soat", status: "active", info: "Muddati: Bugun 20:00 gacha (Qolgan vaqt: 3 soat)", visual: "laptop" },
        { id: "r2", title: "Canon EOS R6", price: 180000, period: "kun", status: "completed", info: "Muddati: Kecha 18:00 gacha (Topshirildi)", visual: "camera" }
    ];

    let userListings = safeJSONParse(localStorage.getItem("qoshni_listings"), null) || defaultListings;
    if (!localStorage.getItem("qoshni_listings")) {
        localStorage.setItem("qoshni_listings", JSON.stringify(defaultListings));
    }

    let userRentals = defaultRentals;
    let userFavorites = safeJSONParse(localStorage.getItem("qoshni_favorites"), []);

    // ================= UTILITIES =================

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function escapeHTML(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // ================= SAFE STORAGE HELPERS =================
    // localStorage ma'lumotlari tashqi tomondan buzilgan/noto'g'ri bo'lishi
    // mumkin (masalan boshqa skript yoki qo'lda o'zgartirilgan bo'lsa).
    // JSON.parse xato bersa butun sahifa ishlamay qolmasligi kerak.
    function safeJSONParse(raw, fallback) {
        if (!raw) return fallback;
        try {
            const parsed = JSON.parse(raw);
            return parsed === null || parsed === undefined ? fallback : parsed;
        } catch (err) {
            return fallback;
        }
    }

    // ================= PASSWORD HASHING (SHA-256) =================
    // MUHIM: bu faqat brauzer ichida (client-side, backendsiz) demo himoya.
    // Parolni ochiq matnda saqlash o'rniga hash qilib saqlaymiz, shunda
    // localStorage'ni ko'rgan odam parolni to'g'ridan-to'g'ri o'qiy olmaydi.
    // Lekin haqiqiy xavfsizlik faqat SERVER TOMONIDA (backendda) ta'minlanadi —
    // chinakam ishlab chiqarish (production) tizimida parollar hech qachon
    // brauzerda (localStorage'da) saqlanmasligi kerak.
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // ================= LOGIN RATE LIMITING =================
    // Ketma-ket noto'g'ri urinishlardan keyin vaqtinchalik bloklash —
    // parolni "sinab ko'rish" (brute-force) hujumlarini qiyinlashtiradi.
    const MAX_LOGIN_ATTEMPTS = 5;
    const LOCKOUT_MS = 60 * 1000; // 1 daqiqa

    function getLoginAttemptState() {
        return safeJSONParse(localStorage.getItem("qoshni_login_attempts"), { count: 0, lockedUntil: 0 });
    }
    function setLoginAttemptState(state) {
        localStorage.setItem("qoshni_login_attempts", JSON.stringify(state));
    }
    function isLoginLocked() {
        const state = getLoginAttemptState();
        return state.lockedUntil && Date.now() < state.lockedUntil;
    }
    function registerFailedLogin() {
        const state = getLoginAttemptState();
        state.count = (state.count || 0) + 1;
        if (state.count >= MAX_LOGIN_ATTEMPTS) {
            state.lockedUntil = Date.now() + LOCKOUT_MS;
            state.count = 0;
        }
        setLoginAttemptState(state);
    }
    function clearLoginAttempts() {
        setLoginAttemptState({ count: 0, lockedUntil: 0 });
    }

    // ================= SAFE IMAGE URL VALIDATION =================
    // Faqat http/https havolalariga ruxsat beramiz (javascript:, vbscript:,
    // file: kabi zararli protokollarni rad etamiz). data: URL faqat
    // FileReader orqali (fayl yuklashdan) kelganda, shu funksiyani chetlab
    // o'tib to'g'ridan-to'g'ri ishlatiladi — foydalanuvchi qo'lda data: URL
    // kiritishining o'zi rad etiladi.
    function isSafeImageURL(url) {
        try {
            const parsed = new URL(url, window.location.href);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch (err) {
            return false;
        }
    }

    const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4 MB

    // ================= INIT UI =================

    function initUI() {
        if (!userProfile) return;

        if (userNameDisplay) userNameDisplay.textContent = userProfile.name;
        if (userLocationDisplay) userLocationDisplay.textContent = userProfile.location;
        if (avatarInitials) avatarInitials.textContent = userProfile.name.charAt(0).toUpperCase();

        if (userAvatar) {
            userAvatar.className = "avatar-main";
            userAvatar.classList.add("avatar-" + (userProfile.color || "purple"));
        }
        if (avatarGlow) {
            avatarGlow.className = "avatar-glow";
            avatarGlow.classList.add("glow-" + (userProfile.color || "purple"));
        }

        if (settingsNameInput) settingsNameInput.value = userProfile.name;
        if (settingsPhoneInput) settingsPhoneInput.value = userProfile.phone;
        if (settingsLocationSelect) settingsLocationSelect.value = userProfile.location;

        const colorRadio = document.querySelector('input[name="avatarColor"][value="' + (userProfile.color || "purple") + '"]');
        if (colorRadio) colorRadio.checked = true;

        renderListings();
        renderRentals();
        renderFavorites();
    }

    // ================= TAB NAVIGATION =================

    function switchTab(tabId) {
        const hasMatchingTabButton = Array.from(tabButtons).some(
            btn => btn.dataset.tab === tabId
        );
        if (hasMatchingTabButton) {
            tabButtons.forEach(btn => {
                btn.classList.toggle("active", btn.dataset.tab === tabId);
            });
        }
        tabPanels.forEach(panel => {
            panel.classList.toggle("active", panel.id === tabId);
        });
    }

    // ================= RENDER FUNCTIONS =================

    function getVisualHTML(item) {
        if (typeof item === "object" && item.image) {
            return '<img src="' + escapeHTML(item.image) + '" alt="' + escapeHTML(item.title || "") + '" class="mini-card-img">';
        }
        const visual = typeof item === "object" ? item.visual : item;
        if (visual === "drill") return '<div class="drill-mini"></div>';
        if (visual === "bicycle") return '<div class="bicycle-mini"></div>';
        if (visual === "laptop") return '<div class="laptop-mini"></div>';
        if (visual === "camera") return '<div class="camera-mini"></div>';
        return '<div class="box-mini"></div>';
    }

    function renderListings() {
        if (!myListingsGrid) return;
        myListingsGrid.innerHTML = "";

        if (userListings.length === 0) {
            myListingsGrid.innerHTML = '<div class="empty-message">Sizda hozircha faol ijaraga qo\'yilgan narsalar yo\'q. Yangi e\'lon qo\'shishingiz mumkin.</div>';
            return;
        }

        userListings.forEach(item => {
            const article = document.createElement("article");
            article.className = "mini-card listing-card";
            article.innerHTML =
                '<div class="mini-card-visual">' + getVisualHTML(item) + '</div>' +
                '<div class="mini-card-info">' +
                    '<h4>' + escapeHTML(item.title) + '</h4>' +
                    '<strong>' + formatNumber(item.price) + ' so\'m <small>/ ' + item.period + '</small></strong>' +
                    '<p>Ko\'rishlar: ' + (item.views || 0) + ' • Ijaraga berilgan: ' + (item.rentals || 0) + ' marta</p>' +
                '</div>' +
                '<div class="mini-card-actions">' +
                    '<button class="btn-delete" title="O\'chirish">' +
                        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                            '<polyline points="3 6 5 6 21 6"></polyline>' +
                            '<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>' +
                        '</svg>' +
                    '</button>' +
                '</div>';

            article.querySelector(".btn-delete").addEventListener("click", () => {
                deleteListing(item.id);
            });

            myListingsGrid.appendChild(article);
        });
    }

    function renderRentals() {
        if (!myRentalsGrid) return;
        myRentalsGrid.innerHTML = "";

        if (userRentals.length === 0) {
            myRentalsGrid.innerHTML = '<div class="empty-message">Siz hozircha hech narsani ijaraga olmadingiz.</div>';
            return;
        }

        userRentals.forEach(item => {
            const statusClass = item.status === "active" ? "active" : "completed";
            const statusText = item.status === "active" ? "Faol ijara" : "Yakunlangan";

            const article = document.createElement("article");
            article.className = "mini-card rental-card";
            article.innerHTML =
                '<div class="mini-card-visual">' + getVisualHTML(item) + '</div>' +
                '<div class="mini-card-info">' +
                    '<h4>' + escapeHTML(item.title) + '</h4>' +
                    '<strong>' + formatNumber(item.price) + ' so\'m <small>/ ' + item.period + '</small></strong>' +
                    '<div class="rental-status ' + statusClass + '">' + statusText + '</div>' +
                    '<p>' + escapeHTML(item.info) + '</p>' +
                '</div>' +
                '<div class="mini-card-actions">' +
                    '<button class="btn btn-secondary contact-btn">' + (item.status === "active" ? "Aloqa" : "Qayta ijaralash") + '</button>' +
                '</div>';

            myRentalsGrid.appendChild(article);
        });
    }

    function renderFavorites() {
        if (!myFavoritesGrid) return;
        myFavoritesGrid.innerHTML = "";

        if (userFavorites.length === 0) {
            myFavoritesGrid.innerHTML = '<div class="empty-message">Sevimlilaringiz bo\'sh. Bosh sahifadagi mahsulotlarga "♡" belgisini bosib qo\'shishingiz mumkin.</div>';
            return;
        }

        userFavorites.forEach(item => {
            const article = document.createElement("article");
            article.className = "mini-card favorite-card";
            article.innerHTML =
                '<div class="mini-card-visual">' + getVisualHTML(item) + '</div>' +
                '<div class="mini-card-info">' +
                    '<h4>' + escapeHTML(item.title) + '</h4>' +
                    '<strong>' + formatNumber(item.price) + ' so\'m <small>/ ' + (item.period || "kun") + '</small></strong>' +
                    '<p>' + escapeHTML(item.location || "Toshkent") + '</p>' +
                '</div>' +
                '<div class="mini-card-actions">' +
                    '<a href="index.html" class="btn btn-secondary" style="width:auto;padding:0 16px;height:36px;border-radius:8px;">Ko\'rish</a>' +
                '</div>';

            myFavoritesGrid.appendChild(article);
        });
    }

    // ================= MODE TOGGLE =================

    function showLoginMode() {
        if (loginSection) loginSection.classList.remove("hidden");
        if (registerSection) registerSection.classList.add("hidden");
        if (loginNote) loginNote.classList.remove("hidden");
        if (registerNote) registerNote.classList.add("hidden");
        if (modeLoginBtn) modeLoginBtn.classList.add("active");
        if (modeRegisterBtn) modeRegisterBtn.classList.remove("active");
        if (loginError) loginError.textContent = "";
    }

    function showRegisterMode() {
        if (loginSection) loginSection.classList.add("hidden");
        if (registerSection) registerSection.classList.remove("hidden");
        if (loginNote) loginNote.classList.add("hidden");
        if (registerNote) registerNote.classList.remove("hidden");
        if (modeRegisterBtn) modeRegisterBtn.classList.add("active");
        if (modeLoginBtn) modeLoginBtn.classList.remove("active");
        if (registerError) registerError.textContent = "";
    }

    if (modeLoginBtn) modeLoginBtn.addEventListener("click", showLoginMode);
    if (modeRegisterBtn) modeRegisterBtn.addEventListener("click", showRegisterMode);
    if (switchToRegister) switchToRegister.addEventListener("click", (e) => { e.preventDefault(); showRegisterMode(); });
    if (switchToLogin) switchToLogin.addEventListener("click", (e) => { e.preventDefault(); showLoginMode(); });

    // ================= LOGIN TABS =================

    if (tabEmail) tabEmail.addEventListener("click", () => {
        authMethod = "email";
        tabEmail.classList.add("active");
        tabPhone.classList.remove("active");
        emailGroup.classList.remove("hidden");
        phoneGroup.classList.add("hidden");
        loginEmailInput.required = true;
        loginPhoneInput.required = false;
        loginPhoneInput.value = "";
        loginError.textContent = "";
    });

    if (tabPhone) tabPhone.addEventListener("click", () => {
        authMethod = "phone";
        tabPhone.classList.add("active");
        tabEmail.classList.remove("active");
        phoneGroup.classList.remove("hidden");
        emailGroup.classList.add("hidden");
        loginPhoneInput.required = true;
        loginEmailInput.required = false;
        loginEmailInput.value = "";
        loginError.textContent = "";
    });

    // ================= REGISTER TABS =================

    if (regTabEmail) regTabEmail.addEventListener("click", () => {
        regAuthMethod = "email";
        regTabEmail.classList.add("active");
        regTabPhone.classList.remove("active");
        regEmailGroup.classList.remove("hidden");
        regPhoneGroup.classList.add("hidden");
        regEmailInput.required = true;
        regPhoneInput.required = false;
        regPhoneInput.value = "";
        registerError.textContent = "";
    });

    if (regTabPhone) regTabPhone.addEventListener("click", () => {
        regAuthMethod = "phone";
        regTabPhone.classList.add("active");
        regTabEmail.classList.remove("active");
        regPhoneGroup.classList.remove("hidden");
        regEmailGroup.classList.add("hidden");
        regPhoneInput.required = true;
        regEmailInput.required = false;
        regEmailInput.value = "";
        registerError.textContent = "";
    });

    // ================= FORGOT PASSWORD =================

    if (forgotPasswordBtn) forgotPasswordBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        forgotModal.classList.remove("hidden");

        if (authMethod === "phone") {
            forgotDesc.textContent = "Telefon raqamingizni kiriting, sizga parolni tiklash kodini yuboramiz.";
            forgotEmailGroup.classList.add("hidden");
            forgotPhoneGroup.classList.remove("hidden");
        } else {
            forgotDesc.textContent = "Email manzilingizni kiriting, sizga parolni tiklash havolasini yuboramiz.";
            forgotPhoneGroup.classList.add("hidden");
            forgotEmailGroup.classList.remove("hidden");
        }
    });

    if (forgotBackBtn) forgotBackBtn.addEventListener("click", () => {
        forgotModal.classList.add("hidden");
        loginForm.style.display = "";
    });

    if (forgotSendBtn) forgotSendBtn.addEventListener("click", () => {
        if (authMethod === "phone") {
            const phone = forgotPhoneInput.value.trim();
            if (!phone || phone.length < 10) {
                alert("Iltimos, to'g'ri telefon raqamini kiriting.");
                return;
            }
            alert("Parolni tiklash kodini " + phone + " raqamiga yuborildi!");
        } else {
            const email = forgotEmailInput.value.trim();
            if (!email) {
                alert("Iltimos, email manzilini kiriting.");
                return;
            }
            alert("Parolni tiklash havolasi " + email + " manziliga yuborildi!");
        }
        forgotModal.classList.add("hidden");
        loginForm.style.display = "";
    });

    // ================= LOGIN SUBMIT =================

    if (loginForm) loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (isLoginLocked()) {
            loginError.textContent = "Juda ko'p noto'g'ri urinish. Iltimos, birozdan so'ng qaytadan urining.";
            return;
        }

        const password = loginPasswordInput.value.trim();

        if (password.length < 4) {
            loginError.textContent = "Parol kamida 4 ta belgi bo'lishi kerak.";
            loginPasswordInput.focus();
            return;
        }

        const registeredUsers = safeJSONParse(localStorage.getItem("qoshni_users"), []);
        const passwordHash = await hashPassword(password);

        if (authMethod === "email") {
            const email = loginEmailInput.value.trim().toLowerCase();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                loginError.textContent = "Iltimos, to'g'ri email manzilini kiriting.";
                loginEmailInput.focus();
                return;
            }

            const foundUser = registeredUsers.find(u => u.email === email && u.passwordHash === passwordHash);
            if (!foundUser) {
                registerFailedLogin();
                loginError.textContent = "Email yoki parol noto'g'ri. Qaytadan urinib ko'ring.";
                loginEmailInput.focus();
                return;
            }

            clearLoginAttempts();
            localStorage.setItem("qoshni_logged_in", "true");
            localStorage.setItem("qoshni_email", email);
            localStorage.setItem("qoshni_profile", JSON.stringify({
                name: foundUser.name,
                phone: foundUser.phone || "+998 (90) 123-45-67",
                location: "Toshkent, Yunusobod",
                color: "purple",
                email: email
            }));

            loginOverlay.classList.add("hidden");
            profileMain.style.display = "";
            userProfile = safeJSONParse(localStorage.getItem("qoshni_profile"), userProfile);
            initUI();

        } else {
            const phone = loginPhoneInput.value.trim();
            if (phone.length < 10) {
                loginError.textContent = "Iltimos, to'g'ri telefon raqamini kiriting.";
                loginPhoneInput.focus();
                return;
            }

            const foundUser = registeredUsers.find(u => u.phone === phone && u.passwordHash === passwordHash);
            if (!foundUser) {
                registerFailedLogin();
                loginError.textContent = "Telefon raqam yoki parol noto'g'ri. Qaytadan urinib ko'ring.";
                loginPhoneInput.focus();
                return;
            }

            clearLoginAttempts();
            localStorage.setItem("qoshni_logged_in", "true");
            localStorage.setItem("qoshni_phone", phone);
            localStorage.setItem("qoshni_profile", JSON.stringify({
                name: foundUser.name,
                phone: phone,
                location: "Toshkent, Yunusobod",
                color: "purple"
            }));

            loginOverlay.classList.add("hidden");
            profileMain.style.display = "";
            userProfile = safeJSONParse(localStorage.getItem("qoshni_profile"), userProfile);
            initUI();
        }
    });

    // ================= REGISTER SUBMIT =================

    if (registerForm) registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = regNameInput.value.trim().slice(0, 80);
        const password = regPasswordInput.value.trim();
        const passwordConfirm = regPasswordConfirmInput.value.trim();

        if (name.length < 2) {
            registerError.textContent = "Ism kamida 2 ta belgi bo'lishi kerak.";
            regNameInput.focus();
            return;
        }

        if (password.length < 6) {
            registerError.textContent = "Parol kamida 6 ta belgi bo'lishi kerak.";
            regPasswordInput.focus();
            return;
        }

        if (password !== passwordConfirm) {
            registerError.textContent = "Parollar mos kelmaydi. Qaytadan kiriting.";
            regPasswordConfirmInput.focus();
            return;
        }

        const passwordHash = await hashPassword(password);

        if (regAuthMethod === "email") {
            const email = regEmailInput.value.trim().toLowerCase();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                registerError.textContent = "Iltimos, to'g'ri email manzilini kiriting.";
                regEmailInput.focus();
                return;
            }

            const registeredUsers = safeJSONParse(localStorage.getItem("qoshni_users"), []);
            if (registeredUsers.some(u => u.email === email)) {
                registerError.textContent = "Bu email allaqachon ro'yxatdan o'tgan. Kirish sahifasiga o'ting.";
                regEmailInput.focus();
                return;
            }

            registeredUsers.push({ name: name, email: email, phone: "", passwordHash: passwordHash });
            localStorage.setItem("qoshni_users", JSON.stringify(registeredUsers));

            localStorage.setItem("qoshni_logged_in", "true");
            localStorage.setItem("qoshni_email", email);
            localStorage.setItem("qoshni_profile", JSON.stringify({
                name: name,
                phone: "+998 (90) 123-45-67",
                location: "Toshkent, Yunusobod",
                color: "purple",
                email: email
            }));

        } else {
            const phone = regPhoneInput.value.trim();
            if (phone.length < 10) {
                registerError.textContent = "Iltimos, to'g'ri telefon raqamini kiriting.";
                regPhoneInput.focus();
                return;
            }

            const registeredUsers = safeJSONParse(localStorage.getItem("qoshni_users"), []);
            if (registeredUsers.some(u => u.phone === phone)) {
                registerError.textContent = "Bu telefon raqam allaqachon ro'yxatdan o'tgan. Kirish sahifasiga o'ting.";
                regPhoneInput.focus();
                return;
            }

            registeredUsers.push({ name: name, email: "", phone: phone, passwordHash: passwordHash });
            localStorage.setItem("qoshni_users", JSON.stringify(registeredUsers));

            localStorage.setItem("qoshni_logged_in", "true");
            localStorage.setItem("qoshni_phone", phone);
            localStorage.setItem("qoshni_profile", JSON.stringify({
                name: name,
                phone: phone,
                location: "Toshkent, Yunusobod",
                color: "purple"
            }));
        }

        clearLoginAttempts();
        loginOverlay.classList.add("hidden");
        profileMain.style.display = "";
        userProfile = safeJSONParse(localStorage.getItem("qoshni_profile"), userProfile);
        initUI();
    });

    // ================= TAB BUTTONS =================

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            switchTab(button.dataset.tab);
        });
    });

    if (addListingBtn) addListingBtn.addEventListener("click", () => {
        switchTab("add-listing");
    });

    if (editProfileBtn) editProfileBtn.addEventListener("click", () => {
        switchTab("settings");
    });

    if (cancelAddListingBtn) cancelAddListingBtn.addEventListener("click", () => {
        switchTab("my-listings");
    });

    // ================= LOGOUT =================

    if (logoutBtn) logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("qoshni_logged_in");
        localStorage.removeItem("qoshni_email");
        localStorage.removeItem("qoshni_phone");
        loginOverlay.classList.remove("hidden");
        profileMain.style.display = "none";
        loginEmailInput.value = "";
        loginPhoneInput.value = "";
        loginPasswordInput.value = "";
        loginForm.style.display = "";
        showLoginMode();
        if (forgotModal) forgotModal.classList.add("hidden");
        if (tabEmail) tabEmail.click();
    });

    // ================= SETTINGS FORM =================

    if (settingsForm) settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const selectedColorRadio = document.querySelector('input[name="avatarColor"]:checked');
        const color = selectedColorRadio ? selectedColorRadio.value : "purple";

        const newName = settingsNameInput.value.trim().slice(0, 80);
        if (!newName) {
            if (saveStatus) {
                saveStatus.textContent = "Ism bo'sh bo'lishi mumkin emas.";
                saveStatus.className = "save-status error";
            }
            return;
        }

        userProfile = {
            name: newName,
            phone: settingsPhoneInput.value.trim().slice(0, 30),
            location: settingsLocationSelect.value,
            color: color
        };

        localStorage.setItem("qoshni_profile", JSON.stringify(userProfile));

        if (userNameDisplay) userNameDisplay.textContent = userProfile.name;
        if (userLocationDisplay) userLocationDisplay.textContent = userProfile.location;
        if (avatarInitials) avatarInitials.textContent = userProfile.name.charAt(0).toUpperCase();

        if (userAvatar) {
            userAvatar.className = "avatar-main";
            userAvatar.classList.add("avatar-" + color);
        }
        if (avatarGlow) {
            avatarGlow.className = "avatar-glow";
            avatarGlow.classList.add("glow-" + color);
        }

        if (saveStatus) {
            saveStatus.textContent = "Muvaffaqiyatli saqlandi!";
            saveStatus.className = "save-status success";
            setTimeout(() => {
                saveStatus.className = "save-status";
            }, 3000);
        }
    });

    // ================= ADD LISTING FORM =================

    if (addListingForm) addListingForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("listingTitle").value.trim().slice(0, 120);
        const category = document.getElementById("listingCategory").value;
        const price = parseInt(document.getElementById("listingPrice").value, 10);
        const period = document.getElementById("listingPeriod").value;
        const visual = document.getElementById("listingVisual").value;

        if (!title) {
            alert("Iltimos, mahsulot nomini kiriting.");
            return;
        }
        if (!Number.isFinite(price) || price <= 0) {
            alert("Iltimos, to'g'ri ijara narxini kiriting.");
            return;
        }
        if (uploadedImageData && !uploadedImageData.startsWith("data:image/") && !isSafeImageURL(uploadedImageData)) {
            alert("Rasm manzili noto'g'ri.");
            return;
        }

        const newListing = {
            id: "user-l-" + Date.now(),
            title: title,
            category: category,
            price: price,
            period: period,
            visual: visual,
            image: uploadedImageData,
            views: 0,
            rentals: 0
        };

        userListings.unshift(newListing);
        localStorage.setItem("qoshni_listings", JSON.stringify(userListings));

        renderListings();
        addListingForm.reset();
        clearImagePreview();
        switchTab("my-listings");
    });

    // ================= DELETE LISTING =================

    window.deleteListing = function(id) {
        if (confirm("Haqiqatan ham bu e'lonni o'chirishni xohlaysizmi?")) {
            userListings = userListings.filter(item => item.id !== id);
            localStorage.setItem("qoshni_listings", JSON.stringify(userListings));
            renderListings();
        }
    };

    // ================= IMAGE UPLOAD =================

    const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

    function handleFileSelect(file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            alert("Iltimos, faqat PNG, JPEG, WEBP yoki GIF rasm faylini tanlang.");
            return;
        }
        if (file.size > MAX_IMAGE_BYTES) {
            alert("Rasm hajmi 4 MB dan oshmasligi kerak.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.onerror = () => {
            alert("Rasmni o'qishda xatolik yuz berdi.");
        };
        reader.readAsDataURL(file);
    }

    function setPreviewImage(src) {
        uploadedImageData = src;
        if (imagePreview) imagePreview.src = src;
        if (imagePreviewContainer) imagePreviewContainer.classList.remove("hidden");
    }

    function clearImagePreview() {
        uploadedImageData = "";
        if (imagePreview) imagePreview.src = "";
        if (imagePreviewContainer) imagePreviewContainer.classList.add("hidden");
        if (listingImageInput) listingImageInput.value = "";
        if (listingImageUrlInput) listingImageUrlInput.value = "";
    }

    if (imageUploadBox) {
        imageUploadBox.addEventListener("click", () => {
            if (listingImageInput) listingImageInput.click();
        });
        imageUploadBox.addEventListener("dragover", (e) => {
            e.preventDefault();
            imageUploadBox.classList.add("drag-over");
        });
        imageUploadBox.addEventListener("dragleave", () => {
            imageUploadBox.classList.remove("drag-over");
        });
        imageUploadBox.addEventListener("drop", (e) => {
            e.preventDefault();
            imageUploadBox.classList.remove("drag-over");
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleFileSelect(e.dataTransfer.files[0]);
            }
        });
    }

    if (listingImageInput) {
        listingImageInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    if (listingImageUrlInput) {
        listingImageUrlInput.addEventListener("input", (e) => {
            const url = e.target.value.trim();
            if (url) {
                if (!isSafeImageURL(url)) {
                    alert("Iltimos, faqat http:// yoki https:// bilan boshlanadigan to'g'ri rasm havolasini kiriting.");
                    e.target.value = "";
                    return;
                }
                setPreviewImage(url);
            } else if (!listingImageInput.files || !listingImageInput.files[0]) {
                clearImagePreview();
            }
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener("click", () => {
            clearImagePreview();
        });
    }

    // ================= TARJIMA & TEMA =================

    initLanguageSwitcher(() => {
        renderListings();
        renderRentals();
        renderFavorites();
    });
    initThemeSwitcher();

    // ================= AUTO-LOGIN & INIT =================
    // Barcha DOM elementlari va funksiyalar aniqlangandan KEYIN ishlaydi

    const isLoggedIn = localStorage.getItem("qoshni_logged_in") === "true";
    const savedEmail = localStorage.getItem("qoshni_email") || "";
    const savedPhone = localStorage.getItem("qoshni_phone") || "";

    if (isLoggedIn && (savedEmail || savedPhone)) {
        loginOverlay.classList.add("hidden");
        profileMain.style.display = "";
        userProfile = JSON.parse(localStorage.getItem("qoshni_profile")) || userProfile;
    }

    // UI ni ishga tushirish
    initUI();
});

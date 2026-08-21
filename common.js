/* =====================================================
   QOSHNI UZZ — UMUMIY (SHARED) MODUL
   Tarjimalar, til svitcher, tema svitcher va Nexus fon
   animatsiyasi — index.html va profile.html ikkalasida
   ham ishlatiladi (avval har ikki faylda alohida-alohida
   yozilgan edi).
===================================================== */

/* ================= MULTI-LANGUAGE TRANSLATIONS (UZ, RU, EN, ZH) ================= */
const translations = {
    uz: {
        theme_dark: "Qorong'u",
        theme_light: "Oq",
        theme_cyber: "Moviy",
        theme_nexus: "Neon Kosmos",
        hero_title: "Kerakli narsani ijaraga ol.",
        hero_subtitle: "Qoshningizdagidan osongina toping va ijaraga oling.",
        search_placeholder: "Nima kerak? Masalan: Velosiped, Drel, Kamera...",
        cat_elec: "Elektronika",
        cat_gaming: "Gaming",
        cat_camera: "Kamera",
        cat_tools: "Asboblar",
        cat_transport: "Transport",
        cat_other: "Boshqa",
        popular_title: "Mashhur ijaralar",
        btn_view_all: "Barchasini ko'rish",
        per_hour: "/ soat",
        per_day: "/ kun",
        benq_projector: "Proyektor BenQ",
        slide1_badge: "🔥 Eng mashhur asboblar",
        slide1_title: "Drel va Perforatorlar",
        slide1_subtitle: "Uy va qurilish ishlari uchun baquvvat drel va perforatorlarni kuniga 50,000 so'mdan ijaraga oling.",
        slide2_badge: "⚡️ Ta'mirlash uchun",
        slide2_title: "Balgarka va Silliqlash mashinasi",
        slide2_subtitle: "Metall va tosh kesish uchun burchakli silliqlash uskunalarini qulay narxlarda toping.",
        slide3_badge: "🎵 Bayram & Tadbirlar",
        slide3_title: "JBL va Partybox Kalonkalar",
        slide3_subtitle: "Tug'ilgan kun, bayram va pikniklar uchun kuchli basli akustik kalonkalarni ijaralang.",
        slide4_badge: "🚲 Faol dam olish",
        slide4_title: "Tog' velosipedlari & Samokat",
        slide4_subtitle: "Shahar va tabiat qo'ynida sayr qilish uchun sifatli velosipedlarni ijaraga oling.",
        btn_rent_now: "Ijaraga olish",
        btn_view_items: "Barchasini ko'rish",
        btn_audio_rent: "Ovoz tizimlari",
        btn_explore: "Sayrga chiqish",
        user_role: "Qo'shni (Ijara beruvchi)",
        label_location: "Manzil:",
        label_rating: "Reyting:",
        label_membership: "A'zolik:",
        ratings_count: "(12 ta baho)",
        btn_add_listing: "E'lon joylashtirish",
        tab_my_listings: "Mening e'lonlarim",
        tab_my_rentals: "Ijaralarim",
        tab_favorites: "Sevimlilar",
        tab_settings: "Sozlamalar",
        header_my_listings: "Faol ijaradagi e'lonlaringiz",
        header_my_rentals: "Ijaraga olingan narsalar",
        header_favorites: "Tanlangan mahsulotlar (Sevimlilar)",
        header_settings: "Profil sozlamalari",
        header_add_listing: "Yangi ijaraga beriladigan e'lon qo'shish",
        label_name: "To'liq ismingiz",
        label_phone: "Telefon raqam",
        label_settings_location: "Hudud / Manzil",
        label_avatar_color: "Profil rangi (Avatar)",
        btn_save_settings: "Sozlamalarni saqlash",
        label_title: "Mahsulot nomi",
        label_category: "Kategoriya",
        label_price: "Ijara narxi (so'mda)",
        label_period: "Ijara muddati turi",
        label_visual: "Zahira ikonka (Rasm bo'lmasa)",
        label_image: "Mahsulot rasmi",
        text_upload_drag: "Rasm faylini tanlash yoki bu yerga tashlash",
        text_url_or: "yoki Rasm havolasini (URL) kiriting:",
        btn_post_listing: "E'lonni joylashtirish",
        btn_cancel: "Bekor qilish",
        period_day: "Kuniga",
        period_hour: "Soatiga",
        footer_slogan: "Kerakli narsani ijaraga ol.",
        footer_help: "Yordam",
        footer_about: "Biz haqimizda",
        footer_contact: "Aloqa"
    },
    ru: {
        theme_dark: "Тёмная",
        theme_light: "Светлая",
        theme_cyber: "Кибер",
        theme_nexus: "Неон Космос",
        hero_title: "Арендуйте то, что вам нужно.",
        hero_subtitle: "Легко находите и арендуйте у соседей в вашем районе.",
        search_placeholder: "Что вы ищете? Например: Велосипед, Дрель...",
        cat_elec: "Электроника",
        cat_gaming: "Игры",
        cat_camera: "Камеры",
        cat_tools: "Инструменты",
        cat_transport: "Транспорт",
        cat_other: "Другое",
        popular_title: "Популярная аренда",
        btn_view_all: "Смотреть все",
        per_hour: "/ час",
        per_day: "/ день",
        benq_projector: "Проектор BenQ",
        slide1_badge: "🔥 Самые популярные инструменты",
        slide1_title: "Дрели и Перфораторы",
        slide1_subtitle: "Арендуйте мощные дрели и перфораторы от 50,000 сумов в день.",
        slide2_badge: "⚡️ Для ремонта",
        slide2_title: "Болгарки и Шлифмашины",
        slide2_subtitle: "Найдите угловые шлифмашины для резки металла и камня по выгодным ценам.",
        slide3_badge: "🎵 Праздники и Мероприятия",
        slide3_title: "Колонки JBL и Partybox",
        slide3_subtitle: "Арендуйте акустические колонки с сильными басами для праздников и пикников.",
        slide4_badge: "🚲 Активный отдых",
        slide4_title: "Горные велосипеды и Самокаты",
        slide4_subtitle: "Арендуйте качественные велосипеды для прогулок по городу и природе.",
        btn_rent_now: "Арендовать",
        btn_view_items: "Смотреть все",
        btn_audio_rent: "Аудиосистемы",
        btn_explore: "Выбрать транспорт",
        user_role: "Сосед (Арендодатель)",
        label_location: "Адрес:",
        label_rating: "Рейтинг:",
        label_membership: "Членство:",
        ratings_count: "(12 отзывов)",
        btn_add_listing: "Разместить объявление",
        tab_my_listings: "Мои объявления",
        tab_my_rentals: "Мои аренды",
        tab_favorites: "Избранное",
        tab_settings: "Настройки",
        header_my_listings: "Ваши активные объявления",
        header_my_rentals: "Арендованные вещи",
        header_favorites: "Избранные товары",
        header_settings: "Настройки профиля",
        header_add_listing: "Добавить новое объявление",
        label_name: "Ваше полное имя",
        label_phone: "Номер телефона",
        label_settings_location: "Район / Адрес",
        label_avatar_color: "Цвет профиля (Аватар)",
        btn_save_settings: "Сохранить настройки",
        label_title: "Название товара",
        label_category: "Категория",
        label_price: "Цена аренды (в сумах)",
        label_period: "Тип срока аренды",
        label_visual: "Резервная иконка (без фото)",
        label_image: "Изображение товара",
        text_upload_drag: "Выберите файл изображения или перетащите сюда",
        text_url_or: "или введите ссылку на изображение (URL):",
        btn_post_listing: "Опубликовать объявление",
        btn_cancel: "Отмена",
        period_day: "В день",
        period_hour: "В час",
        footer_slogan: "Арендуйте то, что вам нужно.",
        footer_help: "Помощь",
        footer_about: "О нас",
        footer_contact: "Контакты"
    },
    en: {
        theme_dark: "Dark",
        theme_light: "Light",
        theme_cyber: "Cyber",
        theme_nexus: "Neon Nexus",
        hero_title: "Rent whatever you need.",
        hero_subtitle: "Easily find and rent from neighbors around you.",
        search_placeholder: "What do you need? e.g. Bicycle, Drill...",
        cat_elec: "Electronics",
        cat_gaming: "Gaming",
        cat_camera: "Cameras",
        cat_tools: "Tools",
        cat_transport: "Transport",
        cat_other: "Other",
        popular_title: "Popular Rentals",
        btn_view_all: "View All",
        per_hour: "/ hour",
        per_day: "/ day",
        benq_projector: "BenQ Projector",
        slide1_badge: "🔥 Most Popular Tools",
        slide1_title: "Drills & Rotary Hammers",
        slide1_subtitle: "Rent powerful drills and rotary hammers starting at 50,000 UZS/day.",
        slide2_badge: "⚡️ For Renovation",
        slide2_title: "Angle Grinders & Sanders",
        slide2_subtitle: "Find angle grinders for cutting metal and stone at great rental rates.",
        slide3_badge: "🎵 Parties & Events",
        slide3_title: "JBL & Partybox Speakers",
        slide3_subtitle: "Rent acoustic speakers with heavy bass for birthdays, parties, and picnics.",
        slide4_badge: "🚲 Outdoor & Mobility",
        slide4_title: "Mountain Bikes & Scooters",
        slide4_subtitle: "Rent high-quality bicycles for riding through the city and nature.",
        btn_rent_now: "Rent Now",
        btn_view_items: "View All",
        btn_audio_rent: "Audio Systems",
        btn_explore: "Explore Rides",
        user_role: "Neighbor (Lender)",
        label_location: "Location:",
        label_rating: "Rating:",
        label_membership: "Membership:",
        ratings_count: "(12 reviews)",
        btn_add_listing: "Post Listing",
        tab_my_listings: "My Listings",
        tab_my_rentals: "My Rentals",
        tab_favorites: "Favorites",
        tab_settings: "Settings",
        header_my_listings: "Your Active Rental Listings",
        header_my_rentals: "Rented Items",
        header_favorites: "Favorite Products",
        header_settings: "Profile Settings",
        header_add_listing: "Add New Rental Listing",
        label_name: "Full Name",
        label_phone: "Phone Number",
        label_settings_location: "Region / Location",
        label_avatar_color: "Profile Color (Avatar)",
        btn_save_settings: "Save Settings",
        label_title: "Product Title",
        label_category: "Category",
        label_price: "Rental Price (UZS)",
        label_period: "Rental Period",
        label_visual: "Fallback Icon (If no image)",
        label_image: "Product Image",
        text_upload_drag: "Select image file or drag & drop here",
        text_url_or: "or enter Image URL:",
        btn_post_listing: "Publish Listing",
        btn_cancel: "Cancel",
        period_day: "Daily",
        period_hour: "Hourly",
        footer_slogan: "Rent whatever you need.",
        footer_help: "Help",
        footer_about: "About Us",
        footer_contact: "Contact"
    },
    zh: {
        theme_dark: "暗黑",
        theme_light: "明亮",
        theme_cyber: "赛博",
        theme_nexus: "霓虹星空",
        hero_title: "无需购买，租你所需。",
        hero_subtitle: "轻松向附近的邻居租用所需物品。",
        search_placeholder: "您需要什么？例如：自行车、电钻...",
        cat_elec: "电子产品",
        cat_gaming: "游戏",
        cat_camera: "相机",
        cat_tools: "工具",
        cat_transport: "交通工具",
        cat_other: "其他",
        popular_title: "热门出租",
        btn_view_all: "查看全部",
        per_hour: "/ 小时",
        per_day: "/ 天",
        benq_projector: "BenQ 投影仪",
        slide1_badge: "🔥 最热门工具",
        slide1_title: "电钻与电锤",
        slide1_subtitle: "租用强力电钻和电锤，低至每天 50,000 苏姆。",
        slide2_badge: "⚡️ 装修必备",
        slide2_title: "角磨机与砂光机",
        slide2_subtitle: "以优惠价格寻找用于切割金属和石材的角磨机。",
        slide3_badge: "🎵 派对与活动",
        slide3_title: "JBL 与 Partybox 音响",
        slide3_subtitle: "为生日、派对和野餐租用带有强劲低音的音响。",
        slide4_badge: "🚲 户外运动",
        slide4_title: "山地自行车与滑板车",
        slide4_subtitle: "租用优质自行车在城市和自然中骑行。",
        btn_rent_now: "立即租用",
        btn_view_items: "查看全部",
        btn_audio_rent: "音频系统",
        btn_explore: "选择交通工具",
        user_role: "邻居 (出租方)",
        label_location: "地址:",
        label_rating: "评分:",
        label_membership: "会员时间:",
        ratings_count: "(12 条评价)",
        btn_add_listing: "发布出租",
        tab_my_listings: "我的出租",
        tab_my_rentals: "我的租賃",
        tab_favorites: "收藏夹",
        tab_settings: "设置",
        header_my_listings: "您的有效出租项目",
        header_my_rentals: "已租用物品",
        header_favorites: "收藏的产品",
        header_settings: "个人设置",
        header_add_listing: "添加新的出租信息",
        label_name: "全名",
        label_phone: "电话号码",
        label_settings_location: "地区 / 地址",
        label_avatar_color: "头像颜色",
        btn_save_settings: "保存设置",
        label_title: "产品名称",
        label_category: "类别",
        label_price: "租金 (苏姆)",
        label_period: "租赁期限",
        label_visual: "后备图标 (若无图片)",
        label_image: "产品图片",
        text_upload_drag: "选择图片文件或拖放至此处",
        text_url_or: "或输入图片 URL:",
        btn_post_listing: "发布信息",
        btn_cancel: "取消",
        period_day: "每天",
        period_hour: "每小时",
        footer_slogan: "租你所需。",
        footer_help: "帮助",
        footer_about: "关于我们",
        footer_contact: "联系我们"
    }
};

function applyTranslations(lang) {
    const dict = translations[lang] || translations.uz;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) el.placeholder = dict[key];
    });
}

/* ================= LANGUAGE SWITCHER =================
   onLanguageChange: sahifaga xos qo'shimcha ish bo'lsa
   (masalan profildagi kartalarni qayta chizish), shu
   callback orqali beriladi. */
function initLanguageSwitcher(onLanguageChange) {
    const langSelect = document.getElementById("langSelect");
    let currentLang = localStorage.getItem("qoshni_lang") || "uz";

    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener("change", (e) => {
            const lang = e.target.value;
            localStorage.setItem("qoshni_lang", lang);
            applyTranslations(lang);
            initThemeSwitcher();
            if (typeof onLanguageChange === "function") onLanguageChange(lang);
        });
    }
    applyTranslations(currentLang);
}

/* ================= NEXUS ANIMATED CANVAS ENGINE ================= */
let nexusAnimFrame = null;
let nexusCanvas = null;
let nexusCtx = null;
let nexusParticles = [];

function startNexusAnimation() {
    nexusCanvas = document.getElementById("nexusCanvas");
    if (!nexusCanvas) {
        nexusCanvas = document.createElement("canvas");
        nexusCanvas.id = "nexusCanvas";
        nexusCanvas.className = "nexus-canvas";
        document.body.insertBefore(nexusCanvas, document.body.firstChild);
    }

    nexusCtx = nexusCanvas.getContext("2d");

    function resize() {
        if (!nexusCanvas) return;
        nexusCanvas.width = window.innerWidth;
        nexusCanvas.height = window.innerHeight;
    }

    resize();
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);

    nexusParticles = [];
    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 11000), 90);
    for (let i = 0; i < count; i++) {
        nexusParticles.push({
            x: Math.random() * nexusCanvas.width,
            y: Math.random() * nexusCanvas.height,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            radius: Math.random() * 2.2 + 1,
            color: Math.random() > 0.45 ? "#38BDF8" : "#E056FD"
        });
    }

    nexusCanvas.style.display = "block";

    function render() {
        if (document.documentElement.getAttribute("data-theme") !== "nexus") {
            if (nexusCanvas) nexusCanvas.style.display = "none";
            if (nexusAnimFrame) cancelAnimationFrame(nexusAnimFrame);
            return;
        }

        const w = nexusCanvas.width;
        const h = nexusCanvas.height;

        const bgGrad = nexusCtx.createLinearGradient(0, 0, w, h);
        bgGrad.addColorStop(0, "#0D0726");
        bgGrad.addColorStop(0.5, "#080417");
        bgGrad.addColorStop(1, "#03020A");
        nexusCtx.fillStyle = bgGrad;
        nexusCtx.fillRect(0, 0, w, h);

        const topGlow = nexusCtx.createRadialGradient(w * 0.85, h * 0.1, 10, w * 0.85, h * 0.1, w * 0.5);
        topGlow.addColorStop(0, "rgba(224, 86, 253, 0.28)");
        topGlow.addColorStop(1, "rgba(224, 86, 253, 0)");
        nexusCtx.fillStyle = topGlow;
        nexusCtx.fillRect(0, 0, w, h);

        const botGlow = nexusCtx.createRadialGradient(w * 0.15, h * 0.9, 10, w * 0.15, h * 0.9, w * 0.5);
        botGlow.addColorStop(0, "rgba(56, 189, 248, 0.28)");
        botGlow.addColorStop(1, "rgba(56, 189, 248, 0)");
        nexusCtx.fillStyle = botGlow;
        nexusCtx.fillRect(0, 0, w, h);

        for (let i = 0; i < nexusParticles.length; i++) {
            let p1 = nexusParticles[i];
            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0 || p1.x > w) p1.vx *= -1;
            if (p1.y < 0 || p1.y > h) p1.vy *= -1;

            nexusCtx.beginPath();
            nexusCtx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
            nexusCtx.fillStyle = p1.color;
            nexusCtx.fill();

            for (let j = i + 1; j < nexusParticles.length; j++) {
                let p2 = nexusParticles[j];
                let dx = p1.x - p2.x;
                let dy = p1.y - p2.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    nexusCtx.beginPath();
                    nexusCtx.moveTo(p1.x, p1.y);
                    nexusCtx.lineTo(p2.x, p2.y);
                    const alpha = (1 - dist / 130) * 0.38;
                    const lineGrad = nexusCtx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    lineGrad.addColorStop(0, p1.color);
                    lineGrad.addColorStop(1, p2.color);
                    nexusCtx.strokeStyle = lineGrad;
                    nexusCtx.globalAlpha = alpha;
                    nexusCtx.lineWidth = 1;
                    nexusCtx.stroke();
                    nexusCtx.globalAlpha = 1;
                }
            }
        }

        nexusAnimFrame = requestAnimationFrame(render);
    }

    if (nexusAnimFrame) cancelAnimationFrame(nexusAnimFrame);
    render();
}

/* ================= THEME SWITCHER ================= */
function initThemeSwitcher() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const themeBadge = document.getElementById("themeBadge");
    const currentLang = localStorage.getItem("qoshni_lang") || "uz";
    const dict = translations[currentLang] || translations.uz;

    const themes = ["dark", "light", "cyber", "nexus"];
    const themeNames = {
        dark: dict.theme_dark || "Qorong'u",
        light: dict.theme_light || "Oq",
        cyber: dict.theme_cyber || "Moviy",
        nexus: dict.theme_nexus || "Neon Kosmos"
    };

    let currentTheme = localStorage.getItem("qoshni_theme") || "dark";

    function applyTheme(theme) {
        if (!themes.includes(theme)) theme = "dark";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("qoshni_theme", theme);
        if (themeBadge) {
            themeBadge.textContent = themeNames[theme];
        }

        if (theme === "nexus") {
            startNexusAnimation();
        } else {
            const canvas = document.getElementById("nexusCanvas");
            if (canvas) canvas.style.display = "none";
        }
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.onclick = function () {
            let activeTheme = document.documentElement.getAttribute("data-theme") || "dark";
            let nextIndex = (themes.indexOf(activeTheme) + 1) % themes.length;
            applyTheme(themes[nextIndex]);
        };
    }
}

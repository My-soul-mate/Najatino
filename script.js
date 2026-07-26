// ===============================
// البيانات الأساسية
// ===============================
const PASSWORD = "بابا";

const BG_IMAGES = ["y1.jpg", "y2.jpg"];

const QUALITIES = [
  {
    img: "w1.jpg",
    title: "قوية 💪",
    desc: "لأنكِ تواجهين الحياة بثبات، وتظلين صامدة ومشرقة مهما كانت الظروف."
  },
  {
    img: "w2.jpg",
    title: "شجاعة 🦁",
    desc: "لأن الخوف لا يعرف طريقًا إلى قلبكِ حين يتعلق الأمر بالمواجهة أو حماية من تحبين."
  },
  {
    img: "w3.jpg",
    title: "طيبة 🤍",
    desc: "لأن قلبكِ مليء بالخير، وتعاملكِ يزرع الراحة والابتسامة في من حولكِ."
  },
  {
    img: "w4.jpg",
    title: "صافية ✨",
    desc: "لأن روحكِ نقية، ونيتكِ جميلة، وفيكِ صفاء نادر لا يُشبه أحدًا."
  },
  {
    img: "w1.jpg",
    title: "حنونة 🌸",
    desc: "لأن في قلبكِ مساحة كبيرة من العطف، وكلامكِ قادر على تهدئة أي تعب."
  }
];

const CAKE_MESSAGES = [
  "🎉 Happy Birthday!",
  "💙 أحبكِ يا أختي",
  "👑 أنتِ أميرة اليوم",
  "🎂 كل عام وأنتِ بخير",
  "✨ ضحكتكِ عيد",
  "🌍 Bon anniversaire",
  "💫 أجمل أخت",
  "🎁 يومكِ أجمل يوم"
];

const LANGUAGES = [
  { word: "عيد ميلاد سعيد", lang: "عربي" },
  { word: "Happy Birthday", lang: "English" },
  { word: "Joyeux anniversaire", lang: "Français" },
  { word: "Feliz cumpleaños", lang: "Español" },
  { word: "Buon compleanno", lang: "Italiano" },
  { word: "Alles Gute zum Geburtstag", lang: "Deutsch" },
  { word: "Doğum günün kutlu olsun", lang: "Türkçe" },
  { word: "С днём рождения", lang: "Русский" },
  { word: "生日快乐", lang: "中文" },
  { word: "생일 축하해", lang: "한국어" },
  { word: "お誕生日おめでとう", lang: "日本語" },
  { word: "Parabéns", lang: "Português" },
  { word: "Gelukkige verjaardag", lang: "Nederlands" },
  { word: "Sto lat", lang: "Polski" },
  { word: "La mulți ani", lang: "Română" },
  { word: "Feliz aniversário", lang: "Português BR" },
  { word: "Tanti auguri", lang: "Italian short" },
  { word: "Aqvayli dzlis gocva", lang: "Georgian" },
  { word: "Vse najboljše", lang: "Slovenski" },
  { word: "สุขสันต์วันเกิด", lang: "ไทย" },
  { word: "أحبكِ يا أختي", lang: "عربي" },
  { word: "I love you, sis", lang: "English" },
  { word: "Je t'aime ma sœur", lang: "Français" },
  { word: "Te quiero hermana", lang: "Español" }
];

const POLL_COLORS = ["#6e8ff0", "#d4af37", "#ffffff", "#8eb1ff", "#f2dc8d"];

// ===============================
// العناصر
// ===============================
const $ = (id) => document.getElementById(id);

const preloader = $("preloader");
const passwordScreen = $("passwordScreen");
const app = $("app");

const pwInput = $("pwInput");
const pwBtn = $("pwBtn");
const pwErr = $("pwErr");

const bgLayer = $("bgLayer");
const confetti = $("confetti");

const bgMusic = $("bgMusic");
const musicToggle = $("musicToggle");

const qualitiesGrid = $("qualitiesGrid");
const giftBox = $("giftBox");
const giftMsg = $("giftMsg");

const langGrid = $("langGrid");

const candle1 = $("candle1");
const candle2 = $("candle2");
const surpriseMsg = $("surpriseMsg");
const surpriseCounter = $("surpriseCounter");

const startGameBtn = $("startGame");
const gameArea = $("gameArea");
const gTimer = $("gTimer");
const gScore = $("gScore");
const gameMsg = $("gameMsg");

const ageCounter = $("ageCounter");

// ===============================
// متغيرات التشغيل
// ===============================
let bgIndex = 0;
let siteInitialized = false;
let confettiInterval = null;

let blownCandles = 0;
let cakeMessageIndex = 0;

let gameRunning = false;
let gameCaught = 0;
let gameTime = 15;
let gameTimer = null;

// ===============================
// بداية التحميل
// ===============================
setTimeout(() => {
  preloader.classList.add("hidden");
  passwordScreen.classList.remove("hidden");
  startConfetti();
}, 1800);

// ===============================
// كلمة المرور
// ===============================
function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function checkPassword() {
  const value = normalizeText(pwInput.value);

  if (value === PASSWORD) {
    pwErr.textContent = "";
    passwordScreen.classList.add("hidden");
    app.classList.remove("hidden");

    if (!siteInitialized) {
      initSite();
      siteInitialized = true;
    }

    bgMusic.play()
      .then(() => {
        musicToggle.textContent = "⏸ إيقاف";
      })
      .catch(() => {
        musicToggle.textContent = "▶ تشغيل";
      });

  } else {
    pwErr.textContent = "كلمة المرور غير صحيحة، حاولي مجددًا";
    pwInput.value = "";
  }
}

pwBtn.addEventListener("click", checkPassword);
pwInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") checkPassword();
});

// ===============================
// تهيئة الموقع
// ===============================
function initSite() {
  rotateBackground();
  setInterval(rotateBackground, 4500);

  buildQualities();
  buildLanguages();
  initCake();
  initGiftBox();
  initGame();
  updateAgeCounter();
  initMusicToggle();
  initScrollAnimations();
}

// ===============================
// الخلفية
// ===============================
function rotateBackground() {
  bgIndex = (bgIndex + 1) % BG_IMAGES.length;
  bgLayer.style.backgroundImage = `url("${BG_IMAGES[bgIndex]}")`;
}

// ===============================
// الكونفيتي
// ===============================
function startConfetti() {
  if (confettiInterval) return;

  confettiInterval = setInterval(() => {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = POLL_COLORS[Math.floor(Math.random() * POLL_COLORS.length)];
    piece.style.width = `${8 + Math.random() * 6}px`;
    piece.style.height = `${12 + Math.random() * 8}px`;
    piece.style.borderRadius = `${2 + Math.random() * 4}px`;
    piece.style.animationDuration = `${4 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 1.5}s`;

    confetti.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 9000);
  }, 180);
}

// ===============================
// عداد العمر
// ===============================
function updateAgeCounter() {
  const birthDate = new Date("2000-07-18T00:00:00");
  const now = new Date();

  let years = now.getFullYear() - birthDate.getFullYear();
  let months = now.getMonth() - birthDate.getMonth();
  let days = now.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  ageCounter.textContent = `${years} سنة • ${months} شهر • ${days} يوم`;
}

// ===============================
// الموسيقى
// ===============================
function initMusicToggle() {
  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      try {
        await bgMusic.play();
        musicToggle.textContent = "⏸ إيقاف";
      } catch (e) {}
    } else {
      bgMusic.pause();
      musicToggle.textContent = "▶ تشغيل";
    }
  });
}

// ===============================
// الصفات
// ===============================
function buildQualities() {
  qualitiesGrid.innerHTML = "";

  QUALITIES.forEach((q) => {
    const card = document.createElement("div");
    card.className = "q-card";

    card.innerHTML = `
      <img src="${q.img}" alt="${q.title}">
      <div class="q-hint">اضغطي لتظهر الصفة</div>
      <div class="q-card-content">
        <h3>${q.title}</h3>
        <p>${q.desc}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("show");
    });

    qualitiesGrid.appendChild(card);
  });
}

// ===============================
// الكيكة
// ===============================
function initCake() {
  updateCakeCounter();

  candle1.addEventListener("click", () => blowCandle(candle1));
  candle2.addEventListener("click", () => blowCandle(candle2));
}

function blowCandle(candle) {
  if (candle.classList.contains("off")) return;

  candle.classList.add("off");
  blownCandles++;

  const msg = CAKE_MESSAGES[cakeMessageIndex % CAKE_MESSAGES.length];
  cakeMessageIndex++;
  surpriseMsg.classList.remove("hidden");
  surpriseMsg.textContent = msg;

  updateCakeCounter();

  if (blownCandles === 2) {
    setTimeout(() => {
      surpriseMsg.innerHTML = `
        🎂 انطفأت الشموع... وبقي نوركِ يا نجاة<br/>
        كل عام وأنتِ أميرة يومكِ 💙👑
      `;
    }, 700);
  }
}

function updateCakeCounter() {
  const remaining = 2 - blownCandles;
  if (remaining > 0) {
    surpriseCounter.textContent = `تبقت ${remaining} شمعة`;
  } else {
    surpriseCounter.textContent = "أُطفئت كل الشموع ✨";
  }
}

// ===============================
// صندوق الهدية
// ===============================
function initGiftBox() {
  giftBox.addEventListener("click", () => {
    giftBox.classList.toggle("open");
    giftMsg.classList.toggle("hidden");
  });
}

// ===============================
// اللغات
// ===============================
function buildLanguages() {
  langGrid.innerHTML = "";

  LANGUAGES.forEach((item) => {
    const card = document.createElement("div");
    card.className = "lang-card";
    card.innerHTML = `
      <span class="lang-word">${item.word}</span>
      <span class="lang-name">${item.lang}</span>
    `;
    langGrid.appendChild(card);
  });
}

// ===============================
// اللعبة
// ===============================
function initGame() {
  startGameBtn.addEventListener("click", startGame);
}

function startGame() {
  if (gameRunning) return;

  gameRunning = true;
  gameCaught = 0;
  gameTime = 15;
  gameArea.innerHTML = "";
  gameMsg.textContent = "";
  gScore.textContent = "🎁 0 / 10";
  gTimer.textContent = "⏱ 15";

  spawnGifts();

  gameTimer = setInterval(() => {
    gameTime--;
    gTimer.textContent = `⏱ ${gameTime}`;

    if (gameTime <= 0) {
      endGame(false);
    }
  }, 1000);
}

function spawnGifts() {
  for (let i = 0; i < 14; i++) {
    const gift = document.createElement("span");
    gift.className = "fall-gift";
    gift.textContent = "🎁";
    gift.style.left = `${Math.random() * 88}%`;
    gift.style.animationDuration = `${3 + Math.random() * 4}s`;
    gift.style.animationDelay = `${Math.random() * 8}s`;

    gift.addEventListener("click", () => {
      if (!gameRunning || gift.dataset.caught === "1") return;

      gift.dataset.caught = "1";
      gift.remove();
      gameCaught++;
      gScore.textContent = `🎁 ${gameCaught} / 10`;

      if (gameCaught >= 10) {
        endGame(true);
      }
    });

    gameArea.appendChild(gift);
  }
}

function endGame(win) {
  if (!gameRunning) return;

  clearInterval(gameTimer);
  gameRunning = false;

  if (win) {
    gameMsg.textContent = "👑 مبروك! أصبحتِ ملكة عيد الميلاد يا نجاة!";
  } else {
    gameMsg.textContent = "⏳ انتهى الوقت... أعيدي المحاولة يا أميرة!";
  }
}

// ===============================
// ظهور الأقسام عند التمرير
// ===============================
function initScrollAnimations() {
  const cards = document.querySelectorAll(".sec-card");

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(28px)";
    card.style.transition = "opacity .75s ease, transform .75s ease";
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((card) => observer.observe(card));
      }

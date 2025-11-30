/* ===========================================================
   ELEMENT SELECTORS
   =========================================================== */
const pwE1 = document.getElementById("pw");
const copyBtn = document.getElementById("copy");
const len = document.getElementById("len");
const lenValue = document.getElementById("lenValue");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const easy = document.getElementById("easy");
const generate = document.getElementById("generate");
const strengthVal = document.getElementById("strength-value");
const historyList = document.getElementById("historyList");
const togglePw = document.getElementById("togglePw");
const toast = document.getElementById("toast");

/* ===========================================================
   CHARACTER SETS
   =========================================================== */
const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const L = "abcdefghijklmnopqrstuvwxyz";
const N = "0123456789";
const S = "!@#$%^&*()_+-={}[]|:;<>,.?/";

/* ===========================================================
   STATE VARIABLES
   =========================================================== */
let hidden = true;
let history = [];

/* ===========================================================
   GENERIC HELPER FUNCTIONS
   =========================================================== */
const pick = (s) => s[Math.floor(Math.random() * s.length)];

const toastShow = () => {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
};

/* ===========================================================
   PRONOUNCEABLE PASSWORD GENERATOR
   =========================================================== */
function pronounceable(len) {
  const v = "aeiou";
  const c = "bcdfghjklmnpqrstvwxyz";

  let out = "";
  for (let i = 0; i < len; i++) {
    out += i % 2 === 0 ? pick(c) : pick(v);
  }
  return out;
}

/* ===========================================================
   PASSWORD STRENGTH CHECKER
   =========================================================== */
function checkStrength(pw) {
  let score = 0;

  // Basic scoring
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;

  // Strength label
  let label = "";
  if (score <= 1) label = "Very Weak";
  else if (score === 2) label = "Weak";
  else if (score === 3) label = "Medium";
  else if (score === 4) label = "Strong";
  else label = "Very Strong";

  strengthVal.textContent = label;
}

/* ===========================================================
   RANDOM CHARACTER PICKER
   =========================================================== */
function randomChar() {
  const pool = [];

  if (upper.checked) pool.push(pick(U));
  if (lower.checked) pool.push(pick(L));
  if (number.checked) pool.push(pick(N));
  if (symbol.checked) pool.push(pick(S));

  return pool.length === 0
    ? ""
    : pool[Math.floor(Math.random() * pool.length)];
}

/* ===========================================================
   APPLY PASSWORD TO UI + HISTORY
   =========================================================== */
function applyPassword(pw) {
  pwE1.textContent = pw;

  hidden
    ? pwE1.classList.add("blurred")
    : pwE1.classList.remove("blurred");

  checkStrength(pw);

  history.unshift(pw);
  if (history.length > 10) history.pop();

  historyList.innerHTML = history
    .map((p) => `<li>${p}</li>`)
    .join("");
}

/* ===========================================================
   MAIN PASSWORD GENERATOR
   =========================================================== */
function generatePassword() {
  const length = parseInt(len.value);

  // Easy pronounceable password
  if (easy.checked) {
    applyPassword(pronounceable(length));
    return;
  }

  // Validation
  if (!upper.checked && !lower.checked && !number.checked && !symbol.checked) {
    alert("Select at least one option!");
    return;
  }

  let pw = "";

  // Ensure each selected type appears at least once
  if (upper.checked) pw += pick(U);
  if (lower.checked) pw += pick(L);
  if (number.checked) pw += pick(N);
  if (symbol.checked) pw += pick(S);

  // Fill remaining characters
  while (pw.length < length) pw += randomChar();

  // Shuffle characters
  pw = pw.split("").sort(() => Math.random() - 0.5).join("");

  applyPassword(pw);
}

/* ===========================================================
   EVENT LISTENERS
   =========================================================== */
generate.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(pwE1.textContent);
  toastShow();
});

togglePw.addEventListener("click", () => {
  hidden = !hidden;
  togglePw.textContent = hidden ? "Show" : "Hide";
  pwE1.classList.toggle("blurred", hidden);
});

len.addEventListener("input", () => {
  lenValue.textContent = len.value;
});

console.log("script.js loaded successfully");

/* ===========================================================
   FAQ TOGGLE SYSTEM
   =========================================================== */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  const toggleFAQ = () => {
    faqItems.forEach((other) => {
      if (other !== item) {
        other.classList.remove("open");
        other.querySelector(".faq-answer").style.maxHeight = null;
      }
    });

    item.classList.toggle("open");
    answer.style.maxHeight = item.classList.contains("open")
      ? answer.scrollHeight + 50 + "px"
      : null;
  };

  btn.addEventListener("click", toggleFAQ);

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") toggleFAQ();
  });
});

window.addEventListener("resize", () => {
  document.querySelectorAll(".faq-item.open").forEach((openItem) => {
    const ans = openItem.querySelector(".faq-answer");
    ans.style.maxHeight = ans.scrollHeight + 50 + "px";
  });
});

/* ===========================================================
   MOBILE-SAFE COPY FUNCTION
   =========================================================== */
function mobileSafeCopy(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(afterCopyEffects);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;

  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.left = "-999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    afterCopyEffects();
  } catch (err) {
    alert("Copy not supported on this device");
  }

  document.body.removeChild(textarea);
}

/* ===========================================================
   SOUND + VIBRATION + TOAST ON COPY
   =========================================================== */
function afterCopyEffects() {
  playCopySound();
  vibrateFeedback();
  showToast();
}

function playCopySound() {
  const sound = document.getElementById("copySound");
  if (!sound) return;

  try {
    sound.currentTime = 0;
    sound.play();
  } catch (e) {}
}

function vibrateFeedback() {
  if (navigator.vibrate) {
    navigator.vibrate([45, 30]);
  }
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => toast.classList.remove("show"), 1600);
}

document.getElementById("copy").addEventListener("click", () => {
  const pw = document.getElementById("pw").textContent;
  mobileSafeCopy(pw);
});

/* ===========================================================
   MOBILE MENU SYSTEM
   =========================================================== */
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});


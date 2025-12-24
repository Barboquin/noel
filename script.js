console.log("SCRIPT V10 LOADED ✅");

const wheelSpin = document.getElementById("wheelSpin");
const spinBtn = document.getElementById("spinBtn");
const revealBtn = document.getElementById("revealBtn");
const result = document.getElementById("result");
const codeInput = document.getElementById("codeInput");
const nameInput = document.getElementById("nameInput");

let spinning = false;

const VALID_CODES = new Set([
  "7K9M2R","4T6N8G","9H3P5X","2V7D4S","8C5W9J","3R8F2Q","6Y4K7N","5G9T3H","7P2C8V","4N6R9D",
  "9X3G5T","2J7W4C","8S5V9P","3Q8Y2K","6H4N7R","5D9C3J","7T2X8S","4K6P9W","9V3R5G","2C7H4Q","TEST25"
]);

const WIN_TARGETS = [30, 150, 270];

function cleanCode(v){
  return (v || "").trim().toUpperCase().replace(/\s+/g, "");
}
function normalizeName(s){
  return (s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

const NAME_TO_TYPE = new Map([
  ["papa","resto"],
  ["fred","resto"],
  ["frederic","resto"],
  ["papi","resto"],
  ["charlene","cafe"],
  ["charlemoulaine","cafe"],
  ["chacha","cafe"],
  ["kev","fastfood"],
  ["kevin","fastfood"],
  ["klev","fastfood"],
  ["jull","bon"],
  ["julie","bon"],
  ["you","bon"],
  ["younes","bon"],
  ["youyou","bon"],
  ["ambrine","bon"],
  ["ombrine","bon"],
  ["joy","bon"],
  ["elodie","fastfood"],
  ["elo","fastfood"],
  ["alex","fastfood"],
  ["alexandre","fastfood"],
  ["mathilde","bon"],
  ["math","bon"],
  ["mat","bon"],
  ["amandine","fastfood"],
  ["didine","fastfood"],
  ["mathieu","bon"],
  ["matthieu","bon"],
  ["steph","fastfood"],
  ["stephane","fastfood"],
  ["doriane","bon"],
  ["dory","bon"],
  ["dodo","bon"],
]);

spinBtn.addEventListener("click", () => {
  if (spinning) return;

  const code = cleanCode(codeInput.value);
  const rawName = (nameInput.value || "").trim();
  const nameKey = normalizeName(rawName);

  if (!rawName) {
    result.textContent = "❗ Entre ton prénom.";
    revealBtn.style.display = "none";
    return;
  }
  if (!NAME_TO_TYPE.has(nameKey)) {
    result.textContent = "❌ Prénom non reconnu. Vérifie l’orthographe.";
    revealBtn.style.display = "none";
    return;
  }
  if (!code) {
    result.textContent = "❗ Entre ton code.";
    revealBtn.style.display = "none";
    return;
  }
  if (!VALID_CODES.has(code)) {
    result.textContent = "❌ Code invalide. Vérifie la carte à gratter.";
    revealBtn.style.display = "none";
    return;
  }

  spinning = true;
  spinBtn.disabled = true;
  revealBtn.style.display = "none";
  result.textContent = "";

  const jitter = (Math.random() * 10) - 5;
  const target = WIN_TARGETS[Math.floor(Math.random() * WIN_TARGETS.length)];
  const rotation = 360 * 5 + (360 - (target + jitter));

  wheelSpin.style.transition = "transform 4s cubic-bezier(.12,.9,.12,1)";
  wheelSpin.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    result.textContent = "🎉 Clique sur « Découvre ton lot » 🎁";
    revealBtn.style.display = "block";
    spinning = false;
    spinBtn.disabled = false;
  }, 4200);
});

revealBtn.addEventListener("click", () => {
  const code = cleanCode(codeInput.value);
  const name = (nameInput.value || "").trim();
  const nameKey = normalizeName(name);

  if (!name || !NAME_TO_TYPE.has(nameKey)) {
    result.textContent = "❌ Prénom non reconnu. Vérifie l’orthographe.";
    revealBtn.style.display = "none";
    return;
  }
  if (!VALID_CODES.has(code)) {
    result.textContent = "❌ Code invalide. Vérifie la carte à gratter.";
    revealBtn.style.display = "none";
    return;
  }

  window.location.href = `reveal.html?code=${encodeURIComponent(code)}&name=${encodeURIComponent(name)}`;
});

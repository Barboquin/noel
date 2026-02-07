console.log("REVEAL V10 LOADED ✅");
const params = new URLSearchParams(window.location.search);
const code = (params.get("code") || "").trim().toUpperCase();
const rawName = (params.get("name") || "").trim();

function normalizeName(s){
  return (s || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

const VALID_CODES = new Set([
  "7K9M2R","4T6N8G","9H3P5X","2V7D4S","8C5W9J","3R8F2Q","6Y4K7N","5G9T3H","7P2C8V","4N6R9D",
  "9X3G5T","2J7W4C","8S5V9P","3Q8Y2K","6H4N7R","5D9C3J","7T2X8S","4K6P9W","9V3R5G","2C7H4Q","TEST25"
]);

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
  ["marine","bon"],
  ["debo","fastfood"],
  ["deborah","fastfood"],
  ["debora","fastfood"],
  ["deb","fastfood"],
]);

const nameKey = normalizeName(rawName);

if (!VALID_CODES.has(code) || !nameKey || !NAME_TO_TYPE.has(nameKey)) {
  window.location.href = "invalid.html";
} else {
  const type = NAME_TO_TYPE.get(nameKey);
  window.location.href = `${type}.html?code=${encodeURIComponent(code)}&name=${encodeURIComponent(rawName)}`;
}

const wheel = document.getElementById("wheel");
const button = document.getElementById("spinBtn");
const result = document.getElementById("result");

let spinning = false;

button.addEventListener("click", () => {
  if (spinning) return;

  spinning = true;
  button.disabled = true;
  result.textContent = "";

  // 5 tours complets + un angle aléatoire
  const rotation = 360 * 5 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${rotation}deg)`;

  window.setTimeout(() => {
    result.textContent = "🎉 Félicitations ! Tu as gagné ton cadeau de Noël 🎁";
    spinning = false;
    button.disabled = false;
  }, 4200);
});

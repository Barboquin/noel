console.log("SNOW+MUSIC V11 ✅");

/* 🎶 Musique : état persistant */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicOn = (localStorage.getItem("noel_music_on") ?? "1") === "1";

function applyBtn(){
  if (!musicBtn) return;
  musicBtn.classList.toggle("off", !musicOn);
}
applyBtn();

function tryPlay(){
  if (!music || !musicOn) return;
  music.volume = 0.22;
  music.play().catch(()=>{});
}

// tentative au chargement (marche parfois si on vient d’un clic)
tryPlay();

// sinon au premier clic/tap
document.addEventListener("click", () => {
  tryPlay();
}, { passive:true });

if (musicBtn){
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    musicOn = !musicOn;
    localStorage.setItem("noel_music_on", musicOn ? "1" : "0");
    applyBtn();
    if (!music) return;
    if (musicOn){
      tryPlay();
    } else {
      music.pause();
    }
  });
}

/* ❄️ Neige */
const snowCanvas = document.getElementById("snow");
if (snowCanvas){
  const ctx = snowCanvas.getContext("2d");
  let w=0,h=0;
  function resize(){
    w = snowCanvas.width = window.innerWidth;
    h = snowCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize, { passive:true });
  resize();

  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = reduce ? 0 : Math.min(160, Math.floor(Math.max(w,h)/9));

  const flakes = Array.from({length: count}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    r: Math.random()*2.6 + 0.8,
    vy: Math.random()*0.9 + 0.6,
    vx: (Math.random()-0.5)*0.6,
    o: Math.random()*0.5 + 0.35
  }));

  let t=0;
  function frame(){
    t += 0.01;
    ctx.clearRect(0,0,w,h);

    for(const f of flakes){
      f.y += f.vy;
      f.x += f.vx + Math.sin(t + f.y*0.01)*0.25;

      if (f.y > h + 6){ f.y = -6; f.x = Math.random()*w; }
      if (f.x < -10) f.x = w + 10;
      if (f.x > w + 10) f.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${f.o})`;
      ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  if(count>0) frame();
}

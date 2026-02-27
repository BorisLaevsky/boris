let beers = 0;
let lines = 0;

/* ===== Level ===== */
function level() {
  return beers + lines;
}

/* ===== Image Logic ===== */
function updateImages() {
  const lvl = level();

  document.querySelectorAll('.image-stack').forEach(stack => {
    const ascii = stack.querySelector('.ascii');
    const real = stack.querySelector('.real');

    /* RESET */
    ascii.style.opacity = 1;
    ascii.style.filter = 'none';
    ascii.style.transform = 'none';

    real.style.opacity = 0;
    real.style.filter = 'none';

    /* ----- ASCII DEGRADATION ----- */

    if (lvl <= 1) {
      ascii.style.filter = 'blur(0.6px)';
    }

    if (lvl === 2) {
      ascii.style.filter = 'contrast(1.4)';
    }

    if (lvl === 3) {
      ascii.style.filter = 'contrast(1.6) saturate(0.8)';
    }

    if (lvl >= 4 && lvl <= 7) {
      const d = lvl - 3;
      ascii.style.opacity = 1 - d * 0.18;
      ascii.style.filter = `
        blur(${d * 0.4}px)
        contrast(${1.2 - d * 0.15})
      `;
      ascii.style.transform = `translate(${d - 2}px, ${2 - d}px)`;
    }

    if (lvl >= 8) {
      ascii.style.opacity = 0;
    }

    /* ----- REAL IMAGE EMERGENCE ----- */

    if (lvl >= 6) {
      real.style.opacity = Math.min((lvl - 5) * 0.2, 1);
    }

    if (lvl === 10) {
      real.style.filter = 'contrast(1.2)';
    }

    if (lvl === 11) {
      real.style.filter = 'saturate(1.4) contrast(1.3)';
    }

    if (lvl >= 12) {
      real.style.filter = `
        saturate(2)
        contrast(1.5)
        hue-rotate(8deg)
      `;
    }
  });
}

/* ===== Actions ===== */
function drinkBeer() {
  beers++;
  document.getElementById('beer-count').innerText = beers;
  updateImages();
}

function doLine() {
  lines++;
  document.getElementById('line-count').innerText = lines;
  updateImages();
}

/* ===== Navigation ===== */
function goTo(id) {
  document.querySelectorAll('.group').forEach(g =>
    g.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
  updateImages();
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', updateImages);
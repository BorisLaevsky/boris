let beers = 0;
let lines = 0;

function level() {
  return beers + lines;
}

function updateImages() {
  document.querySelectorAll('.work-image').forEach(img => {
    img.className = 'work-image';

    if (level() <= 1) {
      img.src = img.dataset.ascii;
      img.classList.add('state-dull');
    } else {
      img.src = img.dataset.real;

      if (level() <= 3) img.classList.add('state-clear');
      else if (level() <= 5) img.classList.add('state-glow');
      else img.classList.add('state-fried');
    }
  });
}

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

function goTo(id) {
  document.querySelectorAll('.group').forEach(g => g.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  updateImages();
}

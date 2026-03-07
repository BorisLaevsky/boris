let beers = 0;

function updateImages() {
  const maxSteps = 12;
  const step = Math.min(beers, maxSteps);
  const realOpacity = step / maxSteps;

  document.querySelectorAll('.group.active .image-stack').forEach(stack => {
    const ascii = stack.querySelector('.ascii');
    const real = stack.querySelector('.real');

    if (!ascii || !real) return;

    real.style.opacity = realOpacity.toString();
    ascii.style.opacity = (1 - realOpacity).toString();
  });
}

function drinkBeer(){

  beers++;

  const counter = document.getElementById("beer-count");
  if(counter){
    counter.textContent = beers;
  }

  updateImages();
}

function goTo(id) {
  document.querySelectorAll('.group').forEach(g =>
    g.classList.remove('active')
  );

  const next = document.getElementById(id);
  next.classList.add('active');

  window.scrollTo(0, 0);

  if (['w3','w4','w5','w6','threshold'].includes(id)) {
    document.getElementById('score').style.display = 'none';
  } else {
    document.getElementById('score').style.display = 'block';
  }

  updateImages();
}

document.addEventListener('DOMContentLoaded', () => {
  updateImages();
});
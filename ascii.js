const pre = document.getElementById("ascii-logo");

let i = 0, dir = "inc", max = frames.length, fps = 20;

setPreCharSize();
startAnimating();

window.addEventListener("resize", setPreCharSize);

function setPreCharSize() {
  const charRatio = 0.66;
  const sampleLine = frames[0].split("\n")[1] || frames[0];
  const charWidth = fitTextToContainer(sampleLine, "monospace", pre.clientWidth) * charRatio;
  const charHeight = charRatio * charWidth;
  pre.style.fontSize = charWidth + "px";
  pre.style.lineHeight = charHeight + "px";
}

let fpsInterval, then;
function startAnimating() {
  fpsInterval = 1000 / fps;
  then = Date.now();
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  const now = Date.now();
  if (now - then > fpsInterval) {
    then = now - ((now - then) % fpsInterval);
    step();
  }
}

function step() {
  if (dir === "inc") {
    i = (i + 1 >= max) ? (dir = "dec", i - 1) : i + 1;
  } else {
    i = (i - 1 < 0) ? (dir = "inc", i + 1) : i - 1;
  }
  pre.textContent = frames[i];
}

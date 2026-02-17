const links = document.querySelectorAll('.menu a');
const panels = document.querySelectorAll('.panel');

links.forEach(link => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('data-target');
    const color = link.getAttribute('data-color');

    // hide all panels
    panels.forEach(panel => panel.classList.remove('active'));

    // reset all links
    links.forEach(l => {
      l.classList.remove('active');
      l.style.color = 'black';
    });

    // activate current
    link.classList.add('active');
    if (color) {
      link.style.color = color;
    }

    // show panel
    document.getElementById(targetId).classList.add('active');

    // reset scroll
    window.scrollTo(0, 0);
  });
});

// apply color to initially active link on load
const initialActive = document.querySelector('.menu a.active');
if (initialActive) {
  const color = initialActive.getAttribute('data-color');
  if (color) {
    initialActive.style.color = color;
  }
}

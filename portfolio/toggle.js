const links = document.querySelectorAll('.menu a');
const panels = document.querySelectorAll('.panel');

links.forEach(link => {
  link.addEventListener('click', () => {

    if (link.classList.contains('active')) {
      window.scrollTo(0, 0);
      return;
    }

    const targetId = link.getAttribute('data-target');

    panels.forEach(p => p.classList.remove('active'));
    links.forEach(l => l.classList.remove('active'));

    link.classList.add('active');

    const target = document.getElementById(targetId);
    if (target) target.classList.add('active');

    window.scrollTo(0, 0);
  });
});
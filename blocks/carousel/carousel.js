export default function decorate(block) {
  const rows = [...block.children];
  const track = document.createElement('div');
  track.classList.add('carousel-track');

  rows.forEach((row) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel-slide');
    const cols = [...row.children];
    if (cols.length >= 2) {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('carousel-slide-image');
      imageDiv.append(...cols[0].childNodes);

      const textDiv = document.createElement('div');
      textDiv.classList.add('carousel-slide-text');
      textDiv.append(...cols[1].childNodes);

      slide.append(imageDiv, textDiv);
    }
    track.append(slide);
    row.remove();
  });

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('carousel-btn', 'carousel-btn-prev');
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.textContent = '\u2039';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('carousel-btn', 'carousel-btn-next');
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.textContent = '\u203A';

  block.append(prevBtn, track, nextBtn);

  let scrollPos = 0;
  const slideWidth = 220;

  nextBtn.addEventListener('click', () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    scrollPos = Math.min(scrollPos + slideWidth, maxScroll);
    track.scrollTo({ left: scrollPos, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    scrollPos = Math.max(scrollPos - slideWidth, 0);
    track.scrollTo({ left: scrollPos, behavior: 'smooth' });
  });
}

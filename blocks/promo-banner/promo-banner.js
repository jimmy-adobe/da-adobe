export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length >= 2) {
    const imageDiv = rows[0];
    const textDiv = rows[1];
    imageDiv.classList.add('promo-banner-image');
    textDiv.classList.add('promo-banner-text');
    const img = imageDiv.querySelector('img');
    if (img) {
      block.style.backgroundImage = `url(${img.src})`;
      block.style.backgroundSize = 'cover';
      block.style.backgroundPosition = 'center';
      imageDiv.remove();
    }
  }
}

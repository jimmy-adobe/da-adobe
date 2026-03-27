export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.classList.add('promo-banner-content');

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const bgWrapper = document.createElement('div');
        bgWrapper.classList.add('promo-banner-image');
        bgWrapper.append(pic);
        wrapper.prepend(bgWrapper);
      } else {
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('promo-banner-text');
        textWrapper.append(...col.childNodes);
        wrapper.append(textWrapper);
      }
    });
    row.remove();
  });

  block.append(wrapper);
}

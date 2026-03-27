export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.classList.add('email-signup-content');

  rows.forEach((row) => {
    const cols = [...row.children];
    cols.forEach((col) => {
      wrapper.append(...col.childNodes);
    });
    row.remove();
  });

  block.append(wrapper);
}

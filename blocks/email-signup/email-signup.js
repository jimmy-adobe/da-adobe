export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length >= 1) {
    rows[0].classList.add('email-signup-heading');
  }
  if (rows.length >= 2) {
    rows[1].classList.add('email-signup-disclaimer');
  }
}

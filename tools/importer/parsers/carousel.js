/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel block.
 * Source carousel is a product slider with images, names, and prices.
 * Maps each product to a carousel slide row: [image, text content].
 * Source: https://main--eds-react-coleman--ensemble-software.aem.live/
 * Generated: 2026-03-27
 */
export default function parse(element, { document }) {
  // Extract heading from default-content-wrapper (place before block)
  const heading = element.querySelector('.default-content-wrapper h3, .default-content-wrapper h2');

  // Extract product items from slider
  const items = element.querySelectorAll('.slider-item');
  const cells = [];

  items.forEach((item) => {
    const picture = item.querySelector('picture');
    const link = item.querySelector('a');
    const nameEl = item.querySelector('.slider-text strong');
    const priceEl = item.querySelector('.price');

    // Build text content cell
    const contentCell = [];

    if (nameEl) {
      const h = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = nameEl.textContent.trim();
      h.append(strong);
      contentCell.push(h);
    }

    if (priceEl) {
      const p = document.createElement('p');
      p.textContent = '$' + priceEl.textContent.trim();
      contentCell.push(p);
    }

    if (link) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = nameEl ? nameEl.textContent.trim() : 'View Product';
      p.append(a);
      contentCell.push(p);
    }

    cells.push([picture || '', contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel', cells });

  // Place heading before block as default content
  if (heading) {
    element.before(heading);
  }

  element.replaceWith(block);
}

/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards block.
 * Handles both grid-3 and grid-2 variants.
 * Source: https://main--eds-react-coleman--ensemble-software.aem.live/
 * Generated: 2026-03-27
 */
export default function parse(element, { document }) {
  const cardElements = element.querySelectorAll('.cards-element');
  const cells = [];

  cardElements.forEach((card) => {
    const imageDiv = card.querySelector('.cards-card-image');
    const bodyDiv = card.querySelector('.cards-card-body');
    const picture = imageDiv ? imageDiv.querySelector('picture') : null;
    cells.push([picture || '', bodyDiv || '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}

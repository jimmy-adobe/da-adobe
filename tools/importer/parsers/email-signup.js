/* eslint-disable */
/* global WebImporter */
/**
 * Parser for email-signup block.
 * Captures heading/offer text and disclaimer. Form interactivity handled by block JS.
 * Source: https://main--eds-react-coleman--ensemble-software.aem.live/
 * Generated: 2026-03-27
 */
export default function parse(element, { document }) {
  const labelDiv = element.querySelector('.label');
  const infoDiv = element.querySelector('.information');
  const cells = [];

  // Row 1: heading/offer text
  if (labelDiv) {
    const p = document.createElement('p');
    p.textContent = labelDiv.textContent.trim();
    cells.push([p]);
  }

  // Row 2: disclaimer content
  if (infoDiv) {
    const content = infoDiv.querySelector(':scope > div');
    cells.push([content || infoDiv]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'email-signup', cells });
  element.replaceWith(block);
}

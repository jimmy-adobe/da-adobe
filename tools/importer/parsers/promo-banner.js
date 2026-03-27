/* eslint-disable */
/* global WebImporter */
/**
 * Parser for promo-banner block.
 * Source: https://main--eds-react-coleman--ensemble-software.aem.live/
 * Generated: 2026-03-27
 */
export default function parse(element, { document }) {
  const wrapper = element.querySelector(':scope > .wrapper') || element.querySelector(':scope > div');
  const divs = wrapper ? wrapper.querySelectorAll(':scope > div') : element.querySelectorAll(':scope > div');
  const cells = [];

  const imageDiv = divs[0];
  const textDiv = divs[1];
  const picture = imageDiv ? imageDiv.querySelector('picture') : null;

  cells.push([picture || '', textDiv || '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'promo-banner', cells });
  element.replaceWith(block);
}

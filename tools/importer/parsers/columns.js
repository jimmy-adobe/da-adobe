/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns block.
 * Source: https://main--eds-react-coleman--ensemble-software.aem.live/
 * Generated: 2026-03-27
 */
export default function parse(element, { document }) {
  const rows = element.querySelectorAll(':scope > div');
  const cells = [];

  rows.forEach((row) => {
    const cols = row.querySelectorAll(':scope > div');
    const rowCells = [];
    cols.forEach((col) => {
      rowCells.push(col);
    });
    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}

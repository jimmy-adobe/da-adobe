/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove any elements that could interfere with block parsing
    // Source is EDS site - minimal cleanup needed before parsing
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site shell content
    // Found in cleaned.html: <header class="header-wrapper">, <footer class="footer-wrapper">
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
      'noscript',
      'link',
      'source',
    ]);
  }
}

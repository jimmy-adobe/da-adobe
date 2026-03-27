/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsParser from './parsers/columns.js';
import cardsParser from './parsers/cards.js';
import promoBannerParser from './parsers/promo-banner.js';
import carouselParser from './parsers/carousel.js';
import emailSignupParser from './parsers/email-signup.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/coleman-cleanup.js';
import sectionsTransformer from './transformers/coleman-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns': columnsParser,
  'cards': cardsParser,
  'promo-banner': promoBannerParser,
  'carousel': carouselParser,
  'email-signup': emailSignupParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage with hero, featured content sections, and call-to-action areas',
  urls: [
    'https://main--eds-react-coleman--ensemble-software.aem.live/',
  ],
  blocks: [
    {
      name: 'columns',
      instances: ['.columns.full-width.block'],
    },
    {
      name: 'cards',
      instances: ['.cards.grid-3.block', '.cards.grid-2.block'],
    },
    {
      name: 'promo-banner',
      instances: ['.promo-banner.block'],
    },
    {
      name: 'carousel',
      instances: ['.carousel.block'],
    },
    {
      name: 'email-signup',
      instances: ['.email-signup.block'],
    },
  ],
  sections: [
    {
      id: 'section-hero',
      name: 'Hero Banner',
      selector: '.section.full-width.columns-container',
      style: null,
      blocks: ['columns'],
      defaultContent: [],
    },
    {
      id: 'section-categories',
      name: 'Product Categories',
      selector: '.section.cards-container:nth-child(2)',
      style: null,
      blocks: ['cards'],
      defaultContent: [],
    },
    {
      id: 'section-promo',
      name: 'Promotional Banner',
      selector: '.section.full-width.promo-banner-container',
      style: 'dark',
      blocks: ['promo-banner'],
      defaultContent: [],
    },
    {
      id: 'section-carousel',
      name: 'Product Carousel',
      selector: '.section.carousel-container',
      style: null,
      blocks: ['carousel'],
      defaultContent: [],
    },
    {
      id: 'section-features',
      name: 'Feature Cards',
      selector: '.section.cards-container:nth-child(5)',
      style: null,
      blocks: ['cards'],
      defaultContent: [],
    },
    {
      id: 'section-signup',
      name: 'Email Signup',
      selector: '.section.email-signup-container',
      style: null,
      blocks: ['email-signup'],
      defaultContent: [],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};

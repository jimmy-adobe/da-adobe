var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/columns.js
  function parse(element, { document }) {
    const rows = element.querySelectorAll(":scope > div");
    const cells = [];
    rows.forEach((row) => {
      const cols = row.querySelectorAll(":scope > div");
      const rowCells = [];
      cols.forEach((col) => {
        rowCells.push(col);
      });
      if (rowCells.length > 0) {
        cells.push(rowCells);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "columns", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    const cardElements = element.querySelectorAll(".cards-element");
    const cells = [];
    cardElements.forEach((card) => {
      const imageDiv = card.querySelector(".cards-card-image");
      const bodyDiv = card.querySelector(".cards-card-body");
      const picture = imageDiv ? imageDiv.querySelector("picture") : null;
      cells.push([picture || "", bodyDiv || ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/promo-banner.js
  function parse3(element, { document }) {
    const wrapper = element.querySelector(":scope > .wrapper") || element.querySelector(":scope > div");
    const divs = wrapper ? wrapper.querySelectorAll(":scope > div") : element.querySelectorAll(":scope > div");
    const cells = [];
    const imageDiv = divs[0];
    const textDiv = divs[1];
    const picture = imageDiv ? imageDiv.querySelector("picture") : null;
    cells.push([picture || "", textDiv || ""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "promo-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel.js
  function parse4(element, { document }) {
    const heading = element.querySelector(".default-content-wrapper h3, .default-content-wrapper h2");
    const items = element.querySelectorAll(".slider-item");
    const cells = [];
    items.forEach((item) => {
      const picture = item.querySelector("picture");
      const link = item.querySelector("a");
      const nameEl = item.querySelector(".slider-text strong");
      const priceEl = item.querySelector(".price");
      const contentCell = [];
      if (nameEl) {
        const h = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = nameEl.textContent.trim();
        h.append(strong);
        contentCell.push(h);
      }
      if (priceEl) {
        const p = document.createElement("p");
        p.textContent = "$" + priceEl.textContent.trim();
        contentCell.push(p);
      }
      if (link) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = nameEl ? nameEl.textContent.trim() : "View Product";
        p.append(a);
        contentCell.push(p);
      }
      cells.push([picture || "", contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel", cells });
    if (heading) {
      element.before(heading);
    }
    element.replaceWith(block);
  }

  // tools/importer/parsers/email-signup.js
  function parse5(element, { document }) {
    const labelDiv = element.querySelector(".label");
    const infoDiv = element.querySelector(".information");
    const cells = [];
    if (labelDiv) {
      const p = document.createElement("p");
      p.textContent = labelDiv.textContent.trim();
      cells.push([p]);
    }
    if (infoDiv) {
      const content = infoDiv.querySelector(":scope > div");
      cells.push([content || infoDiv]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "email-signup", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/coleman-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.header-wrapper",
        "footer.footer-wrapper",
        "noscript",
        "link",
        "source"
      ]);
    }
  }

  // tools/importer/transformers/coleman-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document, template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const main = element.querySelector("main") || element;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        if (!section.selector) return;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = main.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: [["style", section.style]]
          });
          sectionEl.append(metaBlock);
        }
        if (section.id !== template.sections[0].id && sectionEl.previousElementSibling) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "columns": parse,
    "cards": parse2,
    "promo-banner": parse3,
    "carousel": parse4,
    "email-signup": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage with hero, featured content sections, and call-to-action areas",
    urls: [
      "https://main--eds-react-coleman--ensemble-software.aem.live/"
    ],
    blocks: [
      {
        name: "columns",
        instances: [".columns.full-width.block"]
      },
      {
        name: "cards",
        instances: [".cards.grid-3.block", ".cards.grid-2.block"]
      },
      {
        name: "promo-banner",
        instances: [".promo-banner.block"]
      },
      {
        name: "carousel",
        instances: [".carousel.block"]
      },
      {
        name: "email-signup",
        instances: [".email-signup.block"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero Banner",
        selector: ".section.full-width.columns-container",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-categories",
        name: "Product Categories",
        selector: ".section.cards-container:nth-child(2)",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-promo",
        name: "Promotional Banner",
        selector: ".section.full-width.promo-banner-container",
        style: "dark",
        blocks: ["promo-banner"],
        defaultContent: []
      },
      {
        id: "section-carousel",
        name: "Product Carousel",
        selector: ".section.carousel-container",
        style: null,
        blocks: ["carousel"],
        defaultContent: []
      },
      {
        id: "section-features",
        name: "Feature Cards",
        selector: ".section.cards-container:nth-child(5)",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-signup",
        name: "Email Signup",
        selector: ".section.email-signup-container",
        style: null,
        blocks: ["email-signup"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();

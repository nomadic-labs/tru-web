export const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024; //less than 2MB in bytes

export const NOTIFICATION_MESSAGES = {
  'contact-form-success': "Thanks for your message, we'll get back to you soon!",
  'project-form-success': "Thanks for submitting your project! We will review it before publishing it on the website."
}

export const CONTENT_MAP = {
  header: { type: "header", content: { text: "Header" } },
  paragraph: { type: "paragraph", content: { text: "Paragraph" } },
  image: { type: "image" },
  imageCarousel: { type: "imageCarousel", content: {} },
  embeddedIframe: { type: "embeddedIframe" },
  timeline: { type: "timeline", content: { alignment: "left" } },
  button: { type: "button", content: { anchor: "Button", link: "/" } },
  link: { type: "link", content: { anchor: "Link text", link: "/" } },
}

export const PAGE_TYPES = [
  { label: "Single Column Page", value: { type: "single_column", template: "single-column.js" } },
  { label: "Fixed Sidebar Page", value: { type: "fixed_sidebar", template: "fixed-sidebar.js" } },
];

export const MENU_CATEGORIES = [
  { label: "Traditional Territory", value: "traditional-territory" },
  { label: "Indian Act and Reserve System", value: "indian-act-and-reserve-system" },
  { label: "Imperial Oil Refinery", value: "imperial-oil-refinery" },
  { label: "Permission to Pollute Government", value: "permission-to-pollute" },
  { label: "Land Futures", value: "land-futures" },
  { label: "Timelines", value: "timelines" }
];


export const PALETTE_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export const DEFAULT_COMPONENT_CONTENT = {
  "featured-resources": {
    "publication-item-image": { "imageSrc": "", "caption": "" },
    "publication-item-details": { "text": "Author, date" },
    "publication-item-title": { "text": "Publication title" },
    "publication-item-description": { "text": "Summary" },
    "publication-item-link": { "anchor": "link text", "link": "/" },
  },
  "references": {
    "reference-details": { "text": "Author, date" },
    "reference-description": { "text": "Additional publication information or notes" },
    "reference-link": { "anchor": "Title", "link": "/" },
  },
  "featured-news": {
    "publication-item-image": { "imageSrc": "", "caption": "" },
    "publication-item-details": { "text": "Date" },
    "publication-item-source": { "text": "Source" },
    "publication-item-title": { "text": "News Title" },
    "publication-item-description": { "text": "Preview" },
    "publication-item-link": { "anchor": "link text", "link": "/" },
  },
  "featured-stories": {
    "publication-item-image": { "imageSrc": "", "caption": "" },
    "publication-item-title": { "text": "Story title" },
    "publication-item-description": { "text": "Preview" },
    "publication-item-link": { "anchor": "link text", "link": "/" },
  },
  "app-screeshot": {
    "screenshot-item-image": { "imageSrc": "", "caption": "", "title": "" },
  },
}

export const PERMANENT_PAGES = [
  "home",
  "about",
  "contact",
  "explore-stories",
  "get-involved",
  "news",
  "resources",
  "references",
  "updates",
  "pollutionreporter"
]
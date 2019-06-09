export const MAXIMUM_IMAGE_SIZE = 2 * 1024 * 1024; //less than 2MB in bytes

export const NOTIFICATION_MESSAGES = {
  'contact-form-success': "Thanks for your message, we'll get back to you soon!",
  'project-form-success': "Thanks for submitting your project! We will review it before publishing it on the website."
}

export const CONTENT_MAP = {
  header: { type: "header", content: { text: "Header" } },
  paragraph: { type: "paragraph", content: { text: "Paragraph" } },
  image: { type: "image" },
  embeddedIframe: { type: "embeddedIframe" },
  timeline: { type: "timeline" },
  bouncingImageTopLeft: { type: "bouncingImageTopLeft" },
  bouncingImageTopRight: { type: "bouncingImageTopRight" },
  bouncingImageBottomLeft: { type: "bouncingImageBottomLeft" },
  bouncingImageBottomRight: { type: "bouncingImageBottomRight" },
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

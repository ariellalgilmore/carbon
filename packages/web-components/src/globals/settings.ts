/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

let _prefix = 'cds';

export const getPrefix = () => _prefix;

export const setPrefix = (p: string) => {
  _prefix = p;
};

/**
 * @deprecated Use `getPrefix()` instead to support custom prefixes.
 */
export const prefix = _prefix;

/**
 * Returns a selector string of tabbable nodes, evaluated with the current prefix.
 * Borrowed from `carbon-angular`. tabbable === focusable.
 *
 * This is a function rather than a constant so the prefix is resolved at
 * call time, allowing consumers to call `setPrefix()` before any components
 * are used.
 */
export const getSelectorTabbable = (): string => {
  const p = getPrefix();
  return `
  a[href]:not(#start-sentinel, #end-sentinel), area[href], input:not([disabled]):not([tabindex='-1']),
  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),
  textarea:not([disabled]):not([tabindex='-1']),
  iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true],
  ${p}-accordion-item,
  ${p}-actionable-notification-button,
  ${p}-ai-label,
  ${p}-button,
  ${p}-breadcrumb-link,
  ${p}-checkbox,
  ${p}-code-snippet,
  ${p}-combo-box,
  ${p}-content-switcher-item,
  ${p}-copy-button,
  ${p}-table-header-row,
  ${p}-table-row,
  ${p}-table-toolbar-search,
  ${p}-date-picker-input,
  ${p}-dropdown,
  ${p}-icon-button,
  ${p}-input,
  ${p}-link,
  ${p}-number-input,
  ${p}-modal,
  ${p}-modal-close-button,
  ${p}-modal-footer-button,
  ${p}-multi-select,
  ${p}-inline-notification,
  ${p}-toast-notification,
  ${p}-overflow-menu,
  ${p}-overflow-menu-item,
  ${p}-page-sizes-select,
  ${p}-pages-select,
  ${p}-progress-step,
  ${p}-radio-button,
  ${p}-search,
  ${p}-slider,
  ${p}-slider-input,
  ${p}-structured-list,
  ${p}-tab,
  ${p}-filter-tag,
  ${p}-textarea,
  ${p}-text-input,
  ${p}-clickable-tile,
  ${p}-expandable-tile,
  ${p}-radio-tile,
  ${p}-selectable-tile,
  ${p}-toggle,
  ${p}-tooltip,
  ${p}-tooltip-definition,
  ${p}-tooltip-icon,
  ${p}-header-menu,
  ${p}-header-menu-button,
  ${p}-header-menu-item,
  ${p}-header-name,
  ${p}-header-nav-item,
  ${p}-side-nav-link,
  ${p}-side-nav-menu,
  ${p}-side-nav-menu-item,
  ${p}-slug
`;
};

/**
 * @deprecated Use `getSelectorTabbable()` instead to support custom prefixes.
 */
export const selectorTabbable = getSelectorTabbable();
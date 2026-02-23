/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@webcomponents/scoped-custom-element-registry';
import { LitElement, CSSResult } from 'lit';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { getPrefix } from '../settings';

const DEFAULT_CSS_PREFIX = 'cds';

const styleCache = new WeakMap<typeof LitElement, Map<string, CSSStyleSheet[]>>();

function getRemappedSheets(
  ctor: typeof LitElement,
  newPrefix: string
): CSSStyleSheet[] {
  if (!styleCache.has(ctor)) {
    styleCache.set(ctor, new Map());
  }
  const prefixCache = styleCache.get(ctor)!;
  if (prefixCache.has(newPrefix)) {
    return prefixCache.get(newPrefix)!;
  }
  const sheets = (ctor.elementStyles ?? []).map((s) => {
    const sheet = new CSSStyleSheet();
    const remapped = (s as CSSResult).cssText
      .replace(new RegExp(`${DEFAULT_CSS_PREFIX}-ce--`, 'g'), `${newPrefix}-ce--`)
      .replace(new RegExp(`${DEFAULT_CSS_PREFIX}--`, 'g'), `${newPrefix}--`)
      .replace(new RegExp(`${DEFAULT_CSS_PREFIX}-`, 'g'), `${newPrefix}-`);

    sheet.replaceSync(remapped);
    return sheet;
  });
  prefixCache.set(newPrefix, sheets);
  return sheets;
}

/**
 * Base class for all Carbon web components.
 * Mixes in scoped element registry support so components never
 * pollute or conflict with the global custom element registry.
 * Also remaps CSS class prefixes at runtime to match any custom
 * prefix set via `setPrefix()`.
 */
export class ScopedLitElement extends ScopedElementsMixin(LitElement) {
  connectedCallback() {
    super.connectedCallback();

    const currentPrefix = getPrefix();
    if (currentPrefix === DEFAULT_CSS_PREFIX) return;

    const ctor = this.constructor as typeof LitElement;
    if (this.shadowRoot) {
      this.shadowRoot.adoptedStyleSheets = getRemappedSheets(ctor, currentPrefix);
    }
  }
}
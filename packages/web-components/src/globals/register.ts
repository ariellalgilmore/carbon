/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TAG_NAME, BASE_NAME } from './decorators/carbon-element';
import { getPrefix } from './settings';

function define(tagName: string, component: any): void {
  try {
    customElements.define(tagName, component);
  } catch {
    console.warn(
      `[carbon-web-components] Attempting to re-define "${tagName}".`
    );
  }
}

/**
 * Registers Carbon component classes in the global custom element registry.
 *
 * Can be called in two ways:
 *
 * 1. Pass component classes directly — tag names are composed from the
 *    current prefix + the component's BASE_NAME:
 *    registerGlobal(CDSAccordion, CDSAccordionItem)
 *
 * 2. Pass a tag map for full control over tag names:
 *    registerGlobal({ 'my-accordion': CDSAccordion, 'my-accordion-item': CDSAccordionItem })
 */
export function registerGlobal(tagMap: Record<string, any>): void;
export function registerGlobal(...components: any[]): void;
export function registerGlobal(...args: any[]): void {
  if (
    args.length === 1 &&
    typeof args[0] === 'object' &&
    !Array.isArray(args[0])
  ) {
    // Tag map form: { 'my-accordion': CDSAccordion }
    for (const [tagName, component] of Object.entries(args[0])) {
      define(tagName, component);
    }
    return;
  }

  // Component list form: registerGlobal(CDSAccordion, CDSAccordionItem)
  for (const component of args) {
    const baseName = component[BASE_NAME];
    const tagName = baseName
      ? `${getPrefix()}-${baseName}`
      : component[TAG_NAME];

    if (!tagName) {
      console.warn(
        '[carbon-web-components] Component has no tag name metadata. ' +
          'Ensure the @carbonElement decorator has been applied or use the tag map form.',
        component
      );
      continue;
    }

    define(tagName, component);
  }
}
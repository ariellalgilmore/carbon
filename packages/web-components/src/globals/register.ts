/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TAG_NAME } from './decorators/carbon-element';

/**
 * Registers one or more Carbon component classes in the global custom element
 * registry using their current tag name (prefix + base name).
 *
 * Use this only when you are NOT using scoped elements — for example in plain
 * HTML pages, SSR environments, or frameworks that manage their own element
 * lifecycle outside of a Lit shadow root.
 *
 * Must be called AFTER any `setPrefix()` call, since the tag name is resolved
 * at the moment `registerGlobal` runs.
 *
 * @example
 * // Plain HTML page — register everything
 * import '@carbon/web-components/global';
 *
 * @example
 * // Selective registration with a custom prefix
 * import { setPrefix } from '@carbon/web-components/es/globals/settings.js';
 * import { registerGlobal } from '@carbon/web-components/es/globals/register.js';
 * import CDSAccordion from '@carbon/web-components/es/components/accordion/accordion.js';
 * import CDSAccordionItem from '@carbon/web-components/es/components/accordion/accordion-item.js';
 *
 * setPrefix('bx');
 * registerGlobal(CDSAccordion, CDSAccordionItem);
 * // Registers as 'bx-accordion' and 'bx-accordion-item'
 */
export function registerGlobal(...components: any[]): void {
  for (const component of components) {
    const tagName = component[TAG_NAME];

    if (!tagName) {
      console.warn(
        '[carbon-web-components] Component has no TAG_NAME metadata. ' +
          'Ensure the @carbonElement decorator has been applied:',
        component
      );
      continue;
    }

    try {
      customElements.define(tagName, component);
    } catch (error) {
      // Most likely a re-registration attempt — safe to warn and continue.
      console.warn(
        `[carbon-web-components] Attempting to re-define "${tagName}". ` +
          'This is usually caused by importing the same component twice or ' +
          'loading multiple versions of @carbon/web-components on the same page.'
      );
    }
  }
}
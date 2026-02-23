/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

import { getPrefix } from '../settings';

export declare type Constructor<T> = {
  new (...args: any[]): T;
};

/**
 * Symbol used to store the bare name (no prefix) on a custom element class.
 * e.g. 'accordion', 'accordion-item'
 */
export const BASE_NAME = Symbol('baseName');

/**
 * Symbol used to access the fully-qualified tag name at call time.
 * Defined as a getter on each class so it always reflects the current prefix,
 * even if `setPrefix()` was called after the module was imported.
 *
 * Usage: CDSAccordion[TAG_NAME] => 'cds-accordion' (or 'bx-accordion' etc.)
 */
export const TAG_NAME = Symbol('tagName');

/**
 * Class decorator that records the bare element name on the class for use
 * with scoped element registries. Does NOT call customElements.define().
 *
 * The full tag name (prefix + bare name) is exposed via a getter keyed by
 * TAG_NAME so it is always resolved against the current prefix at access time.
 *
 * @param baseName The bare element name without prefix, e.g. 'accordion'
 */
export const carbonElement =
  (baseName: string) =>
  (clazz: any): any => {
    // Store the bare name as a simple value — this never changes.
    clazz[BASE_NAME] = baseName;

    // Define TAG_NAME as a getter on the class (not the instance) so that
    // it composes the prefix lazily at access time rather than at decoration time.
    Object.defineProperty(clazz, TAG_NAME, {
      get: () => `${getPrefix()}-${baseName}`,
      configurable: true,
    });

    return clazz;
  };
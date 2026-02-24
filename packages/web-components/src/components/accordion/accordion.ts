/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { getPrefix } from '../../globals/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import { ACCORDION_SIZE, ACCORDION_ALIGNMENT } from './defs';
import { ScopedLitElement } from '../../globals/base/scoped-lit-element';
import { BASE_NAME, TAG_NAME } from '../../globals/decorators/carbon-element';
import CDSAccordionItem from './accordion-item';
import styles from './accordion.scss?lit';

export { ACCORDION_SIZE, ACCORDION_ALIGNMENT };

/**
 * Accordion container.
 *
 * @element cds-accordion
 */
class CDSAccordion extends ScopedLitElement {
  static [BASE_NAME] = 'accordion';

  /**
   * Scoped element registry — declares which child components this component
   * uses in its template or queries. Evaluated lazily as a getter so the
   * prefix is resolved at element upgrade time, after any `setPrefix()` call.
   */
  static get scopedElements() {
    return {
      [`${getPrefix()}-accordion-item`]: CDSAccordionItem,
    };
  }

  /**
   * Accordion size should be sm, md, lg.
   */
  @property({ reflect: true })
  size = ACCORDION_SIZE.MEDIUM;

  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  @property({ reflect: true })
  alignment = ACCORDION_ALIGNMENT.END;

  /**
   * Specify whether Accordion text should be flush, default is false,
   * does not work with align="start".
   */
  @property({ type: Boolean, reflect: true })
  isFlush = false;

  /**
   * Disable all accordion items inside this accordion.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('size')) {
      forEach(
        this.querySelectorAll(CDSAccordion.selectorAccordionItems),
        (elem) => {
          elem.setAttribute('size', this.size);
        }
      );
    }

    if (changedProperties.has('alignment')) {
      forEach(
        this.querySelectorAll(CDSAccordion.selectorAccordionItems),
        (elem) => {
          elem.setAttribute('alignment', this.alignment);
        }
      );
    }

    if (
      changedProperties.has('isFlush') ||
      changedProperties.has('alignment')
    ) {
      forEach(
        this.querySelectorAll(CDSAccordion.selectorAccordionItems),
        (elem) => {
          if (this.isFlush && this.alignment !== 'start') {
            elem.setAttribute('isFlush', '');
          } else {
            elem.removeAttribute('isFlush');
          }
        }
      );
    }

    if (changedProperties.has('disabled')) {
      forEach(
        this.querySelectorAll(CDSAccordion.selectorAccordionItems),
        (elem) => {
          if (this.disabled) {
            elem.setAttribute('disabled', '');
          } else {
            elem.removeAttribute('disabled');
          }
        }
      );
    }

    const items = Array.from(
      this.querySelectorAll(CDSAccordion.selectorAccordionItems)
    );
    items.forEach((item) => item.removeAttribute('data-last-item'));
    const lastVisible = items
      .reverse()
      .find((item) => !(item as HTMLElement).hidden);
    lastVisible?.setAttribute('data-last-item', '');
  }

  render() {
    return html`<slot></slot>`;
  }

  /**
   * Selector for querying accordion item descendants.
   * Resolved at call time so it respects any `setPrefix()` call.
   */
  static get selectorAccordionItems() {
    return `${getPrefix()}-${CDSAccordionItem[BASE_NAME]}`;
  }

  static styles = styles;
}

Object.defineProperty(CDSAccordion, TAG_NAME, {
  get: () => `${getPrefix()}-${CDSAccordion[BASE_NAME]}`,
  configurable: true,
});

export default CDSAccordion;

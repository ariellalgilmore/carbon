/**
 * Copyright IBM Corp. 2021, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { registerGlobal } from '../../globals/register';
import CDSAccordion from './accordion';
import CDSAccordionItem from './accordion-item';
import CDSAccordionItemSkeleton from './accordion-item-skeleton';
import CDSAccordionSkeleton from './accordion-skeleton';

registerGlobal(CDSAccordion, CDSAccordionItem, CDSAccordionItemSkeleton, CDSAccordionSkeleton);
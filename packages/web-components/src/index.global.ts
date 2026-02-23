import { registerGlobal } from './globals/register';
import CDSAccordion from './components/accordion/accordion';
import CDSAccordionItem from './components/accordion/accordion-item';
// ... all other components

registerGlobal(
  CDSAccordion,
  CDSAccordionItem,
  // ...
);
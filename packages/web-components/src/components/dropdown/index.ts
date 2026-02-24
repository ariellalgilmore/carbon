/**
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import './dropdown';
// import './dropdown-item';
import './dropdown-skeleton';

import { registerGlobal } from '../../globals/register';
import CDSDropdown from './dropdown';
import CDSDropdownItem from './dropdown-item';

registerGlobal(CDSDropdown, CDSDropdownItem);
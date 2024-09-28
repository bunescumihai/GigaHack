import { NgModule } from '@angular/core';

import { TablerIconsModule } from 'angular-tabler-icons';
import {
  IconHomeFilled,
  IconReceipt,
  IconTag,
  IconUsers,
  IconFileText,
  IconCash,
  IconChartBar,
  IconDiscount,
  IconGlobe,
  IconMail,
  IconSettingsFilled,
  IconArrowNarrowRight,
  IconSearch,
  IconArrowNarrowLeft,
  IconBuilding,
  IconChartHistogram,
} from 'angular-tabler-icons/icons';

// Select some icons (use an object, not an array)
const icons = {
  IconChartHistogram,
  IconBuilding,
  IconSettingsFilled,
  IconArrowNarrowRight,
  IconArrowNarrowLeft,
  IconSearch,
  IconHomeFilled,
  IconReceipt,
  IconTag,
  IconUsers,
  IconFileText,
  IconCash,
  IconChartBar,
  IconDiscount,
  IconGlobe,
  IconMail
};

@NgModule({
  imports: [
    TablerIconsModule.pick(icons)
  ],
  exports: [
    TablerIconsModule
  ]
})
export class IconsModule { }

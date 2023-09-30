import { isPlatformBrowser } from '@angular/common';
import { InjectionToken } from '@angular/core';

export const IS_PLATFORM_BROWSER_TOKEN = new InjectionToken('isPlatformBrowser', {
  factory: () => isPlatformBrowser
});

import { isPlatformServer } from '@angular/common';
import { InjectionToken } from '@angular/core';

export const IS_PLATFORM_SERVER_TOKEN = new InjectionToken('isPlatformServer', {
  factory: () => isPlatformServer
});

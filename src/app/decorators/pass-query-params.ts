import { ActivatedRoute } from '@angular/router';

export function PassQueryParams(getRoute: (this: unknown) => ActivatedRoute) {
  return function (
    target: unknown,
    propName: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const route = getRoute.call(this);
      const queryParams = route.snapshot.queryParams;
      const params: { [key: string]: string } = {};

      for (const [key, value] of Object.entries(queryParams)) {
        params[key] = value;
      }
      return originalFunction.call(this, ...args, params);
    };

    return descriptor;
  };
}

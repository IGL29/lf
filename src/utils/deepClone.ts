export function deepClone<T extends Array<unknown> | Record<string, unknown>>(target: T): T {
  if (Array.isArray(target)) {
    const cloneTarget = <(typeof target)[keyof typeof target]>[];

    for (const item of target) {
      if (typeof item === 'object' && item !== null) {
        cloneTarget.push(deepClone(<Array<unknown>>item));
        continue;
      }
      cloneTarget.push(item);
    }
    return cloneTarget;
  }

  if (isObject(target)) {
    const cloneObject = <typeof target>{};

    for (const [key, value] of Object.entries(target)) {
      if (isObject(value)) {
        cloneObject[key] = deepClone(value);
        continue;
      }
      cloneObject[key] = value;
    }
    return cloneObject;
  }

  throw new Error(`Expected argument type of object or array, but received ${target}`);
}

function isObject(arg: unknown): arg is { [key: string]: unknown } {
  return typeof arg === 'object' && !Array.isArray(arg) && arg !== null;
}

export const mockWindow: Record<string, any> = {
  scrollTo: () => null,
  target: {
    innerWidth: 0,
    innerHeight: 0
  },
  localStorage: {
    getItem: () => null,
    setItem: () => null
  },
  innerWidth: 0,
  innerHeight: 0,
  resize: null,
  addEventListener: (currentTarget: HTMLElement, event: keyof GlobalEventHandlersEventMap) => ({
    type: event,
    currentTarget
  })
};

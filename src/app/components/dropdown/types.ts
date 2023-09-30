export type Trigger = 'click' | 'hover';
export type UiEvent = MouseEvent | PointerEvent;
export type IsCloseBy = 'mouseleave' | null;
export interface IEventHandlerArgs {
  event?: UiEvent;
  value?: boolean;
}
export type ContentPosition = 'left' | 'right' | 'center';

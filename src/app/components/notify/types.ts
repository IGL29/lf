export interface INotify {
  title: string;
  text?: string;
  type: NotifyType;
}

export type NotifyType = 'error' | 'warn' | 'success';

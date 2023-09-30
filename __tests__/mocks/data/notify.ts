import { INotify } from '~components/notify/types';

export const getMockNotify = ({
  title = 'some title',
  type = <const>'warn',
  text = ''
} = {}): INotify => ({
  title,
  type,
  text
});

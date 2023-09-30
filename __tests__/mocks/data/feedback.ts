import { IFeedbackData } from '~components/feedback-form/types';

export const getMockFeedbackData = ({
  comment = 'some comment text',
  name = 'John Doe',
  phone = '88005353535'
} = {}): IFeedbackData => ({
  comment,
  name,
  phone
});

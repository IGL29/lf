import { of } from 'rxjs';

export const mockCorporateClientsService = jasmine.createSpyObj([
  'getRequestLoading',
  'submitForm',
  'doClearForm'
]);

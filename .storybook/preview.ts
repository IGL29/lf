import { Preview, moduleMetadata } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID } from '@angular/core';
import DocumentationTemplate from './DocumentationTemplate.mdx';

setCompodocJson(docJson);
registerLocaleData(localeRu);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'main',
      values: [
        {
          name: 'main',
          value: '#222222'
        }
      ]
    },
    docs: {
      page: DocumentationTemplate
    }
  },
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: LOCALE_ID,
          useValue: 'ru'
        }
      ]
    })
  ]
};

export default preview;

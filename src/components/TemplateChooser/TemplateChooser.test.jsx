import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import TemplateChooser from './TemplateChooser';
import templateSVG from './template.svg';
import { v4 as uuid } from 'uuid';
import config from '@plone/volto/registry';

const mockStore = configureStore();

beforeAll(() => {
  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    __grid: {
      id: '__grid',
      title: 'Grid',
      group: 'media',
      view: () => <div className="mocked-block-view-grid" />,
      edit: () => <div className="mocked-block-edit-grid" />,
      restricted: false,
      mostUsed: true,
      sidebarTab: 1,
      maxNumberOfColumns: 4,
    },
  };
});

test('renders a TemplateChooser component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: { templateid: 'Template default translation' },
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <TemplateChooser
        templates={() => [
          {
            image: templateSVG,
            id: 'templateid',
            defaultMessage: 'Template default translation',
            columns: [
              {
                id: uuid(),
                type: 'teaser',
              },
            ],
          },
        ]}
        onSelectTemplate={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

import React from 'react';
import renderer from 'react-test-renderer';
import BlockRenderer from './BlockRenderer';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders a text block component using the block renderer', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <BlockRenderer
        data={{ url: 'heroimage.jpg' }}
        block="theblockid"
        edit
        type="text"
        selected={false}
        onChangeBlock={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

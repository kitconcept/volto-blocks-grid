import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

export const GridSchema = (props) => {
  const { intl } = props;

  return {
    title: 'Grid',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
    ],

    properties: {},
    required: [],
  };
};

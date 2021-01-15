import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
});

export const TeaserSchema = (props) => {
  const { intl } = props;

  return {
    title: 'Item',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['href', 'title', 'description', 'preview_image'],
      },
    ],

    properties: {
      href: {
        title: intl.formatMessage(messages.Source),
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description', 'hasPreviewImage'],
      },
      title: {
        title: 'Title',
      },
      description: {
        title: 'Description',
      },
      preview_image: {
        title: 'Image override',
        widget: 'object_browser',
        mode: 'image',
      },
    },
    required: [],
  };
};

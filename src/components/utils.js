import { defineMessages } from 'react-intl';
import { blocks } from '~/config';

const messages = defineMessages({
  Variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

export function getAllowedBlocks(type) {
  return blocks.blocksConfig?.[type]?.gridAllowedBlocks;
}

export const applySchemaEnhancer = (schema, block, variation, intl) => {
  const variations = blocks?.blocksConfig[block]?.variations;

  const schemaExtender = variations?.[variation]?.['schemaExtender'];

  if (schemaExtender) {
    return schemaExtender(schema, intl);
  } else {
    return schema;
  }
};

export const getVariationComponent = (block, variation) => {
  const variations = blocks?.blocksConfig[block]?.variations;

  return variations?.[variation]?.components?.view;
};

export const addVariationsFieldToSchema = (
  block,
  schema,
  currentVariation,
  intl,
) => {
  const variations = blocks?.blocksConfig[block]?.variations;

  if (variations) {
    schema.fieldsets[0].fields.push('variation');
    schema.properties.variation = {
      title: intl.formatMessage(messages.Variation),
      choices: Object.keys(variations).map((key) => [
        key,
        intl.formatMessage({
          id: variations[key].label,
          defaultMessage: variations[key].label,
        }),
      ]),
      value: currentVariation,
      removeNoValue: true,
    };
  }

  return schema;
};

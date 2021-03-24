import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  Variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

export function getAllowedBlocks(type) {
  return config.blocks.blocksConfig?.[type]?.gridAllowedBlocks;
}

export const applySchemaEnhancer = (
  schema,
  schemaEnhancer,
  block,
  variation,
  intl,
) => {
  let resultantSchema = schema;
  const variations = config.blocks?.blocksConfig[block]?.variations;
  // We enhance the schema from two possible sources: Variation extenders and block enhancers
  // This is the Variation extender
  const schemaExtender = variations?.[variation]?.['schemaExtender'];

  if (schemaExtender) {
    resultantSchema = schemaExtender(schema, intl);
  }

  // This is the enhancer schema
  if (schemaEnhancer) {
    resultantSchema = schemaEnhancer(schema);
  }
  return resultantSchema;
};

export const getVariationComponent = (block, variation) => {
  const variations = config.blocks?.blocksConfig[block]?.variations;

  return variations?.[variation]?.components?.view;
};

export const addVariationsFieldToSchema = (
  block,
  schema,
  currentVariation,
  intl,
) => {
  const variations = config.blocks?.blocksConfig[block]?.variations;

  if (variations) {
    schema.fieldsets[0].fields.unshift('variation');
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
      noValueOption: false,
    };
  }

  return schema;
};

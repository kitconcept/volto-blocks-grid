import { blocks } from '~/config';

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

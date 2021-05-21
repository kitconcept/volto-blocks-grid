import config from '@plone/volto/registry';

export function getAllowedBlocks(type) {
  return config.blocks.blocksConfig?.[type]?.gridAllowedBlocks;
}

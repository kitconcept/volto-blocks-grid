import { blocks } from '~/config';

export function getAllowedBlocks(type) {
  return blocks.blocksConfig?.[type]?.gridAllowedBlocks;
}

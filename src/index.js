import {
  GridViewBlock,
  GridEditBlock,
  TeaserViewBlock,
  TeaserEditBlock,
} from './components';
import gridSVG from './icons/grid.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import './theme/styles.less';

const customBlocks = {
  __grid: {
    id: '__grid',
    title: 'Grid',
    icon: gridSVG,
    group: 'common',
    view: GridViewBlock,
    edit: GridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    // This has a good reason: Slate does not work in detached mode if enabled
    blockHasOwnFocusManagement: true,
    security: {
      addPermission: [],
      view: [],
    },
    maxNumberOfColumns: 4,
    gridAllowedBlocks: ['teaser', 'image', 'listing', 'slate', 'text'],
  },
  teaserGrid: {
    id: 'teaserGrid',
    title: 'Teaser Grid',
    icon: imagesSVG,
    group: 'teasers',
    view: GridViewBlock,
    edit: GridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    gridAllowedBlocks: ['teaser'],
  },
  imagesGrid: {
    id: 'imagesGrid',
    title: 'Images grid',
    icon: imagesSVG,
    group: 'common',
    view: GridViewBlock,
    edit: GridEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    gridAllowedBlocks: ['image'],
  },
  teaser: {
    id: 'teaser',
    title: 'Teaser',
    icon: imagesSVG,
    group: 'common',
    view: TeaserViewBlock,
    edit: TeaserEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

const applyConfig = (config) => {
  return {
    ...config,
    blocks: {
      ...config.blocks,
      blocksConfig: {
        ...config.blocks.blocksConfig,
        ...customBlocks,
      },
    },
  };
};

export default applyConfig;

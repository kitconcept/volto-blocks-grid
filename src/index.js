import {
  GridViewBlock,
  GridEditBlock,
  TeaserViewBlock,
  TeaserEditBlock,
  TeaserBlockDefaultBody,
} from './components';
import { TeaserSchema } from './components/Teaser/schema';
import { TeaserBlockDataAdapter } from './components/Teaser/adapter';
import { gridTeaserDisableStylingSchema } from './components/Teaser/schema';

import gridSVG from './icons/grid.svg';
import imagesSVG from '@plone/volto/icons/images.svg';

import './theme/styles.less';

const applyConfig = (config) => {
  config.blocks.blocksConfig.teaser = {
    id: 'teaser',
    title: 'Teaser',
    icon: imagesSVG,
    group: 'common',
    view: TeaserViewBlock,
    edit: TeaserEditBlock,
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    blockSchema: TeaserSchema,
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: TeaserBlockDefaultBody,
      },
    ],
  };

  config.blocks.blocksConfig.__grid = {
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
    blocksConfig: {
      ...config.blocks.blocksConfig,
      teaser: {
        ...config.blocks.blocksConfig.teaser,
        schemaEnhancer: gridTeaserDisableStylingSchema,
      },
    },
  };

  const customBlocks = {
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
  };

  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    ...customBlocks,
  };

  config.registerComponent({
    name: 'dataAdapter',
    dependencies: ['Teaser', 'BlockData'],
    component: TeaserBlockDataAdapter,
  });

  return config;
};

export default applyConfig;

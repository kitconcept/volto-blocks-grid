# Volto Blocks Grid (by kitconcept)

[![NPM](https://img.shields.io/npm/v/@kitconcept/volto-blocks-grid.svg)](https://www.npmjs.com/package/@kitconcept/volto-blocks-grid)
[![Build Status](https://github.com/kitconcept/volto-blocks-grid/actions/workflows/code.yml/badge.svg)](https://github.com/kitconcept/volto-blocks-grid/actions)
[![Build Status](https://github.com/kitconcept/volto-blocks-grid/actions/workflows/unit.yml/badge.svg)](https://github.com/kitconcept/volto-blocks-grid/actions)
[![Build Status](https://github.com/kitconcept/volto-blocks-grid/actions/workflows/acceptance.yml/badge.svg)](https://github.com/kitconcept/volto-blocks-grid/actions)

![kitconcept GmbH](https://raw.githubusercontent.com/kitconcept/volto-form-builder/master/kitconcept.png)

Volto Blocks Grid allows sophisticated page layouts for Plone 6 (Volto).

![gif-video](https://user-images.githubusercontent.com/486927/114311809-8b032600-9af0-11eb-90e0-0944294a6084.gif)

[Full size video](https://user-images.githubusercontent.com/486927/114309930-40ca7680-9ae9-11eb-873d-0504bddc0682.mov)

## Philosophy

At kitconcept, we think that providing a full featured, two dimensional free will layout
(eg. Plone Mosaic-ish like) experience to users is often overwhelming for them,
specially if these users are not technical or power users. Providing a proper and
comprehensive UX for this kind of layouts are often hard and counter intuitive,
specially when dealing with behaviors in responsive layouts. Our experience is that
allowing that also enables an easy path to craft "ugly layouts" way out of the (most
probably) existing site style guide.

By providing a mean to restrict the users to unidimensional layouts (and still enabling
them to build with them 2D layouts) are better than an UX that allows you to arbitrary
position blocks in a 2D space.

Also, unidimensional grids are also more in line of the current design trends in modern
web, where we can often find these unified one rowed sections, specially in landing pages.

## Compatibility

Due to a change in CSS happening in Volto 16.0.0 RC2, this is the compatibility grid for this add-on:

|Version   |Volto version |
|----------|--------------|
|>=5.2.0   |>=16.0.0-rc.2 |
|<=5.1.1   |<=16.0.0-a50  |

## Block included in this package

### Grid block

This block can contain any registered block in the application. By default, it's
restricted to `Image`, `Text`, `slate`, `Teaser` and `Listing`. More can be customized via the
block config `gridAllowedBlocks` key:

```js
  __grid: {
    id: '__grid',
...
    gridAllowedBlocks: ['teaser', 'image', 'listing', 'text'],
  },
```

You can even further customize the blocks config available for the inner blocks by passing `blocksConfig` key as a block config. You can add different variations, schemaEnhancers, etc or remove them as well:

```js
config.blocks.blocksConfig.__grid.gridAllowedBlocks: ['teaser', 'image', 'slate'];
config.blocks.blocksConfig.__grid.blocksConfig: {
  // One could customize the blocks inside the grid like this:
  ...config.blocks.blocksConfig,
  teaser: {
    ...config.blocks.blocksConfig.teaser,
    variations: [
      {
        id: 'default',
        isDefault: true,
        title: 'Default',
        template: DefaultBody,
      },
      {
        id: 'variation2',
        title: 'variation #2',
        template: DefaultBody2,
      },
    ],
  },
};
```

### Teaser Grid block

This block is restricted by default to contain `Teaser` block type.

### Image Grid block

This block is restricted by default to contain `Image` block type.

## Create your own block types

You can craft your personalized grid types by restricting the block types allowed inside
by creating a new block type and using the `gridAllowedBlocks` key:

```js
import {
  GridViewBlock,
  GridEditBlock,
  TeaserViewBlock,
  TeaserEditBlock,
} from './components';

...
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
    gridAllowedBlocks: ['teaser'],
  },
    teaser: {
    id: 'teaser',
    title: 'Teaser',
    icon: imagesSVG,
    group: 'common',
    view: TeaserViewBlock,
    edit: TeaserEditBlock,
    restricted: true,
    mostUsed: true,
    sidebarTab: 1,
    blockSchema: TeaserSchema,
    dataAdapter: TeaserBlockDataAdapter,
    imageScale: 'teaser'
  },
```

any registered block types are allowed.

## Teaser block

This package includes a Teaser block that allows you to pull content from a source content object and brings in to a block (`title`, `head_line`, `description`, and `preview_image` fields). It tries to get these fields from the original source content first, and allows you to override them afterwards.

The Teaser block can be used in Grids and as standalone block as well. In the standalone version, it includes an alignment styling option to position the target teased image.

You'll find the `preview_image` field in `plone.volto` (and previous to that, in `kitconcept.volto`) add-on. You should add it to the content types that you plan to use as teased elements. If no `preview_image` field is present in the source content, it will fallback to the `image` (eg. `Lead image` behavior), if any. If no image fields are present, it won't show any image unless you override it (using the local `preview_image` field) in the block's config.

It includes a configuration option `imageScale` (see above example) that allows you to use an specific scale for the `preview_image`. It defaults to `teaser` scale.

### Data adapter

When a target is selected in a teaser block, an adapter is executed in case that you want to manipulate the data that it's being saved into the block. In case that you want to override the data adapter you have to provide your own adapter in the Teaser block settings `dataAdapter`.

```js
import { TeaserBlockDataAdapter } from './components/Teaser/adapter';
import { TeaserSchema } from './components/Teaser/schema';
...
  teaser: {
    ...
    blockSchema: TeaserSchema,
    dataAdapter: TeaserBlockDataAdapter,
  },
```

The default adapter only saves locally (for caching purposes) the fields `title`, `head_line`, `description`, and `preview_image`. You can add your own there if you need more data from the target in your block.

## Compatibility

2.0.0 -> Volto 12.14.0 or above
1.0.0 -> Anything lower

## Similar products

You can try other similar products developed by some of our fellow community members and
companies.

- [@eeacms/volto-grid-block](https://github.com/eea/volto-grid-block)
- [volto-subblocks](https://github.com/collective/volto-subblocks)

## Install

If you already have a Volto project, just update `package.json`:

```JSON
"addons": [
    "@kitconcept/volto-blocks-grid"
],

"dependencies": {
    "@kitconcept/volto-blocks-grid": "*"
}
```

If not, create one:

```shell
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon @kitconcept/volto-blocks-grid
cd my-volto-project
```

Install new add-on and restart Volto:

```shell
yarn install
yarn start
```

Go to http://localhost:3000

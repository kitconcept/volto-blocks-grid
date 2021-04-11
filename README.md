# kitconcept's Volto Blocks Grids

![kitconcept GmbH](https://raw.githubusercontent.com/kitconcept/volto-form-builder/master/kitconcept.png)

This package includes blocks for building unidimensional (x-axis) grids in Volto.

[Full size video](https://user-images.githubusercontent.com/486927/114309930-40ca7680-9ae9-11eb-873d-0504bddc0682.mov)

## Philosophy

At kitconcept, we think that providing a full featured, two dimensional free will layout
(eg. Plone Mosaic-ish like) to users is often overwhelming, specially if these users are
not technical or power users. Providing a proper and comprehensive UX for this kind of
layouts are often hard and counter intuitive, specially when dealing with behaviors in
responsive layouts. Our experience is that allowing that also enables an easy path to
craft "ugly layouts" way out of the (most probably) existing site style guide.

By providing a mean to restrict the users to unidimensional layouts (and still enabling
them to build with them 2D layouts) are better than an UX that allows you to arbitrary
position blocks in a 2D space.

Also, unidimensional grids are also more in line of the current design trends in modern
web, where we can often find these unified one rowed sections, specially in landing pages.

## Blocks that include this package

### Grid block

This block can contain any registered block in the application. By default, it's
restricted to `Image`, `Text`, `Teaser` and `Listing`. More can be customized via the
block config `gridAllowedBlocks` key:

```js
  __grid: {
    id: '__grid',
...
    gridAllowedBlocks: ['teaser', 'image', 'listing', 'text'],
  },
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
    security: {
      addPermission: [],
      view: [],
    },
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
    security: {
      addPermission: [],
      view: [],
    },
  },
```

any registered block types are allowed.

## Similar products

You can try other similar products developed by some of our fellow community members and
companies.

- [@eeacms/volto-grid-block](https://github.com/eea/volto-grid-block)
- [volto-subblocks](https://github.com/collective/volto-subblocks)

# Change Log

## 5.1.2 (unreleased)

### Feature

- Compatibility with Volto 16.0.0-rc.2 @sneridagh

### Bugfix

- Fix CSS for blocks chooser @sneridagh

## 5.1.1 (2022-09-30)

### Bugfix

- Reverted #60. The feature is sub-optimal. @sneridagh

## 5.1.0 (2022-09-30)

### Feature

- The `teaser` block can be resetted from the Grid controls interface. One click on the `X` it resets in (nothing selected), another one removes the column @sneridagh

### Internal

- Update to use latest `@plone/scripts` @sneridagh

## 5.0.1 (2022-09-19)

### Bugfix

- Fix image height when height property is added (#277) @reebalazs

## 5.0.0 (2022-09-02)

### Breaking

- Change Teaser block settings `href` field literal from `Source` to `Target` @sneridagh

## 4.3.0 (2022-08-16)

### Feature

- Include image_scales when selecting an item for a teaser block

### Internal

- Make uppercase translation of spalte and spalten @iFlameing

## 4.2.0 (2022-08-05)

### Feature

- Compatible with the new component registry in Volto 16 @sneridagh
- Keep compatibility with the experimental one @sneridagh

### Bugfix

- Fix config to be compatible with the new full registry in pipeline of Volto 16.0.0-alpha.22 @sneridagh

## 4.1.1 (2022-08-04)

### Bugfix

- Revert https://github.com/kitconcept/volto-blocks-grid/pull/36 since it seems that it was covered in another part of the stack (maybe in SemanticUI itself). Now streched columns in SemanticUI grids have now the same height (and they are filling all the available space, in case that the inner color is different or have a border). @sneridagh

## 4.1.0 (2022-07-18)

### Feature

- Adding support for automatically switch to the template based on content type in teaser @iFlameing

## 4.0.0 (2022-07-13)

### Breaking

- Unify inner markup for Teaser to make it work inside and outside a grid. Use the convention of a common main wrapper using: `<div class="block teaser">`. @sneridagh

### Feature

- Enable Style wrapper in Teaser @sneridagh

## 3.1.1 (2022-07-13)

### Internal

- Add missing support in View components for `blocksConfig` @sneridagh
- Add default variation for easier customization using variations @sneridagh

## 3.1.0 (2022-06-21)

### Feature

- Support for inner blocks local configuration using `blocksConfig` key. This allows fine tuning configuration of the inner blocks, like add/remove variations, schemaEnhancers, etc @sneridagh

## 3.0.2 (2022-06-13)

### Bugfix

- Small CSS improvements, for teaser stand alone @sneridagh
- Use CSS `aspect-ratio` since it's already supported by all major browser vendors @sneridagh
- Remove typo in alt text for teasers @sneridagh

## 3.0.1 (2022-06-09)

### Bugfix

- Fix CSS in teaserGrid and in standalone Teaser view @sneridagh

## 3.0.0 (2022-06-08)

### Breaking

- The `Teaser` block has changed markup. Now the `a` link tag sorrounds the main `div`: [Related PR changes](https://github.com/kitconcept/volto-blocks-grid/pull/40/files#diff-301af2b0b7af3b7bba424497d919944f01395cb75be6914f2e17ea3bf2e12c89L36). Adjust your customizations and themes accordingly. @robgietema

### Feature

- Add stylewrapper support @sneridagh
- Teaser block can be used separately also @robgietema
- Teaser block layout is dependent if inside grid or not @robgietema

## 2.5.0 (2022-05-04)

### Feature

- Configurable max number of columns from config @ionlizarazu

### Bugfix

- Fix tests for Volto 14 @sneridagh

### Internal

- Use `@plone/scripts *` @sneridagh

## 2.4.1 (2021-11-29)

### Bugfix

- Fix inline height flex grow problem for slate grids @sneridagh

## 2.4.0 (2021-11-04)

### Feature

- Use image field as fallback for teaser and preview @ericof

### Bugfix

- Play well with the new blocks defaults @sneridagh

### Internal

- Upgrade @plone/scripts 1.0.3

## 2.3.0 (2021-09-27)

### Feature

- New i18n in Volto 14, use @plone/scripts @sneridagh

### Internal

- Upgrade @plone/scripts 1.0.2

## 2.2.2 (2021-09-20)

### Bugfix

- Fix press ENTER in the Grid main container block creates a new block @sneridagh

## 2.2.1 (2021-09-17)

### Internal

- Revert "Add the enter key support in grid block to create the default text block below." @sneridagh

## 2.2.0 (2021-09-08)

### Feature

- Add the enter key support in grid block to create the default text block below. @iFlameing

### Internal

- Add Brazilian Portuguese translation @ericof

## 2.1.0 (2021-07-06)

### Feature

- Add support for `head_title` behavior @iFlameing @sneridagh

### Bugfix

- Make Slate block work properly @tiberiuichim
- Change the title of teaser sidebar from 'Element' to 'Teaser' @iFlameing

### Internal

- Detached mode 2.0 @tiberiuichim
- Related slate/text styling @sneridagh
- Add german translation for head_title in teaser/data @ThomasKindermann

## 2.0.0 (2021-05-22)

### Breaking

- Start using variations facilities from Volto core. This requires at least Volto 12.14.0 If you created any variation for a grid (or the internal Teaser block) you should update the variation definitions in your config. @sneridagh
- Move to `SchemaRenderer` and `MaybeWrap` to core components @sneridagh

### Bugfix

- Fixes #12, default image in teaser is now Plone classic standard one, overridable using the `imageScale` in the teaser block config @sneridagh

### Internal

- Add a wrapper for the content (div with class content) in Teaser @sneridagh

## 1.0.0 (2021-04-11)

### Feature

- Initial release @sneridagh

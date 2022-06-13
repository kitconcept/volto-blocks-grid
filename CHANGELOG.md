# Change Log

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

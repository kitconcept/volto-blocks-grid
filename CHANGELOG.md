# Change Log

## 2.4.1 (unreleased)

### Breaking

### Feature

### Bugfix

### Internal

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

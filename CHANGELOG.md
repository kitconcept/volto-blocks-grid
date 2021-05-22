# Change Log

## 1.0.1 (unreleased)

### Breaking

- Start using variations facilities from Volto core. This requires at least Volto 12.14.0 If you created any variation for a grid (or the internal Teaser block) you should update the variation definitions in your config. @sneridagh
- Move to `SchemaRenderer` and `MaybeWrap` to core components @sneridagh

### Feature

### Bugfix

- Fixes #12, default image in teaser is now Plone classic standard one, overridable using the `imageScale` in the teaser block config @sneridagh

### Internal

- Add a wrapper for the content (div with class content) in Teaser @sneridagh

## 1.0.0 (2021-04-11)

### Feature

- Initial release @sneridagh

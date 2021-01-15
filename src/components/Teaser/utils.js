export function getTeaserImageURL(href, image) {
  if (image) {
    return `${image['@id']}/@@images/image/teaser`;
  } else {
    return `${href['@id']}/@@images/preview_image/teaser`;
  }
}

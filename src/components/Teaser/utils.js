import { isInternalURL } from '@plone/volto/helpers';

export function getTeaserImageURL(href, image) {
  if (image) {
    if (isInternalURL(image['@id'])) {
      return `${image['@id']}/@@images/image/teaser`;
    } else {
      return image['@id'];
    }
  } else {
    return `${href['@id']}/@@images/preview_image/teaser`;
  }
}

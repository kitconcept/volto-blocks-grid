import React from 'react';
import { TeaserBody } from '@kitconcept/volto-blocks-grid/components';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserView = (props) => {
  return <TeaserBody {...props} />;
};

export default withBlockExtensions(TeaserView);

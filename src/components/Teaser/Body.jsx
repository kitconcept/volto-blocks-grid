import React from 'react';
import PropTypes from 'prop-types';
import { DefaultBody } from '@kitconcept/volto-blocks-grid/components';
import config from '@plone/volto/registry';

const TeaserBody = (props) => {
  const { variation, data } = props;

  const hasType = data.href?.[0]?.['@type'];
  const variationComponent = hasType && `Teaser|${data.href?.[0]?.['@type']}`;

  const BodyComponent =
    config.resolve(variationComponent).component ||
    variation?.template ||
    DefaultBody;

  return <BodyComponent {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;

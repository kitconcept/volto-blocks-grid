import React from 'react';
import PropTypes from 'prop-types';
import { getVariationComponent } from '../utils';
import DefaultBody from './DefaultBody';

const TeaserDefaultTemplate = (props) => {
  const { data, parentBlock, variation } = props;

  const BodyComponent =
    getVariationComponent(data['@type'], variation) ||
    getVariationComponent(parentBlock, variation) ||
    DefaultBody;

  return <BodyComponent {...props} />;
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;

import React from 'react';
import PropTypes from 'prop-types';
import { DefaultBody } from '@kitconcept/volto-blocks-grid/components';

const TeaserBody = (props) => {
  const { variation } = props;

  const BodyComponent = variation?.template || DefaultBody;

  return <BodyComponent {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserBody;

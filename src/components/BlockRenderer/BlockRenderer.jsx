import React from 'react';
import PropTypes from 'prop-types';
import { blocks } from '~/config';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

/**
 * BlockRenderer container class.
 * @class Form
 * @extends Component
 */
function BlockRenderer(props) {
  if (!props.type) {
    // We could have an empty block, although should be handled somewhere else
    return null;
  }

  const EditBlock = blocks.blocksConfig[props.type].edit;
  const ViewBlock = blocks.blocksConfig[props.type].view;

  if (!props.edit) {
    return <ViewBlock {...props} detached onChangeBlock={() => {}} />;
  }
  if (props.edit) {
    return (
      <EditBlock
        {...props}
        detached
        index={0}
        onSelectBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        onAddBlock={() => {}}
        onDeleteBlock={() => {}}
        onMutateBlock={() => {}}
        handleKeyDown={() => {}}
      />
    );
  }
  return '';
}

BlockRenderer.propTypes = {
  edit: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withObjectBrowser(BlockRenderer);

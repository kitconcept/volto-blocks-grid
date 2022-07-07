import React from 'react';
import {
  TeaserBody,
  TeaserData,
} from '@kitconcept/volto-blocks-grid/components';
import { SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

const TeaserEdit = (props) => {
  const { data, onChangeBlock, block, selected } = props;

  return (
    <>
      <TeaserBody {...props} isEditMode />
      <SidebarPortal selected={selected}>
        <TeaserData
          {...props}
          data={data}
          block={block}
          onChangeBlock={onChangeBlock}
        />
      </SidebarPortal>
    </>
  );
};

export default withBlockExtensions(TeaserEdit);

import React from 'react';
import { Button } from 'semantic-ui-react';
import { BlockChooser, Icon } from '@plone/volto/components';
import useOutsideClick from '@kitconcept/volto-blocks/helpers/useOutsideClick/useOutsideClick';
import addSVG from '@plone/volto/icons/add.svg';

const NewBlockAddButton = (props) => {
  const { block, index, onChangeGridItem } = props;
  const ref = React.useRef();
  const [isOpenMenu, setOpenMenu] = React.useState(false);

  useOutsideClick(ref, () => setOpenMenu(false));

  return (
    <>
      {isOpenMenu ? (
        <div ref={ref}>
          <BlockChooser
            onMutateBlock={(block, value) => onChangeGridItem(index, value)}
            currentBlock={block}
            showRestricted
            allowedBlocks={['teaser', 'image', 'listing']}
          />
        </div>
      ) : (
        <Button
          basic
          icon
          onClick={() => setOpenMenu(true)}
          className="add-block-button"
        >
          <Icon name={addSVG} className="circled" size="24px" />
        </Button>
      )}
    </>
  );
};

export default NewBlockAddButton;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from './utils';
import { MaybeWrap } from '../../components';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserDefaultTemplate = ({
  block,
  data,
  dataBlock,
  isEditMode,
  onChangeBlock,
}) => {
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (href && !data.title && !data.description) {
      dispatch(getContent(href['@id'], null, block)).then((resp) => {
        onChangeBlock(block, {
          ...data,
          ...(!data.title && { title: resp.title }),
          ...(!data.description && { description: resp.description }),
        });
      });
    }
    if (!href) {
      onChangeBlock(block, {
        ...data,
        title: '',
        description: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [href]);

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item default">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <div className="grid-teaser-item top">
          <MaybeWrap
            condition={!isEditMode}
            as={Link}
            to={flattenToAppURL(href['@id'])}
            target={data.openLinkInNewTab ? '_blank' : null}
          >
            {(href.hasPreviewImage || image) && (
              <div className="grid-image-wrapper">
                <img
                  src={flattenToAppURL(getTeaserImageURL(href, image))}
                  alt="a"
                  loading="lazy"
                />
              </div>
            )}
            <h3>{data?.title}</h3>
            {!data.hide_description && <p>{data?.description}</p>}
          </MaybeWrap>
        </div>
      )}
    </>
  );
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;

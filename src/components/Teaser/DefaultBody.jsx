import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from './utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
});

const TeaserDefaultTemplate = (props) => {
  const { data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];

  return (
    <>
      {!href && isEditMode && (
        <Message>
          <div className="grid-teaser-item placeholder">
            <img src={imageBlockSVG} alt="" />
            <p>{intl.formatMessage(messages.PleaseChooseContent)}</p>
          </div>
        </Message>
      )}
      {href && (
        <MaybeWrap
          condition={!isEditMode}
          as={UniversalLink}
          href={href['@id']}
          target={data.openLinkInNewTab ? '_blank' : null}
        >
          <div className="grid-teaser-item default">
            {(href.hasPreviewImage || href.image_field || image) && (
              <div className="grid-image-wrapper">
                <img
                  src={flattenToAppURL(getTeaserImageURL(href, image))}
                  alt="a"
                  loading="lazy"
                />
              </div>
            )}
            <div className="content">
              {data?.head_title && <h2>{data?.head_title}</h2>}

              <h3>{data?.title}</h3>
              {!data.hide_description && <p>{data?.description}</p>}
            </div>
          </div>
        </MaybeWrap>
      )}
    </>
  );
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;

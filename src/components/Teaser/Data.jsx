import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { getContent } from '@plone/volto/actions';
import { BlockDataForm } from '@plone/volto/components';
import { TeaserSchema } from './schema';

const TeaserData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();

  const href = data.href?.[0];
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

  const schema = TeaserSchema({ ...props, intl });

  return (
    <BlockDataForm
      schema={schema}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      block={block}
    />
  );
};

export default TeaserData;

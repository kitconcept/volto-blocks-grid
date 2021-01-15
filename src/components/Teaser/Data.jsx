import React from 'react';
import { useIntl } from 'react-intl';
import { SchemaRenderer } from '@kitconcept/volto-blocks/components';
import { TeaserSchema } from './schema';
import { blocks } from '~/config';

const TeaserData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = TeaserSchema({ ...props, intl });

  const applySchemaEnhancer = (schema) => {
    const variations = blocks?.blocksConfig['teaser']?.variations;

    const schemaExtender = variations?.[data.variation]?.['schemaExtenderItem'];

    if (schemaExtender) {
      return schemaExtender(schema, props, intl);
    } else {
      return schema;
    }
  };

  return (
    <SchemaRenderer
      schema={applySchemaEnhancer(schema)}
      title={schema.title}
      onChangeField={(id, value) => {
        onChangeBlock(block, {
          ...data,
          [id]: value,
        });
      }}
      formData={data}
      fieldIndex={data.index}
    />
  );
};

export default TeaserData;

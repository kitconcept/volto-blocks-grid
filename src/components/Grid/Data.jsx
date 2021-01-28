import React from 'react';
import { useIntl } from 'react-intl';
import { SchemaRenderer } from '../../components';
import { addVariationsFieldToSchema, applySchemaEnhancer } from '../utils';
import { GridSchema } from './schema';

const GridData = (props) => {
  const { block, data, onChangeBlock } = props;
  const intl = useIntl();
  const schema = addVariationsFieldToSchema(
    data['@type'],
    GridSchema({ ...props, intl }),
    data.variation,
    intl,
  );

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

export default GridData;

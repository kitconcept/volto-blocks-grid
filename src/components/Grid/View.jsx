import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { BlockRenderer } from '../../components';

const ViewGrid = ({ data, render, path }) => {
  return (
    <div
      className={cx('block __grid', {
        [data['@type']]: true,
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
        one: data?.columns?.length === 1,
        two: data?.columns?.length === 2,
        three: data?.columns?.length === 3,
        four: data?.columns?.length === 4,
      })}
    >
      <Grid stackable columns={data.columns.length}>
        {data.columns.map((column) => (
          <Grid.Column key={column.id}>
            <BlockRenderer
              block={column.id}
              type={column['@type']}
              data={column}
              variation={data.variation}
              parentBlock={data['@type']}
            />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ViewGrid.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ViewGrid;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import { Icon, SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

import addSVG from '@plone/volto/icons/add.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import { TemplateChooser } from '../../components';
import GridData from './Data';

import { replaceItemOfArray } from '@plone/volto/helpers/Utils/Utils';

import { getAllowedBlocks } from '../utils';
import templates from './templates';

import config from '@plone/volto/registry';
import Cells from './Cells';

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class EditGrid extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  state = {
    selectedColumnIndex: 0,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onChangeBlock = this.onChangeBlock.bind(this);

    // sets defaults
    if (!this.props.data.columns) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: [],
      });
    }
  }

  onChangeGridItem = (index, gridItemData) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...gridItemData,
      }),
    });
  };

  /**
   * Align block handler
   * @method onAlignBlock
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignBlock(align) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      align,
    });
  }

  /**
   * Change inner blocks handler
   * @method onChangeBlock
   * @param {object} editorState Editor state.
   * @param {number} index Editor card index
   * @returns {undefined}
   */
  onChangeBlock(data, index) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        ...data,
      }),
    });
  }

  addNewColumn = (e) => {
    e.stopPropagation();
    var maxNumberOfColumns =
      config.blocks.blocksConfig.__grid.maxNumberOfColumns > 16
        ? 16
        : config.blocks.blocksConfig.__grid.maxNumberOfColumns;
    const type =
      getAllowedBlocks(this.props.data['@type'])?.length === 1
        ? getAllowedBlocks(this.props.data['@type'])[0]
        : null;
    const newColumnsState = [
      ...this.props.data.columns,
      {
        id: uuid(),
        ...(type && { '@type': type }),
      },
    ];
    if (this.props.data.columns.length < maxNumberOfColumns) {
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        columns: newColumnsState,
      });
    }
  };

  removeColumn = (e, index) => {
    e.stopPropagation();
    const newColumnsState = this.props.data.columns.filter(
      (item, i) => i !== index,
    );
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: newColumnsState,
    });
  };

  clearColumn = (e, index) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        url: '',
      }),
    });
  };

  onChangeColumnSettings = (e, index, key, value) => {
    e.stopPropagation();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        ...this.props.data.columns[index],
        [key]: value,
      }),
    });
  };

  onSelectTemplate = (templateIndex) => {
    const resultantTemplates =
      getAllowedBlocks(this.props.data['@type'])?.length === 1
        ? templates(getAllowedBlocks(this.props.data['@type'])[0])
        : templates();
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: resultantTemplates(this.props.intl)[templateIndex].columns,
    });
  };

  onChangeSelectedColumnItem = (index) =>
    this.setState({ selectedColumnIndex: index });

  node = React.createRef();

  onResetGridItem = (index, gridItemData) => {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns: replaceItemOfArray(this.props.data.columns, index, {
        id: this.props.data.columns[index]['id'],
        block: this.props.data.columns[index]['block'],
        ...gridItemData,
      }),
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;

    const blocksConfig =
      config.blocks.blocksConfig.__grid.blocksConfig || this.props.blocksConfig;

    return (
      <>
        {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button
                aria-label={`Add grid element`}
                icon
                basic
                onClick={(e) => this.addNewColumn(e)}
              >
                <Icon name={addSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                aria-label={`Select grid block`}
                icon
                basic
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ selectedColumnIndex: null });
                  this.node.current.focus();
                }}
              >
                <Icon name={configSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
        <div
          className={cx({
            [data['@type']]: true,
            one: data?.columns && data.columns.length === 1,
            two: data?.columns && data.columns.length === 2,
            three: data?.columns && data.columns.length === 3,
            four: data?.columns && data.columns.length === 4,
          })}
          // This is required to enabling a small "in-between" clickable area
          // for bringing the Grid sidebar alive once you have selected an inner block
          onClick={(e) => {
            this.setState({ selectedColumnIndex: null });
            this.node.current.focus();
          }}
          // Custom own focus management
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.props.onAddBlock(
                config.settings.defaultBlockType,
                this.props.index + 1,
              );
            }
            if (e.key === 'ArrowUp') {
              this.props.onFocusPreviousBlock(
                this.props.id,
                this.props.blockNode.current,
              );
              e.preventDefault();
            }
            if (e.key === 'ArrowDown') {
              this.props.onFocusNextBlock(
                this.props.id,
                this.props.blockNode.current,
              );
              e.preventDefault();
            }
          }}
          ref={this.node}
          role="presentation"
          style={{ outline: 'none' }}
          // The tabIndex is required for the keyboard navigation and for making the element interactive
          /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
          tabIndex="0"
        >
          {this.props.data.columns && this.props.data.headline && (
            <h2 className="headline">{data.headline}</h2>
          )}

          {!this.props.data.columns?.length && (
            <TemplateChooser
              templates={
                getAllowedBlocks(this.props.data['@type'])?.length === 1
                  ? templates(getAllowedBlocks(this.props.data['@type'])[0])
                  : templates()
              }
              onSelectTemplate={this.onSelectTemplate}
            />
          )}
          <Cells
            {...this.props}
            selectedColumnIndex={this.state.selectedColumnIndex}
            onChangeSelectedColumnItem={this.onChangeSelectedColumnItem}
            onResetGridItem={this.onResetGridItem}
            removeColumn={this.removeColumn}
            onChangeGridItem={this.onChangeGridItem}
            blocksConfig={blocksConfig}
          />
          <SidebarPortal
            selected={
              this.props.selected &&
              !this.state.selectedColumnIndex &&
              this.state.selectedColumnIndex !== 0
            }
          >
            <GridData {...this.props}></GridData>
          </SidebarPortal>
        </div>
      </>
    );
  }
}

export default compose(
  injectIntl,
  withRouter,
  withBlockExtensions,
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    {},
  ),
)(EditGrid);

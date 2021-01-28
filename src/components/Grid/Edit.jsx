import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Grid, Ref } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import { Icon, SidebarPortal } from '@plone/volto/components';

import addSVG from '@plone/volto/icons/add.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import configSVG from '@plone/volto/icons/configuration.svg';

import { BlockRenderer, TemplateChooser } from '../../components';
import NewBlockAddButton from './NewBlockAddButton';
import GridData from './Data';

import { reorderArray, replaceItemOfArray } from '../../helpers';

import { getAllowedBlocks } from '../utils';
import templates from './templates';

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

  onDragEnd = (result) => {
    const { source, destination } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const columns = reorderArray(
      this.props.data.columns,
      source.index,
      destination.index,
    );

    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      columns,
    });

    this.onChangeSelectedColumnItem(destination.index);
  };

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
    if (this.props.data.columns.length < 4) {
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
      columns: resultantTemplates()[templateIndex].columns,
    });
  };

  onChangeSelectedColumnItem = (index) =>
    this.setState({ selectedColumnIndex: index });

  node = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { data } = this.props;

    return (
      <>
        {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button icon basic onClick={(e) => this.addNewColumn(e)}>
                <Icon name={addSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={(e) => {
                  e.stopPropagation();
                  this.setState({ selectedColumnIndex: null });
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
        >
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

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={uuid()} direction="horizontal">
              {(provided) => (
                <Ref innerRef={provided.innerRef}>
                  <Grid
                    {...provided.droppableProps}
                    columns={
                      this.props.data.columns
                        ? this.props.data.columns.length
                        : 0
                    }
                  >
                    {this.props.data.columns &&
                      this.props.data.columns.map((item, index) => (
                        <Draggable
                          draggableId={item.id}
                          index={index}
                          key={item.id}
                        >
                          {(provided) => {
                            item = { ...item, block: item.id };
                            return (
                              <Ref innerRef={provided.innerRef}>
                                <Grid.Column
                                  key={item.id}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={cx('renderer-wrapper', {
                                      empty: !item['@type'],
                                    })}
                                    role="presentation"
                                    // This prevents propagation of ENTER
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={() =>
                                      this.onChangeSelectedColumnItem(index)
                                    }
                                  >
                                    {item['@type'] ? (
                                      <BlockRenderer
                                        {...this.props}
                                        block={item.id}
                                        edit
                                        type={item['@type']}
                                        selected={
                                          this.state.selectedColumnIndex ===
                                          index
                                        }
                                        onChangeBlock={(block, data) => {
                                          this.onChangeGridItem(index, data);
                                        }}
                                        data={this.props.data.columns[index]}
                                      />
                                    ) : (
                                      <div className="uber-grid-default-item">
                                        <Button
                                          basic
                                          icon
                                          onClick={(e) =>
                                            this.removeColumn(e, index)
                                          }
                                          className="remove-block-button"
                                        >
                                          <Icon
                                            name={clearSVG}
                                            className="circled"
                                            size="24px"
                                          />
                                        </Button>
                                        <p>Add a new block</p>
                                        <NewBlockAddButton
                                          block={this.props.blocks}
                                          index={index}
                                          onChangeGridItem={
                                            this.onChangeGridItem
                                          }
                                          allowedBlocks={getAllowedBlocks(
                                            this.props.data['@type'],
                                          )}
                                        />
                                      </div>
                                    )}

                                    {/* {this.props.render({
                                    item,
                                    index,
                                    path: getBaseUrl(this.props.pathname),
                                    onChangeGridItem: this.onChangeGridItem,
                                    columns: data.columns,
                                  })} */}
                                  </div>
                                </Grid.Column>
                              </Ref>
                            );
                          }}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Grid>
                </Ref>
              )}
            </Droppable>
          </DragDropContext>
          <SidebarPortal selected={this.props.selected}>
            <GridData {...this.props}></GridData>
          </SidebarPortal>
        </div>
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    {},
  ),
)(EditGrid);

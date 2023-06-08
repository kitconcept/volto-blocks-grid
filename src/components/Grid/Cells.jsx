import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Grid, Ref } from 'semantic-ui-react';
import cx from 'classnames';
import { BlockRenderer } from '../../components';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import NewBlockAddButton from './NewBlockAddButton';
import { getAllowedBlocks } from '../utils';

const Cells = (props) => {
  const {
    onDragEnd,
    block,
    droppableId,
    selected,
    selectedColumnIndex,
    onSelectBlock,
    onChangeSelectedColumnItem,
    onResetGridItem,
    onChangeGridItem,
    removeColumn,
    blocksConfig,
    data,
  } = props;
  const columns = data.columns;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId} direction="horizontal">
        {(provided) => (
          <Ref innerRef={provided.innerRef}>
            <Grid
              stackable
              stretched
              {...provided.droppableProps}
              columns={columns ? columns.length : 0}
            >
              {columns &&
                columns.map((item, index) => (
                  <Draggable draggableId={item.id} index={index} key={item.id}>
                    {(provided) => {
                      item = { ...item, block: item.id };
                      return (
                        <Ref innerRef={provided.innerRef}>
                          <Grid.Column
                            className={cx(
                              `grid-block-${item['@type']}`,
                              item?.variation && `variation-${item.variation}`,
                            )}
                            key={item.id}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={cx('renderer-wrapper', {
                                empty: !item['@type'],
                                selected:
                                  selected && selectedColumnIndex === index,
                              })}
                              role="presentation"
                              // This prevents propagation of ENTER
                              onKeyDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectBlock(block);
                                onChangeSelectedColumnItem(index);
                              }}
                            >
                              {item['@type'] ? (
                                <Button
                                  aria-label={`Reset grid element ${index}`}
                                  basic
                                  icon
                                  onClick={(e) => onResetGridItem(index, {})}
                                  className="remove-block-button"
                                >
                                  <Icon
                                    name={clearSVG}
                                    className="circled"
                                    size="24px"
                                  />
                                </Button>
                              ) : (
                                <Button
                                  aria-label={`Remove grid element ${index}`}
                                  basic
                                  icon
                                  onClick={(e) => removeColumn(e, index)}
                                  className="remove-block-button"
                                >
                                  <Icon
                                    name={clearSVG}
                                    className="circled"
                                    size="24px"
                                    color="#e40166"
                                  />
                                </Button>
                              )}
                              {item['@type'] ? (
                                <BlockRenderer
                                  {...props}
                                  id={item.id}
                                  block={item.id}
                                  edit
                                  type={item['@type']}
                                  selected={
                                    selected && selectedColumnIndex === index
                                  }
                                  onChangeBlock={(block, data) => {
                                    onChangeGridItem(index, data);
                                  }}
                                  data={columns[index]}
                                  blocksConfig={blocksConfig}
                                />
                              ) : (
                                <div className="uber-grid-default-item">
                                  <p>Add a new block</p>
                                  <NewBlockAddButton
                                    block={block}
                                    index={index}
                                    onChangeGridItem={onChangeGridItem}
                                    allowedBlocks={getAllowedBlocks(
                                      data['@type'],
                                    )}
                                  />
                                </div>
                              )}
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
  );
};

export default Cells;

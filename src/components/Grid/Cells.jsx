import { Grid } from 'semantic-ui-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require the mouse to move by 1 pixels before activating
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={columns.map((item) => item.id)}
        strategy={horizontalListSortingStrategy}
      >
        <Grid stackable stretched columns={columns ? columns.length : 0}>
          {columns?.map((item, index) => {
            item = { ...item, block: item.id };
            return (
              <SortableItem
                {...props}
                key={item.id}
                id={item.id}
                index={index}
                item={item}
              />
            );
          })}
        </Grid>
      </SortableContext>
    </DndContext>
  );
};

export default Cells;

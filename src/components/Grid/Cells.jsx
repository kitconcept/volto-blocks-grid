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
import { reorderArray } from '@plone/volto/helpers/Utils/Utils';

const Cells = (props) => {
  const { block, onChangeBlock, onChangeSelectedColumnItem, data } = props;

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

  const onDragEnd = (event) => {
    const { active, over } = event;

    const indexActive = active.data.current.sortable.index;
    const indexOver = over.data.current.sortable.index;

    if (active.id !== over.id) {
      onChangeBlock(block, {
        ...data,
        columns: reorderArray(columns, indexActive, indexOver),
      });

      onChangeSelectedColumnItem(indexOver);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={columns?.map((item) => item.id) || []}
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

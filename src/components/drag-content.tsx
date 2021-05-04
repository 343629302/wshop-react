import { ReactNode } from 'react';
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

//类型
interface IProps {
  children: ReactNode;
  dragId: string;
  handleDragEnd: (newIndex: number, oldIndex: number) => void;
  handleDragStart?: (index: number) => void;
}

const DragContent = (props: IProps) => {
  //拖拽结束
  const handleDragEnd = (result: DropResult) => {
    const oldIndex = result.source.index;
    const newIndex =
      result.destination?.index == undefined
        ? oldIndex
        : result.destination?.index;
    props.handleDragEnd(newIndex, oldIndex);
  };

  //拖拽开始
  const handleDragStart = (result: DragStart) => {
    const index = parseInt(result.draggableId);
    if (props.handleDragStart) {
      props.handleDragStart(index);
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result, provided) => handleDragEnd(result)}
      onDragStart={(result, provided) => handleDragStart(result)}
    >
      <Droppable droppableId={props.dragId}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragContent;

import {Droppable} from 'react-beautiful-dnd';
import {IBoardProps} from './Board';
import styled from 'styled-components';

function TrashBin({boardId}: IBoardProps) {
	return (
		<Droppable droppableId={boardId}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					TrashBinIcon
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}

export default TrashBin;

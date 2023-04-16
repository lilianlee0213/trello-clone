import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {memo} from 'react';
const Card = styled.div<{isDragging: boolean}>`
	padding: 10px;
	border-radius: 5px;
	&:not(:last-child) {
		margin-bottom: 10px;
	}
	background-color: ${(props) =>
		props.isDragging ? '#AAC4FF' : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? '0px 2px 5px rgba(0,0,0,0.3)' : 'none'};
	border: ${(props) =>
		props.isDragging ? `2px solid ${props.theme.bgColor}` : 'none'};
`;
interface IDragabbleCardProps {
	toDo: string;
	index: number;
}
function DragabbleCard({toDo, index}: IDragabbleCardProps) {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(provided, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

export default memo(DragabbleCard);

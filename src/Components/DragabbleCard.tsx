import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';
import {memo} from 'react';
const Card = styled.div`
	padding: 10px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.cardColor};
	&:not(:last-child) {
		margin-bottom: 10px;
	}
`;
interface IDragabbleCardProps {
	toDo: string;
	index: number;
}
function DragabbleCard({toDo, index}: IDragabbleCardProps) {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(provided) => (
				<Card
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

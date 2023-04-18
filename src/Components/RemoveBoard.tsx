import {Droppable} from 'react-beautiful-dnd';
import {IAreaProps, IBoardProps} from './Board';
import styled from 'styled-components';

const Area = styled.div<IAreaProps>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: ${(props) => (props.isDraggingOver ? '70px' : '60px')};
	aspect-ratio: 1;
	border-radius: 50%;
	background-color: ${(props) =>
		props.isDraggingOver ? props.theme.textColor : '#ffffff3b'};
	transition: all 0.2s ease-in;
	i {
		position: absolute;
		font-size: ${(props) => (props.isDraggingOver ? '30px' : '25px')};
		color: ${(props) => (props.isDraggingOver ? props.theme.bgColor : 'black')};
	}
`;

function TrashBin({boardId}: IBoardProps) {
	return (
		<Droppable droppableId={boardId}>
			{(provided, snapshot) => (
				<Area
					isDraggingOver={snapshot.isDraggingOver}
					ref={provided.innerRef}
					{...provided.droppableProps}>
					<i className="fa-regular fa-trash-can"></i>
					{provided.placeholder}
				</Area>
			)}
		</Droppable>
	);
}

export default TrashBin;

import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

interface IBoardProps {
	toDos: string[];
	boardId: string;
}
interface IAreaProps {
	isdraggingFromThisWith: boolean;
	isDraggingOver: boolean;
}

const BoardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	min-height: 300px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.h2`
	padding: 10px;
	margin-bottom: 10px;
	font-weight: 500;
	font-size: 18px;
	color: black;
`;
const Area = styled.div<IAreaProps>`
	padding: 10px 10px 20px;
	flex-grow: 1;
	background-color: ${(props) =>
		props.isDraggingOver
			? '#FFD1D1'
			: props.isdraggingFromThisWith
			? '#CDF0EA'
			: 'transparent'};

	transition: background-color 0.3s ease-in-out;
`;

function Board({toDos, boardId}: IBoardProps) {
	return (
		<BoardWrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(provided, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isdraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{toDos.map((toDo, index) => (
							<DragabbleCard key={toDo} index={index} toDo={toDo} />
						))}
						{provided.placeholder}
					</Area>
				)}
			</Droppable>
		</BoardWrapper>
	);
}
export default Board;

import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
const BoardWrapper = styled.div`
	padding: 10px 10px 20px;
	width: 300px;
	min-height: 300px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.boardColor};
`;
const Title = styled.h2`
	margin-bottom: 10px;
	font-weight: 500;
	font-size: 18px;
	color: black;
`;

interface IBoardProps {
	toDos: string[];
	boardId: string;
}

function Board({toDos, boardId}: IBoardProps) {
	return (
		<BoardWrapper>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{toDos.map((toDo, index) => (
							<DragabbleCard key={toDo} index={index} toDo={toDo} />
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</BoardWrapper>
	);
}
export default Board;

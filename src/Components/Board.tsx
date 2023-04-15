import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';

const BoardWrapper = styled.div`
	padding: 30px 10px 20px;
	min-height: 200px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.boardColor};
`;
interface IBoardProps {
	toDos: string[];
	boardId: string;
}

function Board({toDos, boardId}: IBoardProps) {
	return (
		<Droppable droppableId={boardId}>
			{(provided) => (
				<BoardWrapper ref={provided.innerRef} {...provided.droppableProps}>
					{toDos.map((toDo, index) => (
						<DragabbleCard key={toDo} index={index} toDo={toDo} />
					))}
					{provided.placeholder}
				</BoardWrapper>
			)}
		</Droppable>
	);
}
export default Board;

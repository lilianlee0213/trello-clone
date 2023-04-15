import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {toDoState} from './atom';
import Board from './Components/Board';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	max-width: 680px;
	width: 100%;
	height: 100vh;
`;
const Boards = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px;
	width: 100%;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({destination, source, draggableId}: DropResult) => {
		if (!destination) return;
		// setToDos((oldToDos) => {
		// 	const copyTodos = [...oldToDos];
		// 	//1) Delete item on source.index
		// 	copyTodos.splice(source.index, 1);
		// 	//2> Put back the item on the destination.index
		// 	copyTodos.splice(destination?.index, 0, draggableId);
		// 	return copyTodos;
		// });
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;

import {DragDropContext, DropResult, Droppable} from 'react-beautiful-dnd';
import {useRecoilState, useSetRecoilState} from 'recoil';
import styled from 'styled-components';
import {toDoState, trashState} from './atom';
import Board from './Components/Board';
import TrashBin from './Components/RemoveBoard';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 50px;
	margin: 0 auto;
	max-width: 880px;
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
	const setTrashCan = useSetRecoilState(trashState);
	const onDragEnd = (info: DropResult) => {
		const {destination, source} = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			//same board movement;
			setToDos((allBoards) => {
				//1) make a copy of the board has been modified
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObject = boardCopy[source.index];
				//2) Delete item on source.index
				boardCopy.splice(source.index, 1);
				//3)Put back the item on the destination.index
				boardCopy.splice(destination?.index, 0, taskObject);

				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
		// cross board movement
		if (
			destination?.droppableId !== source.droppableId &&
			destination?.droppableId !== 'remove'
		) {
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const taskObject = sourceBoard[source.index];
				const destinationBoard = [...allBoards[destination.droppableId]];
				sourceBoard.splice(source.index, 1);
				destinationBoard.splice(destination?.index, 0, taskObject);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard,
				};
			});
		}
		if (destination?.droppableId === 'remove') {
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				sourceBoard.splice(source.index, 1);
				console.log(destination);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
				};
			});
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
					))}
				</Boards>
				<TrashBin boardId={'remove'} />
			</Wrapper>
		</DragDropContext>
	);
}

export default App;

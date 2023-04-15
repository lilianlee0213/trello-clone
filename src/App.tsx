import {
	DragDropContext,
	Draggable,
	DropResult,
	Droppable,
} from 'react-beautiful-dnd';
import {useRecoilState} from 'recoil';
import styled from 'styled-components';
import {toDoState} from './atom';

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	max-width: 480px;
	width: 100%;
	height: 100vh;
`;
const Boards = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	width: 100%;
`;
const Board = styled.div`
	padding: 30px 10px 20px;
	min-height: 200px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.boardColor};
`;
const Card = styled.div`
	padding: 10px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.cardColor};
	margin-bottom: 5px;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({destination, source, draggableId}: DropResult) => {
		if (!destination) return;
		setToDos((oldToDos) => {
			const copyTodos = [...oldToDos];
			//1) Delete item on source.index
			copyTodos.splice(source.index, 1);
			//2> Put back the item on the destination.index
			copyTodos.splice(destination?.index, 0, draggableId);
			return copyTodos;
		});
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId="one">
						{(provided) => (
							<Board ref={provided.innerRef} {...provided.droppableProps}>
								{toDos.map((toDo, index) => (
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
								))}
								{provided.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;

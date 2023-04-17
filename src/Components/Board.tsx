import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
import {useForm} from 'react-hook-form';
import {ITodo, toDoState} from '../atom';
import {useSetRecoilState} from 'recoil';

interface IBoardProps {
	toDos: ITodo[];
	boardId: string;
}

interface IForm {
	toDo: string;
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
const Form = styled.form`
	width: 100%;
`;

function Board({toDos, boardId}: IBoardProps) {
	const setToDos = useSetRecoilState(toDoState);
	const {register, setValue, handleSubmit} = useForm<IForm>();
	const onValid = ({toDo}: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [newToDo, ...allBoards[boardId]],
			};
		});
		setValue('toDo', '');
	};
	return (
		<BoardWrapper>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('toDo', {required: true})}
					type="text"
					placeholder={`Add task on ${boardId}`}
				/>
			</Form>
			<Droppable droppableId={boardId}>
				{(provided, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isdraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{toDos.map((toDo, index) => (
							<DragabbleCard
								key={toDo.id}
								index={index}
								toDoId={toDo.id}
								toDoText={toDo.text}
							/>
						))}
						{provided.placeholder}
					</Area>
				)}
			</Droppable>
		</BoardWrapper>
	);
}
export default Board;

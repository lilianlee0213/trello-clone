import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';
import DragabbleCard from './DragabbleCard';
import {useForm} from 'react-hook-form';
import {ITodo, toDoState} from '../atom';
import {useSetRecoilState} from 'recoil';

export interface IBoardProps {
	toDos?: ITodo[];
	boardId: string;
}

interface IForm {
	toDo: string;
}
export interface IAreaProps {
	isdraggingFromThisWith?: boolean;
	isDraggingOver: boolean;
}
const BoardWrapper = styled.div`
	display: flex;
	flex-direction: column;
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
	padding: 10px;
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
	width: 90%;
	margin: 0 auto;
	padding: 10px 0 20px;
`;
const Input = styled.input`
	padding: 5px;
	border: none;
	font-size: 14px;
	font-family: 'Source Sans Pro', sans-serif;
	text-align: center;
	background-color: transparent;
	&:focus {
		&::placeholder {
			color: transparent;
		}
		outline: 2px solid ${(props) => props.theme.bgColor};
		text-align: left;
		background-color: white;
	}
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
			<Droppable droppableId={boardId}>
				{(provided, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isdraggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{toDos?.map((toDo, index) => (
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
			<Form onSubmit={handleSubmit(onValid)}>
				<Input
					{...register('toDo', {required: true})}
					type="text"
					placeholder={`+ Add a card`}
				/>
			</Form>
		</BoardWrapper>
	);
}
export default Board;

import {atom} from 'recoil';

interface IToDoState {
	[key: string]: string[];
}
export const toDoState = atom<IToDoState>({
	key: 'toDo',
	default: {
		'To do': ['a', 'b', 'c'],
		'In process': ['d', 'e'],
		Completed: ['f'],
	},
});

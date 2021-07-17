import { ActionType } from '../actions-types'
import {
	Action,
	UpdateCellAction,
	DeleteCellAction,
	MoveCellAction,
	InsertCellAfterAction,
	Direction,
} from '../actions'
import { Cell, CellTypes } from '../cell'
import { Dispatch } from 'redux'
import axios from 'axios'

// try Action as annotation
export const updateCell = (id: string, content: string): UpdateCellAction => {
	return {
		type: ActionType.UPDATE_CELL,
		payload: { id: id, content: content },
	}
}

export const deleteCell = (id: string): DeleteCellAction => {
	return {
		type: ActionType.DELETE_CELL,
		payload: id,
	}
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
	return {
		type: ActionType.MOVE_CELL,
		payload: {
			id: id,
			direction: direction,
		},
	}
}

export const insertCellAfter = (
	id: string | null,
	CellTypes: CellTypes
): InsertCellAfterAction => {
	return {
		type: ActionType.INSERT_CELL_AFTER,
		payload: {
			id: id,
			type: CellTypes,
		},
	}
}

export const fetchCells = () => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionType.FETCH_CELLS,
		})

		try {
			// const { data }: { data: Cell[] } = await axios.get('/cells')
			const { data }: { data: Cell[] } = await axios.get('default.json')

			dispatch({
				type: ActionType.FETCH_CELLS_COMPLETE,
				payload: data,
			})
		} catch (err) {
			dispatch({
				type: ActionType.FETCH_CELLS_ERROR,
				payload: err.message,
			})
		}
	}
}

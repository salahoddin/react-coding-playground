// import produce from 'immer'
// import { ActionType } from '../actions-types'
// import { Action } from '../actions'
// import { Cell } from '../cell'

// interface CellsState {
// 	loading: boolean
// 	error: string | null
// 	order: string[]
// 	data: {
// 		[key: string]: Cell
// 	}
// }

// const initialState: CellsState = {
// 	loading: false,
// 	error: null,
// 	order: [],
// 	data: {},
// }

// export const cellsReducer = produce(
// 	// (state: cellsState = initialState, action: Action): cellsState => {
// 	(state: CellsState = initialState, action: Action): CellsState => {
// 		switch (action.type) {
// 			case ActionType.UPDATE_CELL: {
// 				const { id, content } = action.payload
// 				state.data[id].content = content

// 				return state
// 			}
// 			case ActionType.DELETE_CELL: {
// 				delete state.data[action.payload]
// 				state.order.filter((id) => id !== action.payload)

// 				return state
// 			}
// 			case ActionType.MOVE_CELL: {
// 				const { direction } = action.payload
// 				const index = state.order.findIndex((id) => id === action.payload.id)
// 				const targetIndex = direction === 'up' ? index - 1 : index + 1

// 				if (targetIndex < 0 || targetIndex > state.order.length - 1) {
// 					return state
// 				}

// 				// swapping logic
// 				const initVal = state.order[index]
// 				state.order[index] = state.order[targetIndex]
// 				// state.order[targetIndex] = initVal
// 				state.order[targetIndex] = action.payload.id

// 				return state
// 			}
// 			case ActionType.INSERT_CELL_BEFORE: {
// 				const cell: Cell = {
// 					id: randomId(),
// 					content: '',
// 					type: action.payload.type,
// 				}

// 				// 1-insert cell id and cell
// 				state.data[cell.id] = cell

// 				const foundIndex = state.order.findIndex(
// 					(id) => id === action.payload.id
// 				)

// 				if (foundIndex < 0) {
// 					state.order.push(cell.id)
// 				} else {
// 					// 2-immer insert to array
// 					state.order.splice(foundIndex, 0, cell.id)
// 				}

// 				return state
// 			}
// 			default:
// 				return state
// 		}
// 	}
// )

// const randomId = () => {
// 	return Math.random().toString(36).substr(2, 5)
// }

// export default cellsReducer

// import produce from 'immer'
import { ActionType } from '../actions-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellsState {
	loading: boolean
	error: string | null
	order: string[]
	data: {
		[key: string]: Cell
	}
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
}

export const cellsReducer =
	// (state: cellsState = initialState, action: Action): cellsState => {
	(state: CellsState = initialState, action: Action): CellsState => {
		switch (action.type) {
			case ActionType.FETCH_CELLS: {
				state.loading = true
				state.error = null
				return state
			}
			case ActionType.FETCH_CELLS_COMPLETE: {
				console.log(action.payload)

				state.order = action.payload.map((cell) => cell.id) // order array
				// state data
				state.data = action.payload.reduce((acc, cell) => {
					// returns [key: string]: Cell
					acc[cell.id] = cell
					return acc
				}, {} as CellsState['data'])

				return state
			}
			case ActionType.FETCH_CELLS_ERROR: {
				state.loading = false
				state.error = action.payload
				return state
			}
			case ActionType.UPDATE_CELL: {
				const { id, content } = action.payload
				state.data[id].content = content

				return state
			}
			case ActionType.DELETE_CELL: {
				delete state.data[action.payload]
				state.order = state.order.filter((id) => id !== action.payload)
				return state
			}
			case ActionType.MOVE_CELL: {
				const { direction } = action.payload
				const index = state.order.findIndex((id) => id === action.payload.id)
				const targetIndex = direction === 'up' ? index - 1 : index + 1

				if (targetIndex < 0 || targetIndex > state.order.length - 1) {
					return state
				}

				// swapping logic
				// const initVal = state.order[index]
				// state.order[targetIndex] = initVal
				state.order[index] = state.order[targetIndex]
				state.order[targetIndex] = action.payload.id

				return state
			}
			case ActionType.INSERT_CELL_AFTER: {
				const cell: Cell = {
					id: randomId(),
					content: '',
					type: action.payload.type,
				}

				// 1-insert cell id and cell
				state.data[cell.id] = cell

				const foundIndex = state.order.findIndex(
					(id) => id === action.payload.id
				)
				// if id is not found in order array
				if (foundIndex < 0) {
					state.order.unshift(cell.id)
				} else {
					// 2-immer insert to array
					state.order.splice(foundIndex + 1, 0, cell.id)
				}

				return state
			}
			default:
				return state
		}
	}

const randomId = () => {
	return Math.random().toString(36).substr(2, 5)
}

export default cellsReducer
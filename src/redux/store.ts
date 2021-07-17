import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reducers from './reducers'

// import { ActionType } from './actions-types'

const middleWares = [thunk]

export const store = createStore(
	reducers,
	{},
	composeWithDevTools(applyMiddleware(...middleWares))
)

// store.dispatch({
// 	type: ActionType.INSERT_CELL_AFTER,
// 	payload: {
// 		id: null,
// 		type: 'text',
// 		content: 'hi',
// 	},
// })

// test
// let id = store.getState().cells.order[0]

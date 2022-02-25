import { combineReducers } from 'redux';
import custumersReducer from './custumersReducer';
import productInventoryReducer from './productInventoryReducer';


const reducers = combineReducers({
   productInventory: productInventoryReducer,
   custumersReducer: custumersReducer
});

export default reducers;


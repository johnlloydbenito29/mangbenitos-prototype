import { combineReducers } from 'redux';
import productInventoryReducer from './productInventoryReducer';

const reducers = combineReducers({
   productInventory: productInventoryReducer
});

export default reducers;


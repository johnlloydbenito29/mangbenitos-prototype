const initialState = { merchQuantity: 5 };

const custumersReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'ADD_QUANTITY':
         return {
            merchQuantity: state.merchQuantity + 1,
         };

      default:
         return state;
   }
};

export default custumersReducer;

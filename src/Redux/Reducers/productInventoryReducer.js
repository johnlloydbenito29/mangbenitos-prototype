const initialState = { initialProductArray: [], updatedProductData: [], initialInventory: [] };

const productInventoryReducer = (state = initialState, action) => {
   switch (action.type) {
      case 'GET_PRODUCTLIST_DATA':
         return {
            ...state,
            initialProductArray: action.payload,
         };
      case 'GET_UPDATED_PRODUCT_DATA':
         return {
            ...state,
            updatedProductData: action.updatedProductDataPayload,
         };
      default:
         return state;
   }
};

export default productInventoryReducer;

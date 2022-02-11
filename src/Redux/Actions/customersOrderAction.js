export const getLatestInventory = (invArr) => {
   return  async function (dispatch) {
      dispatch({ type: 'GET_LATEST_INVENTORY', payLoad: invArr });
   };
};

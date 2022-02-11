
const initialState = {latestInventory:[]}

const custumersReducer = (state = initialState,action) => {
  
    switch (action.type) {
        case "GET_LATEST_INVENTORY":
            const latestInvArr = action.payLoad.reduce((prevInvarr,latestInvArr)=>(prevInvarr = prevInvarr > latestInvArr.item.createdAt ? prevInvarr: latestInvArr),0)
            return {
                ...state,
                latestInventory:latestInvArr
            }
    
        default:
            return state;
    }

}

export default custumersReducer
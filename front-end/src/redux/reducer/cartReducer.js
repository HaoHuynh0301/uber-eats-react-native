let defaultState = {
  selectedItems: { items: [], restaurantName: "" },
  checkedoutItems: [],
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };
      if (action.payload.checkboxValue) {
        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      if (newState.selectedItems.items.length === 0) {
        newState.selectedItems.restaurantName = "";
      }
      return newState;
    }
    case "CHECKED_OUT_REQUEST": {
      let newState = { ...state };
      newState.checkedoutItems = [...newState.checkedoutItems, action.payload];
      newState.selectedItems = { items: [], restaurantName: "" };
      console.log(newState);
      return newState;
    }
    case "UPDATE_SELECTED_ITEM": {
      let newState = { ...state };
      let updateItem = action.payload.item;    
      let newArray = state.selectedItems.items.map((element) =>
        element.title === updateItem.title
          ? { ...element, quantity: updateItem.quantity }
          : element
      );
      newState.selectedItems.items = [...newArray];
      return newState;
    }
    default:
      return state;
  }
};

export { cartReducer };

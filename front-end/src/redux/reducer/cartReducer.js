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
      return newState;
    }
    case "UPDATE_SELECTED_ITEM":
      console.log('REDUCER');
      let newState = { ...newState };
      let updateItem = action.payload.item;
      let newArray = state.selectedItems.items.map((element) =>
        element.restaurantName === updateItem.restaurantName
          ? { ...element, quantity: updateItem.quantity }
          : element
      );
      newState.selectedItems = [...newArray];
      return newState;
    default:
      return state;
  }
};

export { cartReducer };

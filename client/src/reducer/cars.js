export default (state = {}, action) => {
  const newState = {...state};
  switch (action.type) {
    case "FETCH_CARS": {
      return action.payload
    }
    case "ADD_CAR": {
      newState[action.payload.vin] = action.payload.information;
      return newState;
    }
    case "UPDATE_CAR": {
      if (!(action.payload.vin in newState)) {
        throw new Error("vin not found: " + action.payload.vin);
      }
      newState[action.payload.vin] = action.payload.information;
      return newState;
    }
    case "DELETE_CAR": {
      if (!(action.payload in newState)) {
        throw new Error("vin not found: " + action.payload);
      }
      delete newState[action.payload];
      return newState;
    }
    default: {
      return newState
    }
  }
}

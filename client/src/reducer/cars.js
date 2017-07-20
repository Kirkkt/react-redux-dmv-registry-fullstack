export default (state = {
  "ABC300984": {
    mileage: 27880,
    make: "Toyota",
    model: "Corolla",
  },
  "DEF998877": {
    mileage: 0,
    make: "Ford",
    model: "Focus",
  },
  "XYZ668872": {
    mileage: 1000,
    make: "Toyota",
    model: "Camry",
  },
}, action) => {
  const newState = {...state};
  switch (action.type) {
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

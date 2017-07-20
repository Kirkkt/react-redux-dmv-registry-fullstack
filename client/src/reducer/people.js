export default (state = {}, action) => {
  const newState = {...state}
  switch (action.type) {
    case "FETCH_PEOPLE": {
      return action.payload
    }
    case "ADD_PEOPLE": {
      newState[action.payload.id] = action.payload.information
      return newState
    }
    case "UPDATE_PEOPLE": {
      if (!(action.payload.id in newState)) {
        throw new Error("id not found: " + action.payload.id)
      }
      newState[action.payload.id] = action.payload.information
      return newState
    }
    case "DELETE_PEOPLE": {
      if (!(action.payload in newState)) {
        throw new Error("id not found: " + action.payload)
      }
      delete newState[action.payload]
      return newState
    }
    default: {
      return newState
    }
  }
}

import store from "../store"

const addRegistry = ({id, vin}) => {
  store.dispatch({
    type: "ADD_REGISTRY",
    payload: {
      id,
      vin,
    }
  })
}

const deleteRegistry = ({id, vin}) => {
  store.dispatch({
    type: "DELETE_REGISTRY",
    payload: {
      id,
      vin,
    }
  })
}

const deletePersonFromRegistry = ({id}) => {
  store.dispatch({
    type: "DELETE_PERSON_FROM_REGISTRY",
    payload: id,
  })
}

const deleteCarFromRegistry = ({vin}) => {
  store.dispatch({
    type: "DELETE_CAR_FROM_REGISTRY",
    payload: vin,
  })
}

export {
  addRegistry,
  deleteRegistry,
  deletePersonFromRegistry,
  deleteCarFromRegistry,
}

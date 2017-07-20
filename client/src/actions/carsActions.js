import store from "../store"

const addCar = ({vin, information}) => {
  store.dispatch({
    type: "ADD_CAR",
    payload: {
      vin,
      information,
    }
  })
}

const updateCar = ({vin, information}) => {
  store.dispatch({
    type: "UPDATE_CAR",
    payload: {
      vin,
      information
    }
  })
}

const deleteCar = ({vin}) => {
  store.dispatch({
    type: "DELETE_CAR",
    payload: vin,
  })
}

export {
  addCar,
  updateCar,
  deleteCar,
}

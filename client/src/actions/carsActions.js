import store from "../store"

const fetchCars = () => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/getCars", {
      method: 'POST',
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.success) {
        dispatch({
          type: "FETCH_CARS",
          payload: responseJson.cars,
        })
      }
      console.log(responseJson.cars)
    })
    .catch(({message}) => console.log(message))
  })
}

const addCar = ({vin, information}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/addCar", {
      method: 'POST',
      body: "vin=" + vin +
        "&mileage=" + information.mileage +
        "&make=" + information.make +
        "&model=" + information.model
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        dispatch({
          type: "ADD_CAR",
          payload: {
            vin,
            information,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const updateCar = ({vin, information}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/updateCar", {
      method: 'POST',
      body: "vin=" + vin +
        "&mileage=" + information.mileage +
        "&make=" + information.make +
        "&model=" + information.model
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        dispatch({
          type: "UPDATE_CAR",
          payload: {
            vin,
            information,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const deleteCar = ({vin}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/deleteCar", {
      method: 'POST',
      body: "vin=" + vin
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        dispatch({
          type: "DELETE_CAR",
          payload: vin,
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

export {
  fetchCars,
  addCar,
  updateCar,
  deleteCar,
}

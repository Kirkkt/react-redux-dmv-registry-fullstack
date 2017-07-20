import store from "../store"

// TODO: can i not use thunk?
const fetchRegistry = () => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/getRegistry", {
      method: 'POST',
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.success) {
        dispatch({
          type: "FETCH_REGISTRY",
          payload: responseJson.registry,
        })
      }
      console.log(responseJson.registry)
    })
    .catch(({message}) => console.log(message))
  })
}

const addRegistry = ({id, vin}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/addRegistry", {
      method: 'POST',
      body: "id=" + id +
        "&vin=" + vin
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        store.dispatch({
          type: "ADD_REGISTRY",
          payload: {
            id,
            vin,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const deleteRegistry = ({id, vin}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/deleteRegistry", {
      method: 'POST',
      body: "id=" + id +
        "&vin=" + vin
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        store.dispatch({
          type: "DELETE_REGISTRY",
          payload: {
            id,
            vin,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const deletePersonFromRegistry = ({id}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/deletePersonFromRegistry", {
      method: 'POST',
      body: "id=" + id
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        store.dispatch({
          type: "DELETE_PERSON_FROM_REGISTRY",
          payload: id,
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const deleteCarFromRegistry = ({vin}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/deleteCarFromRegistry", {
      method: 'POST',
      body: "vin=" + vin
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        store.dispatch({
          type: "DELETE_CAR_FROM_REGISTRY",
          payload: vin,
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

export {
  fetchRegistry,
  addRegistry,
  deleteRegistry,
  deletePersonFromRegistry,
  deleteCarFromRegistry,
}

import store from "../store"

const fetchPeople = () => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/getPeople", {
      method: 'POST',
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.success) {
        dispatch({
          type: "FETCH_PEOPLE",
          payload: responseJson.people,
        })
      }
      console.log(responseJson.people)
    })
    .catch(({message}) => console.log(message))
  })
}

const addPerson = ({id, information}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/addPerson", {
      method: 'POST',
      body: "id=" + id +
        "&firstName=" + information.firstName +
        "&lastName=" + information.lastName
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        dispatch({
          type: "ADD_PEOPLE",
          payload: {
            id,
            information,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const updatePerson = ({id, information}) => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/updatePerson", {
      method: 'POST',
      body: "id=" + id +
        "&firstName=" + information.firstName +
        "&lastName=" + information.lastName
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
      if (responseJson.success) {
        dispatch({
          type: "UPDATE_PEOPLE",
          payload: {
            id,
            information,
          }
        })
      }
    })
    .catch(({message}) => console.log(message))
  })
}

const deletePerson = ({id}) => {
  store.dispatch({
    type: "DELETE_PEOPLE",
    payload: id,
  })
}

export {
  fetchPeople,
  addPerson,
  updatePerson,
  deletePerson,
}

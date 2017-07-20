import store from "../store"

const fetchPeople = () => {
  store.dispatch(dispatch => {
    fetch("http://localhost:2379/getPeople", {
      method: 'POST',
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log("responseJson", responseJson)
    })
    .catch(({message}) => console.log(message))
  })
}

const addPerson = ({id, information}) => {
  store.dispatch({
    type: "ADD_PEOPLE",
    payload: {
      id,
      information,
    }
  })
}

const updatePerson = ({id, information}) => {
  store.dispatch({
    type: "UPDATE_PEOPLE",
    payload: {
      id,
      information
    }
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

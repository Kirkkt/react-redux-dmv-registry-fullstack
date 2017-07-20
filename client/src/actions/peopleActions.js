import store from "../store"

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
  addPerson,
  updatePerson,
  deletePerson,
}

export default (state = {
  "122100AABB": [
    "ABC300984"
  ],
  "334455DDFF": [
    "DEF998877",
    "XYZ668872",
  ],
}, action) => {
  const newState = {...state};
  switch (action.type) {
    case "ADD_REGISTRY": {
      const {id, vin} = action.payload;
      if (
        newState[id] &&
        newState[id].some(vinRegistered => vinRegistered === vin)
      ) {
        throw new Error("id-vin pair already existed: " + id + ", " + vin);
      }
      if (!newState[id]) {
        newState[id] = [vin];
      } else {
        newState[id] = [...newState[id], vin];
      }
      return newState;
    }
    case "DELETE_REGISTRY": {
      const {vin, id} = action.payload;
      if (!(id in newState)) {
        throw new Error("id not found: " + action.payload);
      } else if (!(newState[id].some(vinRegistered => vinRegistered === vin))) {
        throw new Error("vin not found for id: " + vin + ", " + id);
      }
      const owner = newState[id].slice()
      owner.splice(owner.indexOf(vin), 1)
      newState[id] = owner
      return newState
    }
    case "DELETE_PERSON_FROM_REGISTRY": {
      const id = action.payload;
      if (id in newState) {
        newState[id] = [];
      }
      return newState
    }
    case "DELETE_CAR_FROM_REGISTRY": {
      const vin = action.payload;
      for (const id in newState) {
        if (newState[id].indexOf(vin) === -1) {
          continue
        }
        const owner = newState[id].slice()
        owner.splice(owner.indexOf(vin), 1)
        newState[id] = owner
      }
      return newState
    }
    default: {
      return newState
    }
  }
}

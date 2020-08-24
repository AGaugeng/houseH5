
import { UPDATE_AREA_CHILD, UPDATE_AREA_CHILD_TWO, UPDATE_AREA_BROTHER, UPDATE_LOCATION, UPDATE_LOCATION_INFO, UPDATE_NEARBY_ROOM, UPDATE_LOCATION_ADDRESS, UPDATE_LOCATION_ROOM } from '../../actions/actionTypes'


let initialState = {
  location: { latitude: 22.634617, longitude: 113.185039 },
  address: {

  },
  areachild: [],
  areachildv2: [],
  areabrother: [],
  info: {},
  nearbyroom: [],
  area: {},
}
export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return { ...state, location: state.location = action.location }
    case UPDATE_LOCATION_ADDRESS:
      return { ...state, address: state.address = action.address }
    case UPDATE_LOCATION_ROOM:
      return { ...state, room: state.room = action.room }
    case UPDATE_LOCATION_INFO:
      return { ...state, area: state.area = action.area }
    case UPDATE_NEARBY_ROOM:
      return { ...state, nearbyroom: state.nearbyroom = action.nearbyroom }
    case UPDATE_AREA_CHILD:
      return { ...state, areachild: state.areachild = action.areachild }
    case UPDATE_AREA_CHILD_TWO:
      return { ...state, areachildv2: state.areachildv2 = action.areachildv2 }
    case UPDATE_AREA_BROTHER:
      return { ...state, areabrother: state.areabrother = action.areabrother }
    default:
      return state
  }
}

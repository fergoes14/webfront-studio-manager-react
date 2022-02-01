const INITIAL_STATE = { Photolist: [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PHOTO_FETCHED':
            return { ...state, Photolist: action.payload.data }
        default:
            return state
    }

}
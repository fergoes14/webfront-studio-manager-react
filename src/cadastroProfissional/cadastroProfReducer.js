const INITIAL_STATE = { list: [], nameSearch:''}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CADASTRO_PROF_FETCHED':
            return { ...state, list: action.payload.data, }

        case 'PROF_SEARCHED':
            return { ...state, list: action.payload }

            case 'NAME_CHANGED':
            return { ...state, nameSearch: action.payload }

        default:
            return state
    }
}
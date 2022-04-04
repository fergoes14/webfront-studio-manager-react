const INITIAL_STATE = { list: [], nameSearch:'' }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'BILLING_CYCLES_FETCHED':
            return { ...state, list: action.payload.data }

        case 'PAGAMENTO_SEARCHED':
            return { ...state, list: action.payload }

        case 'NAME_CHANGED':
            return { ...state, nameSearch: action.payload }
        default:
            return state
    }
}

const initialState = {
    balance: 0,
    load: 0,
    loanPurpose: "",
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
            };
        case "account/withdraw":
            return {
                ...state,
                balance: state.balance - action.payload,
            };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                // LATER
                loan: action.payload,
            };
        case "account/payLoan":
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan,
            };
        case "SET_BALANCE":
            return {
                ...state,
                balance: action.payload,
            };
        case "SET_LOAD":
            return {
                ...state,
                load: action.payload,
            };
        case "SET_LOAN_PURPOSE":
            return {
                ...state,
                loanPurpose: action.payload,
            };
        default:
            return state;
    }
}
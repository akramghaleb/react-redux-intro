import { combineReducers, createStore } from "redux"
const initialStateAccount = {
    balance: 0,
    load: 0,
    loan: 0,
    loanPurpose: "",
}

const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
}

function accountReducer(state = initialStateAccount, action) {
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
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount,
            };
        case "account/payLoan":
            return {
                ...state,
                balance: state.balance - state.loan,
                loan: 0,
                loanPurpose: '',
            };
        default:
            return state;
    }
}

function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            }
        case 'customer/updateName':
            return {
                ...state,
                fullName: action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})

const store = createStore(rootReducer)

// store.dispatch({ type: 'account/deposit', payload: 500 })
// console.log(store.getState())

// store.dispatch({ type: 'account/withdraw', payload: 200 })
// console.log(store.getState())

// store.dispatch({
//     type: 'account/requestLoan', payload: {
//         amount: 1000,
//         purpose: 'Car finance'
//     }
// })
// console.log(store.getState())

// store.dispatch({ type: 'account/payLoan' })
// console.log(store.getState())

function deposit(amount) {
    return { type: 'account/deposit', payload: amount }
}

function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount }
}

function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount: amount, purpose: purpose }
    }
}

function payLoan() {
    return { type: 'account/payLoan' }
}

store.dispatch(deposit(500))
console.log(store.getState())

store.dispatch(withdraw(200))
console.log(store.getState())

store.dispatch(requestLoan(1000, "Buy a cheap car"))
console.log(store.getState())

store.dispatch(payLoan())
console.log(store.getState())

function createCustomer(fullName, nationalID) {
    return {
        type: 'customer/createCustomer',
        payload: { fullName: fullName, nationalID: nationalID, createdAt: new Date().toISOString() }
    }
}

function updateName(fullName) {
    return {
        type: 'customer/updateName',
        payload: fullName
    }
}

store.dispatch(createCustomer("John Doe", "1234567890"))
console.log(store.getState())

store.dispatch(updateName("Jane Doe"))
console.log(store.getState())
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    load: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit: (state, action) => {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw: (state, action) => {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare: (amount, purpose) => {
                return {
                    payload: { amount, purpose }
                }
            },
            reducer(state, action) {
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance += action.payload.amount;
            }
        },
        payLoan: (state) => {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = '';
        },
        convertingCurrency: (state) => {
            state.isLoading = true;
        }
    }
})

export const { withdraw, requestLoan, payLoan, convertingCurrency } = accountSlice.actions

export function deposit(amount, currency) {
    if (currency === 'USD')
        return { type: 'account/deposit', payload: amount }
    return async function (dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' })
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json()
        const convertedAmount = data.rates.USD;
        dispatch({ type: 'account/deposit', payload: convertedAmount })
    }
}

export default accountSlice.reducer

/*
export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
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
        case "account/convertingCurrency":
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}

export function deposit(amount, currency) {
    if (currency === 'USD')
        return { type: 'account/deposit', payload: amount }
    return async function (dispatch, getState) {
        dispatch({ type: 'account/convertingCurrency' })
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json()
        const convertedAmount = data.rates.USD;
        dispatch({ type: 'account/deposit', payload: convertedAmount })
    }
}

export function withdraw(amount) {
    return { type: 'account/withdraw', payload: amount }
}

export function requestLoan(amount, purpose) {
    return {
        type: 'account/requestLoan',
        payload: { amount: amount, purpose: purpose }
    }
}

export function payLoan() {
    return { type: 'account/payLoan' }
}
    */
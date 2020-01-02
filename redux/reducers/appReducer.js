import * as appConstants from '../constants/appConstants';

const initialState = {
    web3: null,
    account: null,
    balance: null,
    metaCoin: null
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case appConstants.WEB3_CONNECT_SUCCESS:
            return {
                ...state,
                web3: action.web3,
                account: action.account
            };
        case appConstants.INIT_CONTRACT_SUCCESS:
            return {
                ...state,
                metaCoin: action.metaCoin
            };
        case appConstants.GET_BALANCE_SUCCESS:
            return {
                ...state,
                balance: action.balance
            };
        default:
            return state;
    }
};

export default appReducer;
import { call, put, takeEvery, apply } from 'redux-saga/effects';
import * as appConstants from '../constants/appConstants';
import * as web3Service from '../services/web3Service';

export function* updateUser(action) {
    yield put({
        type: appConstants.UPDATE_USER_SUCCESS, data: action.data
    })
}

export function* connectWeb3() {
    let data = yield web3Service.web3Connect();

    if (data) {
        yield put({
            type: appConstants.WEB3_CONNECT_SUCCESS,
            web3: data.web3,
            account: data.account
        });
    } else {
        yield put({
            type: appConstants.WEB3_CONNECT_SUCCESS,
            web3: null,
            account: null
        });
    }
}

export function* instantiateContracts(action) {
    let data = yield web3Service.instantiateContracts(action.web3);

    console.log(data);
    // if (data) {
    //     yield put({
    //         type: appConstants.INIT_CONTRACT_SUCCESS,
    //         metaCoin: data.metaCoin
    //     });
    // } else {
    //     yield put({
    //         type: appConstants.INIT_CONTRACT_SUCCESS,
    //         metaCoin: null
    //     });
    // }
}

export function* getBalance(action) {
    // let data = yield web3Service.getBalance(action.account, action.metaCoin);

    // if (data) {
    //     yield put({
    //         type: appConstants.GET_BALANCE_SUCCESS,
    //         balance: data.balance
    //     });
    // } else {
    //     yield put({
    //         type: appConstants.GET_BALANCE_SUCCESS,
    //         balance: null
    //     });
    // }
}

export function* watchApp() {
    yield takeEvery(appConstants.UPDATE_USER, updateUser);
    yield takeEvery(appConstants.WEB3_CONNECT, connectWeb3);
    yield takeEvery(appConstants.INIT_CONTRACT, connectWeb3);
    yield takeEvery(appConstants.GET_BALANCE, getBalance);
}
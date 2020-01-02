import * as appConstants from '../constants/appConstants';

export const web3Connect = () => ({ type: appConstants.WEB3_CONNECT });
export const instantiateContracts = (data) => ({ type: appConstants.INIT_CONTRACT, data });
export const getBalance = (data) => ({ type: appConstants.GET_BALANCE, data });